import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreateSpecialtyDTO,
  FilterByPropertiesSpecialtyDTO,
  UpdateSpecialtyDTO,
} from '@specialties/dtos';
import { Repository } from 'typeorm';
import { Specialty } from '../entities/specialty.entity';

@Injectable()
export class SpecialtiesRepository {
  constructor(
    @InjectRepository(Specialty)
    private specialtiesRepository: Repository<Specialty>,
  ) {}

  async create({ name }: CreateSpecialtyDTO): Promise<Specialty> {
    const specialty = this.specialtiesRepository.create({ name });

    await this.specialtiesRepository.save(specialty);

    return specialty;
  }

  async findAll(): Promise<Specialty[]> {
    return this.specialtiesRepository.find();
  }

  async filterByProperties(
    properties: FilterByPropertiesSpecialtyDTO,
  ): Promise<Specialty[]> {
    const keys = Object.keys(properties);

    const specialties: Specialty[] = await this.specialtiesRepository.find();

    return specialties.filter((specialty) =>
      keys.every((key) =>
        specialty[key].toLowerCase().includes(properties[key].toLowerCase()),
      ),
    );
  }

  async findByName(name: string): Promise<Specialty> {
    return this.specialtiesRepository.findOne({ where: { name } });
  }

  async update({ name, newName }: UpdateSpecialtyDTO): Promise<Specialty> {
    await this.specialtiesRepository.update({ name }, { name: newName });

    return this.findByName(newName);
  }

  async delete(name: string): Promise<void> {
    await this.specialtiesRepository.softDelete({ name });
  }
}
