import { IsNumberString, IsString, MaxLength } from 'class-validator';
import {
  Column,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Doctor {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  @IsString()
  @MaxLength(120)
  nome: string;

  @Column()
  @IsNumberString()
  @MaxLength(7)
  crm: string;

  @Column()
  @IsNumberString()
  @MaxLength(15)
  landlinePhone: string;

  @Column()
  @IsNumberString()
  @MaxLength(15)
  mobilePhone: string;

  @Column()
  @IsNumberString()
  zipCode: string;

  @Column()
  @IsString()
  medicalSpecialty: string;

  @DeleteDateColumn()
  deletedAt?: Date;
}
