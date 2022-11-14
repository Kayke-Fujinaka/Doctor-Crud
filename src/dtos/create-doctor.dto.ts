import {
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateDoctorDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(120)
  nome: string;

  @IsNumber()
  crm: number;

  @IsNumberString()
  landlinePhone: string;

  @IsNumberString()
  mobilePhone: string;

  @IsNumber()
  zipCode: number;

  @IsString()
  medicalSpecialty: string;
}
