import { AppDataSource } from "../config/dataSource";
import { Patient } from "../entities/Patient";
import { NotFoundError } from "../helpers/api-erros";
import { getHealthInsuranceById } from "./healthInsuranceRepository";
import { convertAgeToBirthdate } from "../helpers/convert-age";

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

export const getPatients = async (limit: number, offset: number) => {
  const [patients, total] = await patientRepository.findAndCount({
    skip: offset,
    take: limit,
    relations: ['healthInsurance'],
    order: {
      name: 'ASC'
    }
  });

  return { patients, total };
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

export const filterPatients = async (
  filters: {
    name?: string;
    cpf?: string;
    healthInsuranceId?: string;
    ageMin?: number;
    ageMax?: number;
  },
  limit: number,
  offset: number
) => {
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

  const { birthdateMin, birthdateMax } = convertAgeToBirthdate(filters.ageMin, filters.ageMax);

  if (birthdateMin && birthdateMax) {
    query.andWhere('patient.birthDate BETWEEN :birthdateMin AND :birthdateMax', { birthdateMin, birthdateMax });
  } else if (birthdateMin) {
    query.andWhere('patient.birthDate <= :birthdateMin', { birthdateMin });
  } else if (birthdateMax) {
    query.andWhere('patient.birthDate >= :birthdateMax', { birthdateMax });
  }

  const [data, total] = await query
    .skip(offset)
    .take(limit)
    .getManyAndCount();

  return { data, total };
}
