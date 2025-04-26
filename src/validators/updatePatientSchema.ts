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

  healthInsurance: z.string({
    invalid_type_error: "'healthInsurance' must be a string.",
  }).min(1, "'healthInsurance' cannot be empty.").optional(),
});

export type UpdatePatientDTO = z.infer<typeof updatePatientSchema>;
