import { Request, Response, NextFunction } from "express";
import { createPatientSchema } from "../validators/createPatientSchema";
import { updatePatientSchema } from "../validators/updatePatientSchema";
import { BadRequestError } from "../helpers/api-erros";
import { 
  createPatient,
  getPatient,
  getPatientById,
  updatePatient,
  deletePatient
} from "../repositories/patientRepository";

export const createPatientHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const validPatient = createPatientSchema.safeParse(req.body);

  if (!validPatient.success) {
    const errorMessages = validPatient.error.errors.map((err: any) => err.message).join(", ");
    throw new BadRequestError(errorMessages);
  }

  const { name, cpf, birthDate, healthInsurance } = validPatient.data;

  const newDoctor = await createPatient(name, cpf, new Date(birthDate), healthInsurance);
  res.status(201).json(newDoctor);
};

export const getPatientsHandler = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  const doctors = await getPatient();
  res.status(200).json(doctors);
};

export const getPatientByIdHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { id } = req.params;

  const doctor = await getPatientById(id);
  res.status(200).json(doctor);
};

export const updatePatientHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const validPatient = updatePatientSchema.safeParse(req.body);
  if (!validPatient.success) {
    const errorMessages = validPatient.error.errors
      .map((err: any) => `${err.path.join('.')}: ${err.message}`)
      .join(', ');
    throw new BadRequestError(errorMessages);
  }

  const { id } = req.params
  const { name, cpf, birthDate, healthInsurance} = validPatient.data

  const updatedDoctor = await updatePatient(
    id,
    name,
    cpf,
    birthDate ? new Date(birthDate) : undefined,
    healthInsurance
  );

  res.status(200).json(updatedDoctor);
};

export const deletePatientHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { id } = req.params;

  await deletePatient(id);
  res.status(204).send();
};