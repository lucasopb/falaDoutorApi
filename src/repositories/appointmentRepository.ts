import { AppDataSource } from "../config/dataSource";
import { Appointment } from "../entities/Appointment";
import { Doctor } from "../entities/Doctor";
import { Patient } from "../entities/Patient";
import { NotFoundError, BadRequestError } from "../helpers/api-erros";
import { Between } from "typeorm";

const appointmentRepository = AppDataSource.getRepository(Appointment);

export const createAppointment = async (
  doctorId: string,
  patientId: string,
  date: Date,
  observation: string
) => {
  const doctor = await AppDataSource.getRepository(Doctor).findOne({
    where: { id: doctorId },
    relations: { doctorHealthInsurances: { healthInsurance: true } }
  });

  if (!doctor) throw new NotFoundError("Doctor not found");

  const patient = await AppDataSource.getRepository(Patient).findOne({
    where: { id: patientId },
    relations: { healthInsurance: true }
  });

  if (!patient) throw new NotFoundError("Patient not found");

  const patientPlanId = patient.healthInsurance?.id;

  if (patientPlanId) {
    const acceptedPlans = doctor.doctorHealthInsurances.map(dhi => dhi.healthInsurance.id);
    if (!acceptedPlans.includes(patientPlanId)) {
      throw new BadRequestError("Doctor does not accept the patient's health insurance.");
    }
  }

  const newAppointment = appointmentRepository.create({
    doctor,
    patient,
    date,
    observation,
  });

  return await appointmentRepository.save(newAppointment);
};

export const getAppointments = async () => {
  return await appointmentRepository.find({
    relations: {
      doctor: true,
      patient: {
        healthInsurance: true // <- adicione isso
      }
    },
    order: {
      date: "DESC",
    }
  });
};

export const getAppointmentById = async (id: string) => {
  const appointment = await appointmentRepository.findOneBy({ id });
  if (!appointment) throw new NotFoundError("Appointment not found");
  return appointment;
};

export const deleteAppointment = async (id: string) => {
  await getAppointmentById(id);
  return await appointmentRepository.delete(id);
}

export const updateAppointment = async (
  id: string,
  date?: Date,
  observation?: string
) => {
  const appointment = await appointmentRepository.findOneBy({ id });

  if (!appointment) throw new NotFoundError("Appointment not found");

  if (date) appointment.date = date;
  if (typeof observation !== "undefined") appointment.observation = observation;

  return await appointmentRepository.save(appointment);
};

export const filterAppointments = async (
  filters: {
    doctorId?: string;
    patientId?: string;
    healthInsurance?: string;
    dateMin?: Date;
    dateMax?: Date;
  },
  limit: number,
  offset: number
  ) => {
    const query = AppDataSource
    .getRepository(Appointment)
    .createQueryBuilder("appointment")
    .leftJoinAndSelect("appointment.doctor", "doctor")
    .leftJoinAndSelect("appointment.patient", "patient")
    .leftJoinAndSelect("patient.healthInsurance", "healthInsurance"); // << CORREÇÃO AQUI

  if (filters.doctorId) {
    query.andWhere("doctor.id = :doctorId", { doctorId: filters.doctorId });
  }

  if (filters.patientId) {
    query.andWhere("patient.id = :patientId", { patientId: filters.patientId });
  }

  if (filters.healthInsurance) {
    query.andWhere("healthInsurance.name = :healthInsurance", {
      healthInsurance: filters.healthInsurance,
    });
  }

  if (filters.dateMin && filters.dateMax) {
    query.andWhere("appointment.date BETWEEN :dateMin AND :dateMax", {
      dateMin: filters.dateMin,
      dateMax: filters.dateMax,
    });
  } else if (filters.dateMin) {
    query.andWhere("appointment.date >= :dateMin", {
      dateMin: filters.dateMin,
    });
  } else if (filters.dateMax) {
    query.andWhere("appointment.date <= :dateMax", {
      dateMax: filters.dateMax,
    });
  }

  const [data, total] = await query
    .skip(offset)
    .take(limit)
    .getManyAndCount();

  return { data, total };
};

export const getTodayAppointments = async () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  return await AppDataSource.getRepository(Appointment).find({
    where: {
      date: Between(today, tomorrow),
    },
    relations: ["doctor", "patient"],
    order: { date: "ASC" },
  });
};