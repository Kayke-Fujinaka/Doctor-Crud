import {
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class UpdateDoctorInfoDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MaxLength(120)
  nome?: string;

  @IsOptional()
  @IsNumber()
  crm?: number;

  @IsOptional()
  @IsNumberString()
  landlinePhone?: string;

  @IsOptional()
  @IsNumberString()
  mobilePhone?: string;

  @IsOptional()
  @IsNumber()
  zipCode?: number;

  @IsOptional()
  @IsString()
  medicalSpecialty?: string;
}
