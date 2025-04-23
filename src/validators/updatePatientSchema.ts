import { z } from "zod";

export const updatePatientSchema = z.object({
  name: z.string({
    invalid_type_error: "'name' must be a string.",
  }).min(1, "'name' cannot be empty.").optional(),

  cpf: z.string({
    invalid_type_error: "'cpf' must be a string.",
  }).min(11, "'cpf' must be at least 11 characters long.").optional(),

  birthDate: z.coerce.date({
    invalid_type_error: "'birthDate' must be a valid date.",
  }).optional(),

  health_insurance: z.string({
    invalid_type_error: "'health_insurance' must be a string.",
  }).min(1, "'health_insurance' cannot be empty.").optional(),
});

export type UpdatePatientDTO = z.infer<typeof updatePatientSchema>;
