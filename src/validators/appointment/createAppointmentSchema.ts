import { z } from "zod";

export const createAppointmentSchema = z.object({
  doctorId: z.string({
    required_error: "'doctorId' field is required.",
    invalid_type_error: "'doctorId' must be a string.",
  }).uuid("'doctorId' must be a valid UUID."),

  patientId: z.string({
    required_error: "'patientId' field is required.",
    invalid_type_error: "'patientId' must be a string.",
  }).uuid("'patientId' must be a valid UUID."),

  date: z.string({
    required_error: "'date' field is required.",
    invalid_type_error: "'date' must be a string.",
  }).refine((val) => !isNaN(Date.parse(val)), {
    message: "'date' must be a valid ISO date string.",
  }),

  observation: z.string({
    invalid_type_error: "'observation' must be a string.",
  }).optional(),
});
