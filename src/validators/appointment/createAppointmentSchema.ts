import { z } from "zod";

export const createAppointmentSchema = z.object({
  doctorId: z.string().uuid(),
  patientId: z.string().uuid(),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
  observation: z.string().optional(),
});
