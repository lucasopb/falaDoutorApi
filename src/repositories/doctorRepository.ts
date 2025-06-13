import { AppDataSource } from "../config/dataSource";
import { Doctor } from "../entities/Doctor";
import { NotFoundError } from "../helpers/api-erros";
import { convertAgeToBirthdate } from "../helpers/convert-age";

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

export const getDoctors = async (limit: number, offset: number) => {
  const [doctors, total] = await doctorRepository.findAndCount({
    skip: offset,
    take: limit,
    order: {
      name: 'ASC'
    }
  });

  return { doctors, total };
};

export const getDoctorById = async (id: string) => {
  const doctor = await doctorRepository.findOne({
    where: { id },
    relations: {
      doctorHealthInsurances: {
        healthInsurance: true
      }
    }
  });

  if (!doctor) throw new NotFoundError("Doctor not found");

  return doctor;
};

export const updateDoctor = async (
  id: string,
  name?: string,
  cpf?: string,
  crm?: string,
  birthDate?: Date
) => {
  const doctor = await getDoctorById(id);

  doctor.name = name ?? doctor.name;
  doctor.cpf = cpf ?? doctor.cpf;
  doctor.crm = crm ?? doctor.crm;
  doctor.birthDate = birthDate ?? doctor.birthDate;

  return await doctorRepository.save(doctor);
};

export const deleteDoctor = async (id: string) => {
  return await doctorRepository.delete(id);
};

export const filterDoctors = async (
  filters: {
    name?: string;
    cpf?: string;
    crm?: string;
    ageMin?: number;
    ageMax?: number;
  }, 
  limit: number,
  offset: number
) => {
  const query = doctorRepository.createQueryBuilder("doctor");

  if (filters.name) {
    query.andWhere("doctor.name ILIKE :name", { name: `%${filters.name}%` });
  }

  if (filters.cpf) {
    query.andWhere("doctor.cpf = :cpf", { cpf: filters.cpf });
  }

  if (filters.crm) {
    query.andWhere("doctor.crm = :crm", { crm: filters.crm });
  }

  const { birthdateMin, birthdateMax } = convertAgeToBirthdate(filters.ageMin, filters.ageMax);

  if (birthdateMin && birthdateMax) {
    query.andWhere("doctor.birthDate BETWEEN :birthdateMin AND :birthdateMax", {
      birthdateMin,
      birthdateMax,
    });
  } else if (birthdateMin) {
    query.andWhere("doctor.birthDate >= :birthdateMin", { birthdateMin });
  } else if (birthdateMax) {
    query.andWhere("doctor.birthDate <= :birthdateMax", { birthdateMax });
  }

  const [data, total] = await query
    .skip(offset)
    .take(limit)
    .getManyAndCount();

  return { data, total };
};