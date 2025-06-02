import { Request, Response, NextFunction } from "express";
import { createPatientSchema } from "../validators/patient/createPatientSchema";
import { updatePatientSchema } from "../validators/patient/updatePatientSchema";
import { BadRequestError } from "../helpers/api-erros";
import { 
  createPatient,
  getPatients,
  getPatientById,
  updatePatient,
  deletePatient
} from "../repositories/patientRepository";

export const createPatientHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const validPatient = createPatientSchema.safeParse(req.body);

  if (!validPatient.success) {
    const errorMessages = validPatient.error.errors
      .map((err: any) => err.message)
      .join(", ");
    throw new BadRequestError(errorMessages);
  }

  const { name, cpf, birthDate, healthInsuranceId } = validPatient.data;

  const newPatient = await createPatient(
    name,
    cpf,
    new Date(birthDate),
    healthInsuranceId
  );

  res.status(201).json(newPatient);
};

export const getPatientsHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { page, limit, offset } = req.pagination!;
  const { patients, total } = await getPatients(limit, offset);

  res.status(200).json({
    data: patients,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    }
  })
};

export const getPatientByIdHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params;

  const patient = await getPatientById(id);
  res.status(200).json(patient);
};

export const updatePatientHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const validPatient = updatePatientSchema.safeParse(req.body);

  if (!validPatient.success) {
    const errorMessages = validPatient.error.errors
      .map((err: any) => `${err.path.join('.')}: ${err.message}`)
      .join(", ");
    throw new BadRequestError(errorMessages);
  }

  const { id } = req.params;
  const { name, cpf, birthDate, healthInsuranceId } = validPatient.data;

  const updatedPatient = await updatePatient(
    id,
    name,
    cpf,
    birthDate ? new Date(birthDate) : undefined,
    healthInsuranceId
  );

  res.status(200).json(updatedPatient);
};

export const deletePatientHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params;

  await deletePatient(id);
  res.status(204).send();
};
