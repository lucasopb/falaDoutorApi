import { DataSource } from "typeorm";
import { Doctor } from "../entities/Doctor";
import { Patient } from "../entities/Patient";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [Doctor, Patient],
  migrations: ["src/migrations/**/*.ts"],
});

