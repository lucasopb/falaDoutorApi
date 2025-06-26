import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Patient } from "./Patient";
import { Doctor } from "./Doctor";
import { HealthInsurance } from "./HealthInsurance";

@Entity()
export class Appointment {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => Patient, { eager: true })
  patient!: Patient;

  @ManyToOne(() => Doctor, { eager: true })
  doctor!: Doctor;

  @Column()
  date!: Date;

  @Column({ nullable: true })
  observation!: string;
}
