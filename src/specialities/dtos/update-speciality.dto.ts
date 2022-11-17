import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateSpecialityInfoDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
