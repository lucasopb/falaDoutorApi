import { z } from "zod";

export const updateHealthInsuranceSchema = z.object({
  name: z.string({
    invalid_type_error: "'name' must be a string.",
  }).min(1, "'name' cannot be empty.").optional(),

  code: z.string({
    invalid_type_error: "'code' must be a string.",
  }).length(10, "'code' must be at exactly 5 caracters").optional(),

  baseValue: z.number({
    invalid_type_error: "'baseValue' must be a number."}).optional()
});

export type CreateDoctorDTO = z.infer<typeof updateHealthInsuranceSchema>;