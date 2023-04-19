import { Specialty } from '@specialties/infra/typeorm/entities/specialty.entity';
import {
  ArrayMinSize,
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsNumberString,
  Length,
} from 'class-validator';

export class AddSpecialtiesDTO {
  @IsNotEmpty()
  @IsNumberString()
  @Length(6, 6)
  crm: string;

  @IsArray()
  @ArrayMinSize(2)
  @ArrayNotEmpty()
  medicalSpecialties: Specialty[];
}
