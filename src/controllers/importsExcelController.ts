import { Request, Response } from "express";
import { importDoctorsFromExcel } from "../services/importDoctorService";
import { importHealthInsurancesFromExcel } from "../services/importHealthInsuranceService";
import { importPatientsFromExcel } from "../services/importPatientService";
import { BadRequestError } from "../helpers/api-erros";

export const importDoctorsHandler = async (req: Request, res: Response) => {
  const file = req.file;

  if (!file) {
    throw new BadRequestError("file is required");
  }

  const result = await importDoctorsFromExcel(file.path);
  res.status(201).json({ message: "Doctors imported successfully.", result });
};

export const importHealthInsurancesHandler = async (req: Request, res: Response) => {
  const file = req.file;

  if (!file) {
    throw new BadRequestError("file is required");
  }

  const result = await importHealthInsurancesFromExcel(file.path);
  res.status(201).json({ message: "Health insurances imported successfully.", result });
};

export const importPatientsHandler = async (req: Request, res: Response) => {
  const file = req.file;

  if (!file) {
    throw new BadRequestError("file is required");
  }

  const result = await importPatientsFromExcel(file.path);
  res.status(201).json({ message: "Health insurances imported successfully.", result });
};