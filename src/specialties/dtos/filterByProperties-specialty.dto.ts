import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { randomUUID } from 'node:crypto';

export class FilterByPropertiesSpecialtyDTO {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: 'O nome da especialidade.',
    example: randomUUID(),
    maxLength: 120,
    type: String,
    required: false,
  })
  id?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'O nome da especialidade.',
    example: 'Odontologia',
    maxLength: 120,
    type: String,
    required: false,
  })
  name?: string;
}
