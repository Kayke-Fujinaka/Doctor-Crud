import { IsString } from 'class-validator';
import { Doctor } from 'src/doctors/entities/doctors.entities';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Speciality {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @IsString()
  name: string;

  @ManyToMany(() => Doctor, {
    cascade: true,
  })
  @JoinTable()
  doctor: Doctor;
}
