import { Specialty } from '@specialties/infra/typeorm/entities/specialty.entity';
import {
  ArrayMinSize,
  ArrayNotEmpty,
  IsArray,
  IsEmail,
  IsMobilePhone,
  IsNumberString,
  IsOptional,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';

export class UpdatableDoctorDataDTO {
  @IsString()
  @MaxLength(120)
  @IsOptional()
  name?: string;

  @IsMobilePhone('pt-BR')
  @IsNumberString()
  @Length(13, 13)
  @IsOptional()
  cellphoneNumber?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsNumberString()
  @Length(8, 8)
  @IsOptional()
  zipCode?: string;

  @IsArray()
  @ArrayMinSize(2)
  @ArrayNotEmpty()
  @IsOptional()
  medicalSpecialties?: Specialty[];
}
