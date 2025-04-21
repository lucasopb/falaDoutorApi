import { Request, Response, NextFunction } from "express";
import {
  createDoctor,
  getDoctors,
  getDoctorById,
  updateDoctor,
  deleteDoctor
} from "../repositories/doctorRepository";

export const createDoctorHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { name, cpf, crm, birthDate } = req.body;

    const newDoctor = await createDoctor(name, cpf, crm, new Date(birthDate));
    res.status(201).json(newDoctor);
  } catch (error) {
    next(error);
  }
};

export const getDoctorsHandler = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const doctors = await getDoctors();
    res.status(200).json(doctors);
  } catch (error) {
    next(error);
  }
};

export const getDoctorByIdHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;

    const doctor = await getDoctorById(id);
    res.status(200).json(doctor);
  } catch (error) {
    next(error);
  }
};

export const updateDoctorHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, cpf, crm, birthDate } = req.body;

    const updatedDoctor = await updateDoctor(
      id,
      name,
      cpf,
      crm,
      birthDate ? new Date(birthDate) : undefined
    );

    res.status(200).json(updatedDoctor);
  } catch (error) {
    next(error);
  }
};

export const deleteDoctorHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;

    await deleteDoctor(id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
