import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Doctor } from "./Doctor";
import { HealthInsurance } from "./HealthInsurance";

@Entity()
export class DoctorHealthInsurance {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => Doctor, (doctor) => doctor.doctorHealthInsurances)
  doctor!: Doctor;

  @ManyToOne(() => HealthInsurance, (healthInsurance) => healthInsurance.doctorHealthInsurances)
  healthInsurance!: HealthInsurance;
}