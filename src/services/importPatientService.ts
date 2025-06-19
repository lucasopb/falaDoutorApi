import * as XLSX from "xlsx";
import fs from "fs";
import { Patient } from "../entities/Patient";
import { createPatientSchema } from "../validators/patient/createPatientSchema";
import { getHealthInsuranceIdByName } from "../repositories/healthInsuranceRepository";
import { createPatient } from "../repositories/patientRepository";
import { convertExcelDate } from "../helpers/convertExcelData";
import { formatCPF } from "../helpers/formatCpf";

export const importPatientsFromExcel = async (filePath: string) => {
  const workbook = XLSX.readFile(filePath);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const rows = XLSX.utils.sheet_to_json(sheet);

  fs.unlinkSync(filePath);

  const imported: Patient[] = [];
  const failed: any[] = [];

  for (const row of rows as any[]) {
    const formattedRow = {
      name: row.name?.toString().trim(),
      cpf: formatCPF(row.cpf),
      birthDate: convertExcelDate(Number(row.birthDate)),
      healthInsuranceName: row.healthInsurance?.toString().trim() || null,
    };

    let healthInsuranceId: string | null = null;

    // Se o plano foi preenchido, mas não encontrado → ERRO
    if (formattedRow.healthInsuranceName) {
      healthInsuranceId = await getHealthInsuranceIdByName(formattedRow.healthInsuranceName);
      if (!healthInsuranceId) {
        failed.push({
          data: formattedRow,
          errors: [`Plano de saúde '${formattedRow.healthInsuranceName}' não encontrado.`],
        });
        continue; // Não tenta criar o paciente
      }
    }

    const raw = {
      name: formattedRow.name,
      cpf: formattedRow.cpf,
      birthDate: formattedRow.birthDate,
      healthInsuranceId: healthInsuranceId, // null ou ID válido
    };

    const validation = createPatientSchema.safeParse(raw);
    if (!validation.success) {
      failed.push({ data: raw, errors: validation.error.errors });
      continue;
    }

    const { name, cpf, birthDate } = validation.data;

    try {
      const newPatient = await createPatient(name, cpf, birthDate, healthInsuranceId);
      imported.push(newPatient);
    } catch (error: any) {
      failed.push({ data: raw, errors: [error.message] });
    }
  }

  return {
    importedCount: imported.length,
    failedCount: failed.length,
    imported,
    failed,
  };
};