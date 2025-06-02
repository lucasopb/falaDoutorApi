import { Request, Response, NextFunction } from "express";
import { createHealthInsuranceSchema } from "../validators/healthInsurance/createHealthInsuranceSchema";
import { updateHealthInsuranceSchema } from "../validators/healthInsurance/updateHealthInsuranceSchema";
import { BadRequestError } from "../helpers/api-erros";
import { 
  createHealthInsurance,
  getHealthInsurances,
  getHealthInsuranceById,
  updateHealthInsurance,
  deleteHealthInsurance
} from "../repositories/healthInsuranceRepository";

export const createPatientHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const validHealthInsurance = createHealthInsuranceSchema.safeParse(req.body);

  if (!validHealthInsurance.success) {
    const errorMessages = validHealthInsurance.error.errors
      .map((err: any) => err.message)
      .join(", ");
    throw new BadRequestError(errorMessages);
  }

  const { name, code, baseValue } = validHealthInsurance.data;

  const newDoctor = await createHealthInsurance(
    name,
    code,
    baseValue
  );

  res.status(201).json(newDoctor);
};

export const getHealthInsurancesHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { page, limit, offset } = req.pagination!;
  const { healthInsurances, total } = await getHealthInsurances(limit, offset);

  res.status(200).json({
    data: healthInsurances,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    }
  })
};

export const getHealthInsuranceByIdHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params;

  const healthInsurance = await getHealthInsuranceById(id);
  res.status(200).json(healthInsurance);
};

export const updateHealthInsuranceHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const validHealthInsurance = updateHealthInsuranceSchema.safeParse(req.body);

  if (!validHealthInsurance.success) {
    const errorMessages = validHealthInsurance.error.errors
      .map((err: any) => `${err.path.join('.')}: ${err.message}`)
      .join(", ");
    throw new BadRequestError(errorMessages);
  }

  const { id } = req.params;
  const { name, code, baseValue } = validHealthInsurance.data;

  const updatedDoctor = await updateHealthInsurance(
    id,
    name,
    code,
    baseValue
  );

  res.status(200).json(updatedDoctor);
};

export const deleteHealthInsuranceHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params;

  await deleteHealthInsurance(id);
  res.status(204).send();
};
