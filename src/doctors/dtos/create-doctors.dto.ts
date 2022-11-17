import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumberString,
  IsString,
  MaxLength,
} from 'class-validator';
import { Speciality } from 'src/specialities/entities/specialities.entity';

export class CreateDoctorDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(120)
  name: string;

  @IsNotEmpty()
  @IsNumberString()
  @MaxLength(7)
  crm: string;

  @IsNotEmpty()
  @IsNumberString()
  @MaxLength(15)
  landlinePhone: string;

  @IsNotEmpty()
  @IsNumberString()
  @MaxLength(15)
  mobilePhone: string;

  @IsNotEmpty()
  @IsNumberString()
  zipCode: string;

  @IsArray()
  @ArrayMinSize(2)
  medicalSpeciality: Speciality[];
}
