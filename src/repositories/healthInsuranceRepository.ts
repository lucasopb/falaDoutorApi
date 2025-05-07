import { AppDataSource } from "../config/dataSource";
import { HealthInsurance } from "../entities/HealthInsurance";
import { NotFoundError } from "../helpers/api-erros";

const healthInsuranceRepository = AppDataSource.getRepository(HealthInsurance);

export const createHealthInsurance = async (
  name: string,
  code: string,
  baseValue: number,
) => {
  const healthInsurance = healthInsuranceRepository.create({ name, code, baseValue});
  return await healthInsuranceRepository.save(healthInsurance);
};

export const getHealthInsurance = async () => {
  return await healthInsuranceRepository.find({ relations: ["patients"] });
};

export const getHealthInsuranceById = async (id: string) => {
  const healthInsurance = await healthInsuranceRepository.findOne({ where: { id } });
  if (!healthInsurance) throw new NotFoundError("health insurance not found")

  return healthInsurance
};

export const updateHealthInsurance = async (
  id: string,
  name?: string,
  code?: string,
  baseValue?: number
) => {
  const healthInsurance = await getHealthInsuranceById(id);

  healthInsurance.name = name ?? healthInsurance.name;
  healthInsurance.code = code ?? healthInsurance.code;
  healthInsurance.baseValue = baseValue ?? healthInsurance.baseValue;

  return await healthInsuranceRepository.save(healthInsurance);
};

export const deleteHealthInsurance = async (id: string) => {
  return await healthInsuranceRepository.delete(id);
};
