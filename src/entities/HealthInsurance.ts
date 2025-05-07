import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Patient } from "./Patient";

@Entity()
export class HealthInsurance {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column()
  code!: string;

  @Column("decimal", { precision: 10, scale: 2 })
  baseValue!: number;

  @OneToMany(() => Patient, (patient) => patient.healthInsurance)
  patients!: Patient[];
}
