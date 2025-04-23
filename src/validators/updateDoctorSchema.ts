import { z } from "zod";

export const updateDoctorSchema = z.object({
  name: z.string({
    invalid_type_error: "'name' must be a string.",
  }).min(1, "'name' cannot be empty.").optional(),

  cpf: z.string({
    invalid_type_error: "'cpf' must be a string.",
  }).min(11, "'cpf' must be at least 11 characters long.").optional(),

  crm: z.string({
    invalid_type_error: "'crm' must be a string.",
  }).min(1, "'crm' cannot be empty.").optional(),

  birthDate: z.coerce.date({
    invalid_type_error: "'birthDate' must be a valid date.",
  }).optional(),
});

export type UpdateDoctorDTO = z.infer<typeof updateDoctorSchema>;
