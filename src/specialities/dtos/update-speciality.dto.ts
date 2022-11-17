import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateSpecialityDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
