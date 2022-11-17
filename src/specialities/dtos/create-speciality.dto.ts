import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSpecialityDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
