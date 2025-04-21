import { Request, Response, NextFunction } from "express";
import { 
  createPatient,
  getPatient,
  getPatientById,
  updatePatient,
  deletePatient
} from "../repositories/patientRepository";

export const createPatientHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { name, cpf, birthDate, health_insurance } = req.body;

    const newDoctor = await createPatient(name, cpf, new Date(birthDate), health_insurance);
    res.status(201).json(newDoctor);
  } catch (error) {
    next(error);
  }
};

export const getPatientsHandler = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const doctors = await getPatient();
    res.status(200).json(doctors);
  } catch (error) {
    next(error);
  }
};

export const getPatientByIdHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;

    const doctor = await getPatientById(id);
    res.status(200).json(doctor);
  } catch (error) {
    next(error);
  }
};

export const updatePatientHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, cpf, birthDate, health_insurance } = req.body;

    const updatedDoctor = await updatePatient(
      id,
      name,
      cpf,
      birthDate ? new Date(birthDate) : undefined,
      health_insurance
    );

    res.status(200).json(updatedDoctor);
  } catch (error) {
    next(error);
  }
};

export const deletePatientHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;

    await deletePatient(id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};