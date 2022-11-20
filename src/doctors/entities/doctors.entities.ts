import { IsNumberString, IsString, MaxLength } from 'class-validator';
import { Speciality } from 'src/specialties/entities/specialties.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Doctor {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  @IsString()
  @MaxLength(120)
  name: string;

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
  street: string;

  @Column()
  @IsString()
  complement: string;

  @Column()
  @IsString()
  district: string;

  @Column()
  @IsString()
  city: string;

  @Column()
  @IsString()
  state: string;

  @ManyToMany(() => Speciality, (medicalSpeciality) => medicalSpeciality)
  @JoinTable({ name: 'doctor_specialties' })
  medicalSpeciality: Speciality[];

  @DeleteDateColumn()
  deletedAt?: Date;
}
