import { IsOptional, MaxLength } from 'class-validator';
import { Speciality } from 'src/specialties/entities/specialties.entity';

export class UpdateDoctorInfoDto {
  @IsOptional()
  @MaxLength(120)
  name?: string;

  @IsOptional()
  @MaxLength(7)
  landlinePhone?: string;

  @IsOptional()
  mobilePhone?: string;

  @IsOptional()
  zipCode?: string;

  @IsOptional()
  street?: string;

  @IsOptional()
  complement?: string;

  @IsOptional()
  district?: string;

  @IsOptional()
  city?: string;

  @IsOptional()
  state?: string;

  @IsOptional()
  medicalSpeciality?: Speciality[];
}
