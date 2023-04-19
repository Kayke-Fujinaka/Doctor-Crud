import { Injectable } from '@nestjs/common';
import { FilterByPropertiesSpecialtyDTO } from '@specialties/dtos';
import { Specialty } from '@specialties/infra/typeorm/entities/specialty.entity';
import { ISpecialtiesRepository } from '@specialties/interfaces';

@Injectable()
export class FilterByPropertiesUseCase {
  constructor(private specialtiesRepository: ISpecialtiesRepository) {}

  async execute(
    properties: FilterByPropertiesSpecialtyDTO,
  ): Promise<Specialty[]> {
    const keys = Object.keys(properties);

    if (keys.length === 0) return [];

    const specialties = await this.specialtiesRepository.filterByProperties(
      properties,
    );

    return specialties;
  }
}
