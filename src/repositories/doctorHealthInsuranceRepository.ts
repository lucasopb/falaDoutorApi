import { AppDataSource } from "../config/dataSource";
import { DoctorHealthInsurance } from "../entities/DoctorHealthInsurance";
import { ConflictError, NotFoundError } from "../helpers/api-erros";
import { getDoctorById } from "./doctorRepository";
import { getHealthInsuranceById } from "./healthInsuranceRepository";

const doctorHealthInsuranceRepository = AppDataSource.getRepository(DoctorHealthInsurance);

export const createDoctorHealthInsurances = async (
  doctorId: string,
  healthInsuranceId: string
) => {
  const doctor = await getDoctorById(doctorId)
  if (!doctor) throw new NotFoundError("Doctor not found");

  const healthInsurance = await getHealthInsuranceById(healthInsuranceId);
  if (!healthInsurance) throw new NotFoundError("Health Insurance not found")

  const existingRelation = await doctorHealthInsuranceRepository.findOne({
    where: { doctor: { id: doctorId }, healthInsurance: { id: healthInsuranceId } },
    relations: ["doctor", "healthInsurance"],
  });
  if (existingRelation) throw new ConflictError("this relationship already exists")

  const newRelation = doctorHealthInsuranceRepository.create({
    doctor,
    healthInsurance,
  });

  await doctorHealthInsuranceRepository.save(newRelation);

  return newRelation
}

export const getAllDoctorHealthInsurances = async () => {
  return await doctorHealthInsuranceRepository.find({
    relations: ["doctor", "healthInsurance"],
  });
};

export const getDoctorHealthInsuranceById = async (id: string) => {
  const relation = await doctorHealthInsuranceRepository.findOne({
    where: { id },
    relations: ["doctor", "healthInsurance"],
  });

  if (!relation) throw new NotFoundError("Doctor-HealthInsurance relation not found");
  return relation;
};

export const updateDoctorHealthInsurance = async (
  id: string,
  doctorId: string,
  healthInsuranceId: string
) => {
  const relation = await doctorHealthInsuranceRepository.findOne({
    where: { id },
    relations: ["doctor", "healthInsurance"],
  });
  if (!relation) throw new NotFoundError("Relation not found");

  const doctor = await getDoctorById(doctorId);
  if (!doctor) throw new NotFoundError("Doctor not found");

  const healthInsurance = await getHealthInsuranceById(healthInsuranceId);
  if (!healthInsurance) throw new NotFoundError("Health Insurance not found");

  const existing = await doctorHealthInsuranceRepository.findOne({
    where: { doctor: { id: doctorId }, healthInsurance: { id: healthInsuranceId } },
    relations: ["doctor", "healthInsurance"],
  });

  if (existing && existing.id !== id) {
    throw new ConflictError("This relationship already exists");
  }

  relation.doctor = doctor;
  relation.healthInsurance = healthInsurance;

  await doctorHealthInsuranceRepository.save(relation);
  return relation;
};

export const deleteDoctorHealthInsurance = async (id: string) => {
  const relation = await doctorHealthInsuranceRepository.findOneBy({ id });
  if (!relation) throw new NotFoundError("Relation not found");

  await doctorHealthInsuranceRepository.remove(relation);
};