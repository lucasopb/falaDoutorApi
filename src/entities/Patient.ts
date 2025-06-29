import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { HealthInsurance } from "./HealthInsurance";

@Entity()
export class Patient {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({unique: true})
  name!: string;

  @Column()
  cpf!: string;

  @Column()
  birthDate!: Date;

  @ManyToOne(() => HealthInsurance, (insurance) => insurance.patients, { nullable: true, onDelete: "SET NULL" })
  @JoinColumn({ name: "health_insurance_id" })
  healthInsurance?: HealthInsurance | null;
}
