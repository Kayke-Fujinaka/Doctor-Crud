import { ApiPropertyOptional } from '@nestjs/swagger';

import {
  ArrayNotEmpty,
  IsArray,
  IsEmail,
  IsMobilePhone,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';

export class FilterByPropertiesDoctorDTO {
  @IsNotEmpty()
  @IsOptional()
  @IsString()
  @MaxLength(120)
  @ApiPropertyOptional({
    example: 'Jonh Doe',
    description: 'Nome do Doutor.',
    type: 'string',
    maxLength: 120,
    required: false,
  })
  name?: string;

  @IsNotEmpty()
  @IsOptional()
  @IsNumberString()
  @Length(6, 6)
  @ApiPropertyOptional({
    example: '123456',
    description: 'CRM do Doutor.',
    type: 'string',
    minLength: 6,
    maxLength: 6,
    required: false,
  })
  crm?: string;

  @IsNotEmpty()
  @IsOptional()
  @IsEmail()
  @ApiPropertyOptional({
    example: 'johndoe@mail.com',
    description: 'Endereço de e-mail do Doutor.',
    type: 'string',
    required: false,
  })
  email?: string;

  @IsNotEmpty()
  @IsOptional()
  @IsMobilePhone('pt-BR')
  @IsNumberString()
  @Length(13, 13)
  @ApiPropertyOptional({
    example: '5511999999999',
    description: 'Número de Telefone do Doutor.',
    type: 'string',
    minLength: 13,
    maxLength: 13,
    required: false,
  })
  cellphoneNumber?: string;

  @IsNotEmpty()
  @IsOptional()
  @IsNumberString()
  @Length(8, 8)
  @ApiPropertyOptional({
    example: '00000000',
    description: 'CEP do Doutor.',
    type: 'string',
    minLength: 8,
    maxLength: 8,
    required: false,
  })
  zipCode?: string;

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @ApiPropertyOptional({
    example: ['Pediatria', 'Buco-Maxilo'],
    description: 'Especialidades do Doutor.',
    type: 'string[]',
    required: false,
    isArray: true,
  })
  medicalSpecialties?: string[];
}
