import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Patient } from "./Patient";
import { DoctorHealthInsurance } from "./DoctorHealthInsurance";

@Entity()
export class HealthInsurance {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({unique: true})
  name!: string;

  @Column()
  code!: string;

  @Column("decimal", { precision: 10, scale: 2 })
  baseValue!: number;

  @OneToMany(() => Patient, (patient) => patient.healthInsurance)
  patients!: Patient[];

  @OneToMany(() => DoctorHealthInsurance, (dhi) => dhi.healthInsurance)
  doctorHealthInsurances!: DoctorHealthInsurance[];
}
