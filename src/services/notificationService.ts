import { getTodayAppointments } from "../repositories/appointmentRepository";

export const listTodayNotifications = async () => {
  const appointments = await getTodayAppointments();

  return appointments.map((appt) => ({
    id: appt.id,
    time: appt.date.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
    patient: appt.patient.name,
    doctor: appt.doctor.name,
    observation: appt.observation,
  }));
};
