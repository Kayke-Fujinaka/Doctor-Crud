import { IsArray, IsOptional } from 'class-validator';
import { Speciality } from 'src/specialties/entities/specialities.entity';

export class UpdateDoctorInfoDto {
  @IsOptional()
  name?: string;

  @IsOptional()
  landlinePhone?: string;

  @IsOptional()
  mobilePhone?: string;

  @IsOptional()
  zipCode?: string;

  @IsOptional()
  @IsArray()
  medicalSpeciality?: Speciality[];
}
