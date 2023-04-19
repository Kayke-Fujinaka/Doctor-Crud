import { Injectable } from '@nestjs/common';
import { Specialty } from '@specialties/infra/typeorm/entities/specialty.entity';
import { ISpecialtiesRepository } from '@specialties/interfaces';

@Injectable()
export class FindAllSpecialtiesUseCase {
  constructor(private specialtiesRepository: ISpecialtiesRepository) {}

  async execute(): Promise<Specialty[]> {
    return this.specialtiesRepository.findAll();
  }
}
