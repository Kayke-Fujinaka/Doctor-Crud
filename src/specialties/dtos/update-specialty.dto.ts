import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateSpecialtyInformationDto {
  @IsString()
  @MaxLength(120)
  @IsOptional()
  name?: string;
}
