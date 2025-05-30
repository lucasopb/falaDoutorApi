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

export const filterHealthInsurances = async (filters: {
  name?: string;
  code?: string;
  baseValueMin?: number;
  baseValueMax?: number;
}) => {
  const query = healthInsuranceRepository.createQueryBuilder('health_insurance');

  if (filters.name) {
    query.andWhere('health_insurance.name ILIKE :name', { name: `%${filters.name}%` });
  }

  if (filters.code) {
    query.andWhere('health_insurance.code = :code', { code: filters.code });
  }

  if (filters.baseValueMin !== undefined) {
    query.andWhere('CAST(health_insurance.baseValue AS DECIMAL) >= :min', { min: filters.baseValueMin });
  }

  if (filters.baseValueMax !== undefined) {
    query.andWhere('CAST(health_insurance.baseValue AS DECIMAL) <= :max', { max: filters.baseValueMax });
  }

  return query.getMany();
};
