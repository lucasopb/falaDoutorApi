import { AppDataSource } from "../config/dataSource";
import { Patient } from "../entities/Patient";
import { NotFoundError } from "../helpers/api-erros";
import { getHealthInsuranceById } from "./healthInsuranceRepository";

const patientRepository = AppDataSource.getRepository(Patient)

export const createPatient = async (
  name: string,
  cpf: string,
  birthDate: Date,
  healthInsuranceId?: string | null
) => {
  let healthInsurance = undefined;

  if (healthInsuranceId) {
      healthInsurance = await getHealthInsuranceById(healthInsuranceId);
      if (!healthInsurance) throw new NotFoundError("Health insurance not found");
    }

  const newPatient = patientRepository.create({
      name,
      cpf,
      birthDate,
      healthInsurance, // assigned as an object
  });

  return await patientRepository.save(newPatient);
};

export const getPatient = async () => {
  return await patientRepository.find({
    relations: ["healthInsurance"],
  });
};

export const getPatientById = async (id: string) => {
  const patient = await patientRepository.findOne({
    where: { id },
    relations: ["healthInsurance"],
  });
  if (!patient) throw new NotFoundError("Patient not found")
  
  return patient
};

export const updatePatient = async (
  id: string,
  name?: string,
  cpf?: string,
  birthDate?: Date,
  healthInsuranceId?: string | null,
) => {
  const patient = await getPatientById(id);

  if (healthInsuranceId) {
    const healthInsurance = await getHealthInsuranceById(healthInsuranceId);
    if (!healthInsurance) throw new NotFoundError("Health insurance not found");
    patient.healthInsurance = healthInsurance;
  } else {
    patient.healthInsurance = null;
  }

  patient.name = name ?? patient.name;
  patient.cpf = cpf ?? patient.cpf;
  patient.birthDate = birthDate ?? patient.birthDate;

  return await patientRepository.save(patient);
};

export const deletePatient = async (id: string) => {
  return await patientRepository.delete(id);
};

export const filterPatients = async (filters: {
  name?: string;
  cpf?: string;
  healthInsuranceId?: string;
  ageMin?: number;
  ageMax?: number;
}) => {
  const query = patientRepository.createQueryBuilder("patient");

  if (filters.name) {
    query.andWhere('patient.name ILIKE :name', { name: `%${filters.name}%` });
  }

  if (filters.cpf) {
    query.andWhere('patient.cpf = :cpf', { cpf: filters.cpf });
  }

  if (filters.healthInsuranceId) {
    query.andWhere('patient.health_insurance_id = :healthInsuranceId', { healthInsuranceId: filters.healthInsuranceId });
  }

  if (filters.ageMin || filters.ageMax) {
    const today = new Date();
    const dateMin = filters.ageMax ? new Date(today.getFullYear() - filters.ageMax, 0, 1) : null;
    const dateMax = filters.ageMin ? new Date(today.getFullYear() - filters.ageMin, 11, 31) : null;

    if (dateMin && dateMax) {
      query.andWhere('patient.birthDate BETWEEN :dateMin AND :dateMax', { dateMin, dateMax });
    } else if (dateMin) {
      query.andWhere('patient.birthDate <= :dateMin', { dateMin });
    } else if (dateMax) {
      query.andWhere('patient.birthDate >= :dateMax', { dateMax });
    }
  }

  return query.getMany();
}
