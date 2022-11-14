import { IsNumber, IsString, MaxLength } from 'class-validator';
import {
  Column,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class DoctorModel {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  @IsString()
  @MaxLength(120)
  nome: string;

  @Column()
  @IsNumber()
  @MaxLength(7)
  crm: number;

  @Column()
  @IsNumber()
  landlinePhone: number;

  @Column()
  @IsNumber()
  mobilePhone: number;

  @Column()
  @IsNumber()
  zipCode: number;

  @Column()
  @IsString()
  medicalSpecialty: string;

  @DeleteDateColumn()
  deletedAt?: Date;
}
