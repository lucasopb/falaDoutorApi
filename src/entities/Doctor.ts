import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { DoctorHealthInsurance } from "./DoctorHealthInsurance";

@Entity()
export class Doctor {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({unique: true})
  name!: string;

  @Column()
  cpf!: string;

  @Column()
  crm!: string;

  @Column()
  birthDate!: Date;

  @OneToMany(() => DoctorHealthInsurance, (dhi) => dhi.doctor)
  doctorHealthInsurances!: DoctorHealthInsurance[];
}
