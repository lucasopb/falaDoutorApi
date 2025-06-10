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