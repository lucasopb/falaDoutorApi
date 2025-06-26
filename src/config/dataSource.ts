import { DataSource } from "typeorm";
import { Doctor } from "../entities/Doctor";
import { Patient } from "../entities/Patient";
import { HealthInsurance } from "../entities/HealthInsurance";
import { DoctorHealthInsurance } from "../entities/DoctorHealthInsurance";
import { Appointment } from "../entities/Appointment";

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  synchronize: true,
  logging: false,
  ssl: {
    rejectUnauthorized: false, // necessário para a Render
  },
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
  entities: [Doctor, Patient, HealthInsurance, DoctorHealthInsurance, Appointment],
  migrations: ["src/migrations/**/*.ts"],
});
