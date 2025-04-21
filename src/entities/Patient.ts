import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Patient {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column()
  cpf!: string;

  @Column()
  birthDate!: Date;

  @Column()
  health_insurance!: string;
}
