import { ApiProperty } from '@nestjs/swagger';

export class IAddSpecialtiesRequest {
  @ApiProperty({
    example: '123456',
    description: 'CRM do Doutor.',
    type: 'string',
    minLength: 6,
    maxLength: 6,
    required: true,
  })
  crm: string;

  @ApiProperty({
    example: ['Pediatria', 'Buco-Maxilo'],
    description: 'Especialidades do Doutor.',
    type: 'string[]',
    required: true,
    isArray: true,
  })
  medicalSpecialties: string[];
}
