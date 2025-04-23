import { z } from "zod";

export const createPatientSchema = z.object({
  name: z.string({
    required_error: "'name' field is required.",
    invalid_type_error: "'name' must be a string.",
  }).min(1, "'name' cannot be empty."),

  cpf: z.string({
    required_error: "'cpf' field is required.",
    invalid_type_error: "'cpf' must be a string.",
  }).min(11, "'cpf' must be at least 11 characters long."),

  birthDate: z.coerce.date({
    required_error: "'birthDate' field is required.",
    invalid_type_error: "'birthDate' must be a valid date.",
  }),

  health_insurance: z.string({
    required_error: "'health_insurance' field is required.",
    invalid_type_error: "'health_insurance' must be a string.",
  }).min(1, "'health_insurance' cannot be empty."),
});

export type CreatePatientDTO = z.infer<typeof createPatientSchema>;

