import { AppDataSource } from "../config/dataSource";
import { Doctor } from "../entities/Doctor";

const doctorRepository = AppDataSource.getRepository(Doctor);

export const createDoctor = async (
  name: string,
  cpf: string,
  crm: string,
  birthDate: Date
) => {
  const newDoctor = doctorRepository.create({ name, cpf, crm, birthDate });
  return await doctorRepository.save(newDoctor);
};

export const getDoctors = async () => {
  return await doctorRepository.find();
};

export const getDoctorById = async (id: string) => {
  return await doctorRepository.findOne({ where: { id } });
};

export const updateDoctor = async (
  id: string,
  name?: string,
  cpf?: string,
  crm?: string,
  birthDate?: Date
) => {
  const doctor = await getDoctorById(id);
  if (!doctor) throw new Error("Doctor not found");

  doctor.name = name ?? doctor.name;
  doctor.cpf = cpf ?? doctor.cpf;
  doctor.crm = crm ?? doctor.crm;
  doctor.birthDate = birthDate ?? doctor.birthDate;

  return await doctorRepository.save(doctor);
};

export const deleteDoctor = async (id: string) => {
  const doctor = await getDoctorById(id);
  if (!doctor) throw new Error("Doctor not found");

  return await doctorRepository.delete(id);
};
