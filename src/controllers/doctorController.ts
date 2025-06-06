import { Request, Response, NextFunction } from "express";
import { createDoctorSchema } from "../validators/doctor/createDoctorSchema";
import { updateDoctorSchema } from "../validators/doctor/updateDoctorSchema";
import { BadRequestError } from "../helpers/api-erros";
import {
  createDoctor,
  getDoctors,
  getDoctorById,
  updateDoctor,
  deleteDoctor
} from "../repositories/doctorRepository";

export const createDoctorHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const validDoctor = createDoctorSchema.safeParse(req.body);

  if (!validDoctor.success) {
    const errorMessages = validDoctor.error.errors
      .map((err: any) => err.message)
      .join(", ");
    throw new BadRequestError(errorMessages);
  }

  const { name, cpf, crm, birthDate } = validDoctor.data;

  const newDoctor = await createDoctor(
    name,
    cpf,
    crm,
    new Date(birthDate)
  );

  res.status(201).json(newDoctor);
};

export const getDoctorsHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { page, limit, offset } = req.pagination!;
  const { doctors, total } = await getDoctors(limit, offset);

  res.status(200).json({
    data: doctors,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    }
  })
};

export const getDoctorByIdHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params;

  const doctor = await getDoctorById(id);
  res.status(200).json(doctor);
};

export const updateDoctorHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const validDoctor = updateDoctorSchema.safeParse(req.body);

  if (!validDoctor.success) {
    const errorMessages = validDoctor.error.errors
      .map((err: any) => `${err.path.join('.')}: ${err.message}`)
      .join(", ");
    throw new BadRequestError(errorMessages);
  }

  const { id } = req.params;
  const { name, cpf, crm, birthDate } = validDoctor.data;

  const updatedDoctor = await updateDoctor(
    id,
    name,
    cpf,
    crm,
    birthDate ? new Date(birthDate) : undefined
  );

  res.status(200).json(updatedDoctor);
};

export const deleteDoctorHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params;

  await deleteDoctor(id);
  res.status(204).send();
};
