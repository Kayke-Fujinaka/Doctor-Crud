import { IsNumberString, IsString, MaxLength } from 'class-validator';
import { Speciality } from 'src/specialitys/entities/speciality.entity';
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

  @ManyToMany(() => Speciality)
  @JoinTable()
  medicalSpecialty: Speciality[];

  @DeleteDateColumn()
  deletedAt?: Date;
}
