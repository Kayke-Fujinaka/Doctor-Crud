import { IsNumber, IsString, MaxLength } from 'class-validator';

export class DoctorSchema {
  @IsString()
  @MaxLength(120)
  nome: string;

  @IsNumber()
  @MaxLength(7)
  crm: number;

  @IsNumber()
  landlinePhone: number;

  @IsNumber()
  mobilePhone: number;

  @IsNumber()
  zipCode: number;

  @IsString()
  medicalSpecialty: string;
}
