import { AppDataSource } from "../config/dataSource";
import { Patient } from "../entities/Patient";
import { NotFoundError } from "../helpers/api-erros";
import { HealthInsurance } from "../entities/HealthInsurance";
import { nullable } from "zod";

const healthInsuranceRepository = AppDataSource.getRepository(HealthInsurance);
const patientRepository = AppDataSource.getRepository(Patient)

export const createPatient = async (
  name: string,
  cpf: string,
  birthDate: Date,
  healthInsuranceId?: string | null
) => {
  let healthInsurance = undefined;

  if (healthInsuranceId) {
      healthInsurance = await healthInsuranceRepository.findOne({ where: { id: healthInsuranceId } });
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
    const healthInsurance = await healthInsuranceRepository.findOne({ where: { id: healthInsuranceId } });
    if (!healthInsurance) throw new NotFoundError("Health insurance not found");
    patient.healthInsurance = healthInsurance;
  } else {
    patient.healthInsurance = null
  }

  patient.name = name ?? patient.name;
  patient.cpf = cpf ?? patient.cpf;
  patient.birthDate = birthDate ?? patient.birthDate;

  return await patientRepository.save(patient);
};


export const deletePatient = async (id: string) => {
  return await patientRepository.delete(id);
};
