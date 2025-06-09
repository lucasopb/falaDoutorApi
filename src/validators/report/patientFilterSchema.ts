import { z } from "zod";

export const patientFilterSchema = z.object({
  name: z.string({
    invalid_type_error: "'name' must be a string.",
  }).optional(),

  cpf: z.string({
    invalid_type_error: "'cpf' must be a string.",
  }).optional(),

  healthInsuranceId: z.string({
    invalid_type_error: "'healthInsuranceId' must be a string (UUID).",
  }).optional(),

  ageMin: z.coerce.number({
    invalid_type_error: "'ageMin' must be a valid number.",
  }).optional(),

  ageMax: z.coerce.number({
    invalid_type_error: "'ageMax' must be a valid number.",
  }).optional(),
});

export type PatientFilterDTO = z.infer<typeof patientFilterSchema>;
