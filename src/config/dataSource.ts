import { DataSource } from "typeorm";
import { Doctor } from "../entities/Doctor";
import { Patient } from "../entities/Patient";
import { HealthInsurance } from "../entities/HealthInsurance";
import { DoctorHealthInsurance } from "../entities/DoctorHealthInsurance";

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
  entities: [Doctor, Patient, HealthInsurance, DoctorHealthInsurance],
  migrations: ["src/migrations/**/*.ts"],
});
