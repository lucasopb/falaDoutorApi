import { z } from "zod";

export const associateDoctorToHealthInsurancesSchema = z.object({
  healthInsuranceIds: z.array(z.string().uuid(), {
    required_error: "'healthInsuranceIds' field is required.",
    invalid_type_error: "'healthInsuranceIds' must be an array of UUIDs.",
  }).min(1, "'healthInsuranceIds' cannot be empty."),
});

export type AssociateDoctorToHealthInsurancesDTO = z.infer<typeof associateDoctorToHealthInsurancesSchema>;
