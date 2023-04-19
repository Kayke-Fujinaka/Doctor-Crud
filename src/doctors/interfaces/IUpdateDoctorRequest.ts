import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  ArrayMinSize,
  ArrayNotEmpty,
  IsArray,
  IsEmail,
  IsMobilePhone,
  IsNumberString,
  IsOptional,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';

export class IUpdateDoctorRequest {
  @IsString()
  @MaxLength(120)
  @IsOptional()
  @ApiPropertyOptional({
    example: 'Jonh Doe',
    description: 'Nome do Doutor.',
    type: 'string',
    maxLength: 120,
    required: false,
  })
  name?: string;

  @IsMobilePhone('pt-BR')
  @IsNumberString()
  @Length(13, 13)
  @IsOptional()
  @ApiPropertyOptional({
    example: '5511999999999',
    description: 'Número de Telefone do Doutor.',
    type: 'string',
    minLength: 13,
    maxLength: 13,
    required: false,
  })
  cellphoneNumber?: string;

  @IsEmail()
  @IsOptional()
  @ApiPropertyOptional({
    example: 'johndoe@mail.com',
    description: 'Endereço de e-mail do Doutor.',
    type: 'string',
    required: false,
  })
  email?: string;

  @IsNumberString()
  @Length(8, 8)
  @IsOptional()
  @ApiPropertyOptional({
    example: '00000000',
    description: 'CEP do Doutor.',
    type: 'string',
    minLength: 8,
    maxLength: 8,
    required: false,
  })
  zipCode?: string;

  @IsArray()
  @ArrayMinSize(2)
  @ArrayNotEmpty()
  @IsOptional()
  @ApiPropertyOptional({
    example: ['Pediatria', 'Buco-Maxilo'],
    description: 'Especialidades do Doutor.',
    type: 'string[]',
    required: false,
    isArray: true,
  })
  medicalSpecialties?: string[];
}
