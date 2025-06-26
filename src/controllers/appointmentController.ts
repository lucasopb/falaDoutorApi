import { Request, Response, NextFunction } from "express";
import { createAppointmentSchema } from "../validators/appointment/createAppointmentSchema";
import {
  createAppointment,
  getAppointments,
  getAppointmentById,
  deleteAppointment,
} from "../repositories/appointmentRepository";
import { BadRequestError } from "../helpers/api-erros";

export const createAppointmentHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const validated = createAppointmentSchema.safeParse(req.body);
  console.log("ola")
  if (!validated.success) {
    const errorMsg = validated.error.errors.map(e => e.message).join(", ");
    throw new BadRequestError(errorMsg);
  }

  const { doctorId, patientId, date, observation } = validated.data;
  const appointment = await createAppointment(
    doctorId,
    patientId,
    new Date(date),
    observation || ""
  );

  res.status(201).json(appointment);
};

export const getAppointmentsHandler = async (req: Request, res: Response) => {
  const appointments = await getAppointments();
  res.json(appointments);
};

export const getAppointmentByIdHandler = async (req: Request, res: Response) => {
  const appointment = await getAppointmentById(req.params.id);
  res.json(appointment);
};

export const deleteAppointmentHandler = async (req: Request, res: Response) => {
  await deleteAppointment(req.params.id);
  res.status(204).send();
};
