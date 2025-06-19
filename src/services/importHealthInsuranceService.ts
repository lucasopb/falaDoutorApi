import * as XLSX from "xlsx";
import fs from "fs";
import { createHealthInsurance } from "../repositories/healthInsuranceRepository";
import { createHealthInsuranceSchema } from "../validators/healthInsurance/createHealthInsuranceSchema";

export const importHealthInsurancesFromExcel = async (filePath: string) => {
  const workbook = XLSX.readFile(filePath);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const data = XLSX.utils.sheet_to_json(sheet);

  fs.unlinkSync(filePath);

  const imported: any[] = [];
  const failed: any[] = [];

  const normalizedData = data.map((row: any) => ({
    name: row.name?.toString().trim(),
    code: row.code?.toString().trim(),
    baseValue: Number(row.baseValue),
  }));

  for (const raw of normalizedData) {
    const validation = createHealthInsuranceSchema.safeParse(raw);

    if (!validation.success) {
      failed.push({ data: raw, errors: validation.error.errors });
      continue;
    }

    const { name, code, baseValue } = validation.data;

    try {
      const newHealthInsurance = await createHealthInsurance(name, code, baseValue);
      imported.push(newHealthInsurance);
    } catch (error: any) {
      failed.push({ data: raw, errors: error.message });
    }
  }

  return { importedCount: imported.length, failedCount: failed.length, imported, failed };
};
