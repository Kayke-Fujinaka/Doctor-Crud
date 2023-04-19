import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateSpecialtyDTO } from '@specialties/dtos';
import { Specialty } from '@specialties/infra/typeorm/entities/specialty.entity';
import { ISpecialtiesRepository } from '@specialties/interfaces';

@Injectable()
export class UpdateSpecialtyUseCase {
  constructor(private specialtiesRepository: ISpecialtiesRepository) {}

  async execute({ name, newName }: UpdateSpecialtyDTO): Promise<Specialty> {
    const specialty = await this.specialtiesRepository.findByName(name);

    if (!specialty) {
      throw new NotFoundException('Specialty does not exist');
    }

    return this.specialtiesRepository.update({ name, newName });
  }
}
