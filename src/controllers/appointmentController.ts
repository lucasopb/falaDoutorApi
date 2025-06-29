import { Request, Response, NextFunction } from "express";
import { createAppointmentSchema } from "../validators/appointment/createAppointmentSchema";
import {
  createAppointment,
  getAppointments,
  getAppointmentById,
  deleteAppointment,
} from "../repositories/appointmentRepository";
import { BadRequestError } from "../helpers/api-erros";
import { updateAppointmentSchema } from "../validators/appointment/updateAppointmentSchema";
import { updateAppointment } from "../repositories/appointmentRepository";

export const createAppointmentHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const validated = createAppointmentSchema.safeParse(req.body);
  if (!validated.success) {
    const errorMessages = validated.error.errors
      .map((err: any) => err.message)
      .join(", ");
    throw new BadRequestError(errorMessages);
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

export const updateAppointmentHandler = async (
  req: Request,
  res: Response
) => {
  const validated = updateAppointmentSchema.safeParse(req.body);

  if (!validated.success) {
    const errorMessages = validated.error.errors
      .map((err: any) => err.message)
      .join(", ");
    throw new BadRequestError(errorMessages);
  }

  const { date, observation } = validated.data;

  const updated = await updateAppointment(
    req.params.id,
    date ? new Date(date) : undefined,
    observation
  );

  res.json(updated);
};
