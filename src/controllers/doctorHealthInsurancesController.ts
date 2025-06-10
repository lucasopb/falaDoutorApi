import { Request, Response } from "express";
import { createDoctorHealthInsurances } from "../repositories/doctorHealthInsuranceRepository";
import { BadRequestError } from "../helpers/api-erros";

export const createDoctorHealthInsuranceHandler = async (req: Request, res: Response) => {
  const { doctorId, healthInsuranceId } = req.body;

  if (!doctorId || !healthInsuranceId) {
    throw new BadRequestError("doctorId and HealthInsuranceId must be provided")
  }

  const newRelation = await createDoctorHealthInsurances(doctorId, healthInsuranceId)

  res.status(201).json(newRelation);
};
