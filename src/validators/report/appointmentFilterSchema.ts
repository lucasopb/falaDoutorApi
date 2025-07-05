import { z } from "zod";

export const appointmentFilterSchema = z.object({
  doctorId: z.string({
    invalid_type_error: "'doctorId' must be a string.",
  }).optional(),

  patientId: z.string({
    invalid_type_error: "'patientId' must be a string.",
  }).optional(),

  healthInsurance: z.string({
    invalid_type_error: "health insurance name must be a string.",
  }).optional(),

  dateMin: z.coerce.date({
    invalid_type_error: "'dateMin' must be a valid date.",
  }).optional(),

  dateMax: z.coerce.date({
    invalid_type_error: "'dateMax' must be a valid date.",
  }).optional(),
});

export type DoctorFilterDTO = z.infer<typeof appointmentFilterSchema>;
