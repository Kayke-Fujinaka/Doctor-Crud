import { Injectable, NotFoundException } from '@nestjs/common';
import { ISpecialtiesRepository } from '@specialties/interfaces';

@Injectable()
export class DeleteSpecialtyUseCase {
  constructor(private specialtiesRepository: ISpecialtiesRepository) {}
  async execute(name: string) {
    const specialty = await this.specialtiesRepository.findByName(name);

    if (!specialty) throw new NotFoundException('Specialty does not exist');

    await this.specialtiesRepository.delete(name);
  }
}
