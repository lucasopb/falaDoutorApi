import { z } from "zod";

export const doctorFilterSchema = z.object({
  name: z.string({
    invalid_type_error: "'name' must be a string.",
  }).optional(),

  cpf: z.string({
    invalid_type_error: "'cpf' must be a string.",
  }).optional(),

  crm: z.string({
    invalid_type_error: "'crm' must be a string.",
  }).optional(),

  ageMin: z.coerce.number({
    invalid_type_error: "'ageMin' must be a valid number.",
  }).optional(),

  ageMax: z.coerce.number({
    invalid_type_error: "'ageMax' must be a valid number.",
  }).optional(),

    healthInsuranceIds: z.array(z.string({
    invalid_type_error: "Each 'healthInsuranceId' must be a string.",
  }), {
    invalid_type_error: "'healthInsuranceIds' must be an array of strings.",
  }).optional(),
});

export type DoctorFilterDTO = z.infer<typeof doctorFilterSchema>;
