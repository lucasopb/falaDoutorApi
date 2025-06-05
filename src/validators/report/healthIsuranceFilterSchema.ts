import { z } from "zod";

export const healthInsuranceFilterSchema = z.object({
  name: z.string({
    invalid_type_error: "'name' must be a string.",
  }).optional(),

  code: z.string({
    invalid_type_error: "'code' must be a string.",
  }).optional(),

  baseValueMin: z.coerce.number({
    invalid_type_error: "'baseValueMin' must be a number",
  }).optional(),

  baseValueMax: z.coerce.number({
    invalid_type_error: "'baseValueMax' must be a number",
  }).optional()
});

export type HealthInsuranceFilterDTO = z.infer<typeof healthInsuranceFilterSchema>;