import { IsOptional } from 'class-validator';

export class UpdateDoctorInfoDto {
  @IsOptional()
  nome?: string;

  @IsOptional()
  crm?: string;

  @IsOptional()
  landlinePhone?: string;

  @IsOptional()
  mobilePhone?: string;

  @IsOptional()
  zipCode?: string;

  @IsOptional()
  medicalSpecialty?: string;
}
