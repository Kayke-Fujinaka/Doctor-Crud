import { IsNotEmpty, IsString, Length } from 'class-validator';
import { UpdatableDoctorDataDTO } from './updatable-doctor-data.dto';

export class UpdateDoctorDTO {
  @IsNotEmpty()
  @IsString()
  @Length(6, 6)
  crm: string;

  data: UpdatableDoctorDataDTO;
}
