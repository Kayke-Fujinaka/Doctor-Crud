import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateSpecialtyInformationDto {
  @IsNotEmpty()
  @IsString()
  name?: string;
}
