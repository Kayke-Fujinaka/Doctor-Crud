import { Injectable } from '@nestjs/common';

import { FilterByPropertiesDoctorDTO } from '@doctors/dtos';
import { Doctor } from '@doctors/infra/typeorm/entities/doctor.entity';
import { IDoctorsRepository } from '@doctors/interfaces';

@Injectable()
export class FilterByPropertiesUseCase {
  constructor(private doctorsRepository: IDoctorsRepository) {}

  async execute(properties: FilterByPropertiesDoctorDTO): Promise<Doctor[]> {
    const keys = Object.keys(properties);

    if (keys.length === 0) return [];

    return this.doctorsRepository.filterByProperties(properties);
  }
}
