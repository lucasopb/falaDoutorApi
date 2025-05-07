import { z } from "zod";

export const createDoctorSchema = z.object({
  name: z.string({
    required_error: "'name' field is required.",
    invalid_type_error: "'name' must be a string.",
  }).min(1, "'name' cannot be empty."),

  cpf: z.string({
    required_error: "'cpf' field is required.",
    invalid_type_error: "'cpf' must be a string.",
  }).regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "'cpf' must be in the format 000.000.000-00."),

  crm: z.string({
    required_error: "'crm' field is required.",
    invalid_type_error: "'crm' must be a string.",
  }).length(6, "'crm' must be exactly 6 characters long."),

  birthDate: z.coerce.date({
    required_error: "'birthDate' field is required.",
    invalid_type_error: "'birthDate' must be a valid date.",
  }),
});

export type CreateDoctorDTO = z.infer<typeof createDoctorSchema>;
