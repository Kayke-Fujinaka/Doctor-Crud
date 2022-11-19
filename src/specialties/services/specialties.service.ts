import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSpecialtyDto } from '../dtos/create-specialty.dto';
import { Speciality } from '../entities/specialties.entity';

@Injectable()
export class SpecialtiesService {
  constructor(
    @InjectRepository(Speciality)
    private readonly specialtyRepository: Repository<Speciality>,
  ) {}

  public async create(body: CreateSpecialtyDto): Promise<Speciality> {
    const specialitiesCreated = this.specialtyRepository.create(body);
    return this.specialtyRepository.save(specialitiesCreated);
  }

  public async readAll(): Promise<Speciality[]> {
    return this.specialtyRepository.find();
  }

  public async update(id: string, name: string): Promise<Speciality | string> {
    const hasSpecialtyId = await this.specialtyRepository.findOne({
      where: { id },
    }); // Criar uma função Reutilizável

    if (!hasSpecialtyId)
      throw new NotFoundException(`we couldn't find a doctor with id: ${id}`);

    await this.specialtyRepository.update({ id }, { name });

    return this.specialtyRepository.findOne({ where: { id } });
  }

  public async delete(id: string): Promise<string> {
    const hasSpecialty = await this.specialtyRepository.findOne({
      where: { id },
    });

    if (!hasSpecialty)
      throw new NotFoundException(
        `we couldn't find a specialty with id: ${id}`,
      );

    await this.specialtyRepository.delete({ id });

    return `the specialty with the id '${id}' was successfully deleted!`;
  }
}
