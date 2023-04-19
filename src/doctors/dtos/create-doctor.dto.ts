import { Specialty } from '@specialties/infra/typeorm/entities/specialty.entity';
import {
  ArrayMinSize,
  ArrayNotEmpty,
  IsArray,
  IsEmail,
  IsMobilePhone,
  IsNotEmpty,
  IsNumberString,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';

export class CreateDoctorDTO {
  @IsNotEmpty()
  @IsString()
  @MaxLength(120)
  name: string;

  @IsNotEmpty()
  @IsNumberString()
  @Length(6, 6)
  crm: string;

  @IsNotEmpty()
  @IsMobilePhone('pt-BR')
  @IsNumberString()
  @Length(13, 13)
  cellphoneNumber: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsNumberString()
  @Length(8, 8)
  zipCode: string;

  @IsArray()
  @ArrayMinSize(2)
  @ArrayNotEmpty()
  medicalSpecialties: Specialty[];
}
