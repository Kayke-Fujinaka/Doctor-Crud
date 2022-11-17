import { IsArray, IsOptional } from 'class-validator';
import { Speciality } from 'src/specialitys/entities/speciality.entity';

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
  medicalSpecialty?: Speciality[];
}
