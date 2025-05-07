import { z } from "zod";

export const updatePatientSchema = z.object({
  name: z.string({
    invalid_type_error: "'name' must be a string.",
  }).min(1, "'name' cannot be empty.").optional(),

  cpf: z.string({
    invalid_type_error: "'cpf' must be a string.",
  }).regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "'cpf' must be in the format 000.000.000-00.").optional(),

  birthDate: z.coerce.date({
    invalid_type_error: "'birthDate' must be a valid date.",
  }).optional(),

  healthInsuranceId: z.string({
    invalid_type_error: "'healthInsuranceId' must be a string.",
  }).uuid("'healthInsuranceId' must be a valid UUID.").nullable().optional(),
});

export type UpdatePatientDTO = z.infer<typeof updatePatientSchema>;
