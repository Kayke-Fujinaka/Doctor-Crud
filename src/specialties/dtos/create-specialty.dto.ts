import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateSpecialtyDTO {
  @IsNotEmpty()
  @IsString()
  @MaxLength(120)
  @ApiProperty({
    description: 'O nome da especialidade.',
    example: 'Alergologia',
    type: String,
    maxLength: 120,
    required: true,
  })
  name: string;
}
