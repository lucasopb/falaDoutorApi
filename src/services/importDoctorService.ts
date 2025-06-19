import * as XLSX from "xlsx";
import fs from "fs";
import { createDoctor } from "../repositories/doctorRepository";
import { createDoctorSchema } from "../validators/doctor/createDoctorSchema";
import { formatCPF } from "../helpers/formatCpf";
import { convertExcelDate } from "../helpers/convertExcelData";
import { getHealthInsuranceIdByName } from "../repositories/healthInsuranceRepository";
import { createDoctorHealthInsurances } from "../repositories/doctorHealthInsuranceRepository";

export const importDoctorsFromExcel = async (filePath: string) => {
  const workbook = XLSX.readFile(filePath);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const data = XLSX.utils.sheet_to_json(sheet);

  fs.unlinkSync(filePath);

  const imported: any[] = [];
  const failed: any[] = [];

  for (const row of data as any[]) {
    const raw = {
      name: row.name?.toString().trim(),
      cpf: formatCPF(row.cpf),
      crm: row.crm?.toString().trim(),
      birthDate: convertExcelDate(Number(row.birthDate)),
    };

    const validation = createDoctorSchema.safeParse(raw);
    if (!validation.success) {
      failed.push({ data: raw, errors: validation.error.errors });
      continue;
    }

    const { name, cpf, crm, birthDate } = validation.data;

    try {
      // 1. Cria o médico
      const newDoctor = await createDoctor(name, cpf, crm, new Date(birthDate));

      // 2. Processa a coluna healthInsurances
      const healthInsuranceNames = row.healthInsurances?.toString().split(";").map((s: string) => s.trim()).filter(Boolean) || [];

      for (const insuranceName of healthInsuranceNames) {
        const insuranceId = await getHealthInsuranceIdByName(insuranceName);
        if (!insuranceId) {
          failed.push({ data: raw, errors: [`Plano de saúde '${insuranceName}' não encontrado`] });
          continue;
        }

        try {
          await createDoctorHealthInsurances(newDoctor.id, insuranceId);
        } catch (err: any) {
          // Se já existe, ignora; se for outro erro, reporta
          if (!err.message.includes("already exists")) {
            failed.push({ data: raw, errors: [err.message] });
          }
        }
      }

      imported.push(newDoctor);
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
