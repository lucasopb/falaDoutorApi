import { nullable, z } from "zod";

export const createPatientSchema = z.object({
  name: z.string({
    required_error: "'name' field is required.",
    invalid_type_error: "'name' must be a string.",
  }).min(1, "'name' cannot be empty."),

  cpf: z.string({
    required_error: "'cpf' field is required.",
    invalid_type_error: "'cpf' must be a string.",
  }).regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "'cpf' must be in the format 000.000.000-00."),

  birthDate: z.coerce.date({
    required_error: "'birthDate' field is required.",
    invalid_type_error: "'birthDate' must be a valid date.",
  }),

  healthInsuranceId: z.string({
    invalid_type_error: "'healthInsuranceId' must be a string.",
  }).uuid("'healthInsuranceId' must be a valid UUID.").nullable().optional(),
});
  

export type CreatePatientDTO = z.infer<typeof createPatientSchema>;
