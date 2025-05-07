import { z } from "zod";

export const createHealthInsuranceSchema = z.object({
  name: z.string({
    required_error: "'name' field is required.",
    invalid_type_error: "'name' must be a string.",
  }).min(1, "'name' cannot be empty."),

  code: z.string({
    required_error: "'code' field is required.",
    invalid_type_error: "'code' must be a string.",
  }).length(10, "'code' must be at exacly 10 caracters"),

  baseValue: z.number({
    required_error: "'baseValue' field is required.",
    invalid_type_error: "'baseValue' must be a number."})
});

export type CreateDoctorDTO = z.infer<typeof createHealthInsuranceSchema>;
