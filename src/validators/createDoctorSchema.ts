import { z } from "zod";

export const createDoctorSchema = z.object({
  name: z.string({
    required_error: "'name' field is required.",
    invalid_type_error: "'name' must be a string.",
  }).min(1, "'name' cannot be empty."),

  cpf: z.string({
    required_error: "'cpf' field is required.",
    invalid_type_error: "'cpf' must be a string.",
  }).min(11, "'cpf' must be at least 11 characters long."),

  crm: z.string({
    required_error: "'crm' field is required.",
    invalid_type_error: "'crm' must be a string.",
  }).min(1, "'crm' cannot be empty."),

  birthDate: z.coerce.date({
    required_error: "'birthDate' field is required.",
    invalid_type_error: "'birthDate' must be a valid date.",
  }),
});

export type CreateDoctorDTO = z.infer<typeof createDoctorSchema>;
