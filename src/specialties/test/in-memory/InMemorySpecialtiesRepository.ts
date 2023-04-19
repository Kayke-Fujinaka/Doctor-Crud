import {
  CreateSpecialtyDTO,
  FilterByPropertiesSpecialtyDTO,
  UpdateSpecialtyDTO,
} from '@specialties/dtos';
import { Specialty } from '@specialties/infra/typeorm/entities/specialty.entity';
import { ISpecialtiesRepository } from '@specialties/interfaces';

export class InMemorySpecialtiesRepository implements ISpecialtiesRepository {
  specialties: Specialty[] = [];

  async create(data: CreateSpecialtyDTO): Promise<Specialty> {
    const specialty = new Specialty();

    Object.assign(specialty, data);

    this.specialties.push(specialty);

    return specialty;
  }

  async findAll(): Promise<Specialty[]> {
    return this.specialties;
  }

  async filterByProperties(
    properties: FilterByPropertiesSpecialtyDTO,
  ): Promise<Specialty[]> {
    const keys = Object.keys(properties);

    if (keys.length === 0) return [];

    return this.specialties.filter((specialty) =>
      keys.every((key) =>
        specialty[key].toLowerCase().includes(properties[key].toLowerCase()),
      ),
    );
  }

  async findByName(name: string): Promise<Specialty> {
    return this.specialties.find((specialty) => specialty.name === name);
  }

  async update({ name, newName }: UpdateSpecialtyDTO): Promise<Specialty> {
    const specialty = this.specialties.find(
      (specialty) => specialty.name === name,
    );
    specialty.name = newName;
    return specialty;
  }

  async delete(name: string): Promise<void> {
    const specialty = this.specialties.find(
      (specialty) => specialty.name === name,
    );
    specialty.deleted_at = new Date();
  }
}
