import { ApiProperty } from '@nestjs/swagger';

import {
  ArrayMinSize,
  ArrayNotEmpty,
  IsArray,
  IsEmail,
  IsMobilePhone,
  IsNotEmpty,
  IsNumberString,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';

export class ICreateDoctorRequest {
  @IsNotEmpty()
  @IsString()
  @MaxLength(120)
  @ApiProperty({
    example: 'John Doe',
    description: 'Nome do Doutor.',
    type: 'string',
    maxLength: 120,
    required: true,
  })
  name: string;

  @IsNotEmpty()
  @IsNumberString()
  @Length(6, 6)
  @ApiProperty({
    example: '123456',
    description: 'CRM do Doutor.',
    type: 'string',
    minLength: 6,
    maxLength: 6,
    required: true,
  })
  crm: string;

  @IsNotEmpty()
  @IsMobilePhone('pt-BR')
  @IsNumberString()
  @Length(13, 13)
  @ApiProperty({
    example: '5511999999999',
    description: 'Número de Telefone do Doutor.',
    type: 'string',
    minLength: 13,
    maxLength: 13,
    required: true,
  })
  cellphoneNumber: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    example: 'johndoe@mail.com',
    description: 'Endereço de e-mail do Doutor.',
    type: 'string',
    required: true,
  })
  email: string;

  @IsNotEmpty()
  @IsNumberString()
  @Length(8, 8)
  @ApiProperty({
    example: '00000000',
    description: 'CEP do Doutor.',
    type: 'string',
    minLength: 8,
    maxLength: 8,
    required: true,
  })
  zipCode: string;

  @IsArray()
  @ArrayMinSize(2)
  @ArrayNotEmpty()
  @ApiProperty({
    example: ['Pediatria', 'Buco-Maxilo'],
    description: 'Especialidades do Doutor.',
    type: 'string[]',
    required: true,
    isArray: true,
  })
  medicalSpecialties: string[];
}
