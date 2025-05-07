import { z } from "zod";

export const updateDoctorSchema = z.object({
  name: z.string({
    invalid_type_error: "'name' must be a string.",
  }).min(1, "'name' cannot be empty.").optional(),

  cpf: z.string({
    invalid_type_error: "'cpf' must be a string.",
  }).regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "'cpf' must be in the format 000.000.000-00.").optional(),

  crm: z.string({
    invalid_type_error: "'crm' must be a string.",
  }).length(6, "'crm' must be exactly 6 characters long.").optional(),

  birthDate: z.coerce.date({
    invalid_type_error: "'birthDate' must be a valid date.",
  }).optional(),
});

export type UpdateDoctorDTO = z.infer<typeof updateDoctorSchema>;
