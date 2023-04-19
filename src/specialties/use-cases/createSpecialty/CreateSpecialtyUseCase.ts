import { ConflictException, Injectable } from '@nestjs/common';
import { CreateSpecialtyDTO } from '@specialties/dtos';
import { ISpecialtiesRepository } from '@specialties/interfaces';

@Injectable()
export class CreateSpecialtyUseCase {
  constructor(private specialtiesRepository: ISpecialtiesRepository) {}

  async execute({ name }: CreateSpecialtyDTO) {
    const specialtyAlreadyExists = await this.specialtiesRepository.findByName(
      name,
    );

    if (specialtyAlreadyExists)
      throw new ConflictException('Specialty already exists');

    return this.specialtiesRepository.create({ name });
  }
}
