import { Request, Response } from "express";
import { createDoctorHealthInsurances, getAllDoctorHealthInsurances, getDoctorHealthInsuranceById, updateDoctorHealthInsurance, deleteDoctorHealthInsurance } from "../repositories/doctorHealthInsuranceRepository";
import { BadRequestError } from "../helpers/api-erros";

export const createDoctorHealthInsuranceHandler = async (req: Request, res: Response) => {
  const { doctorId, healthInsuranceId } = req.body;

  if (!doctorId || !healthInsuranceId) {
    throw new BadRequestError("doctorId and HealthInsuranceId must be provided")
  }

  const newRelation = await createDoctorHealthInsurances(doctorId, healthInsuranceId)

  res.status(201).json(newRelation);
};

export const getAllDoctorHealthInsurancesHandler = async (req: Request, res: Response) => {
  const relations = await getAllDoctorHealthInsurances();
  res.status(200).json(relations);
};

export const getDoctorHealthInsuranceByIdHandler = async (req: Request, res: Response) => {
  const { id } = req.params;
  const relation = await getDoctorHealthInsuranceById(id);
  res.status(200).json(relation);
};

export const updateDoctorHealthInsuranceHandler = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { doctorId, healthInsuranceId } = req.body;

  if (!doctorId || !healthInsuranceId) {
    throw new BadRequestError("doctorId and healthInsuranceId must be provided");
  }

  const updated = await updateDoctorHealthInsurance(id, doctorId, healthInsuranceId);
  res.status(200).json(updated);
};

export const deleteDoctorHealthInsuranceHandler = async (req: Request, res: Response) => {
  const { id } = req.params;
  await deleteDoctorHealthInsurance(id);
  res.status(204).send();
};