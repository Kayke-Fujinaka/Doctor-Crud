import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class UpdateSpecialtyDTO {
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

  @IsNotEmpty()
  @IsString()
  @MaxLength(120)
  @ApiProperty({
    description: 'O novo nome da especialidade.',
    example: 'Pediatria',
    type: String,
    maxLength: 120,
    required: true,
  })
  newName: string;
}
