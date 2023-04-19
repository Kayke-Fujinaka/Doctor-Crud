import {
  CreateSpecialtyDTO,
  FilterByPropertiesSpecialtyDTO,
  UpdateSpecialtyDTO,
} from '@specialties/dtos';
import { Specialty } from '@specialties/infra/typeorm/entities/specialty.entity';

export abstract class ISpecialtiesRepository {
  abstract create(data: CreateSpecialtyDTO): Promise<Specialty>;

  abstract findAll(): Promise<Specialty[]>;

  abstract filterByProperties(
    properties: FilterByPropertiesSpecialtyDTO,
  ): Promise<Specialty[]>;

  abstract findByName(name: string): Promise<Specialty>;

  abstract update(data: UpdateSpecialtyDTO): Promise<Specialty>;

  abstract delete(name: string): Promise<void>;
}
