import { AppDataSource } from "../config/dataSource";
import { Patient } from "../entities/Patient";
import { NotFoundError } from "../helpers/api-erros";

const patientRepository = AppDataSource.getRepository(Patient)

export const createPatient = async (
    name: string,
    cpf: string,
    birthDate: Date,
    health_insurance: string
) => {
    const newPatient = patientRepository.create({ name, cpf, birthDate, health_insurance });
    return await patientRepository.save(newPatient);
}

export const getPatient = async () => {
  return await patientRepository.find();
};

export const getPatientById = async (id: string) => {
  const patient = await patientRepository.findOne({ where: { id } });
  if (!patient) throw new NotFoundError("Patient not found")
  
  return patient
};

export const updatePatient = async (
  id: string,
  name?: string,
  cpf?: string,
  birthDate?: Date,
  health_insurance?: string,
) => {
  const patient = await getPatientById(id);

  patient.name = name ?? patient.name;
  patient.cpf = cpf ?? patient.cpf;
  patient.birthDate = birthDate ?? patient.birthDate;
  patient.health_insurance = health_insurance ?? patient.health_insurance;

  return await patientRepository.save(patient);
};

export const deletePatient = async (id: string) => {
  return await patientRepository.delete(id);
};
