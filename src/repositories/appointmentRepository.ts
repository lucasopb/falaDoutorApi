import { AppDataSource } from "../config/dataSource";
import { Appointment } from "../entities/Appointment";
import { Doctor } from "../entities/Doctor";
import { Patient } from "../entities/Patient";
import { HealthInsurance } from "../entities/HealthInsurance";
import { NotFoundError, BadRequestError } from "../helpers/api-erros";

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
  return await appointmentRepository.find();
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