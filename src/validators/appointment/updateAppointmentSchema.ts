import { z } from "zod";

export const updateAppointmentSchema = z.object({
  date: z.string({
    invalid_type_error: "'date' must be a string.",
  }).refine((val) => !isNaN(Date.parse(val)), {
    message: "'date' must be a valid ISO date string.",
  }).optional(),

  observation: z.string({
    invalid_type_error: "'observation' must be a string.",
  }).optional(),
});
