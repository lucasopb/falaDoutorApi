import { DataSource } from "typeorm";
import { Doctor } from "../entities/Doctor";
import { Patient } from "../entities/Patient";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "postgres-db",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "falaDoutorDB",
  synchronize: true,
  logging: false,
  entities: [Doctor, Patient],
  migrations: ["src/migrations/**/*.ts"],
});

