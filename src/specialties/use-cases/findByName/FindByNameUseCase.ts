import { Injectable, NotFoundException } from '@nestjs/common';

import { Specialty } from '@specialties/infra/typeorm/entities/specialty.entity';
import { ISpecialtiesRepository } from '@specialties/interfaces';

@Injectable()
export class FindByNameUseCase {
  constructor(private specialtiesRepository: ISpecialtiesRepository) {}

  async execute(name: string): Promise<Specialty> {
    const specialty = await this.specialtiesRepository.findByName(name);

    if (!specialty) {
      throw new NotFoundException('Specialty does not exist');
    }

    return specialty;
  }
}
