import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSpecialtyDto } from '../dtos/create-specialty.dto';
import { Speciality } from '../entities/specialties.entity';

@Injectable()
export class SpecialitiesService {
  constructor(
    @InjectRepository(Speciality)
    private readonly specialityRepository: Repository<Speciality>,
  ) {}

  public async create(body: CreateSpecialtyDto): Promise<Speciality> {
    const specialitiesCreated = this.specialityRepository.create(body);
    return this.specialityRepository.save(specialitiesCreated);
  }

  public async readAll(): Promise<Speciality[]> {
    return this.specialityRepository.find();
  }

  public async update(id: string, name: string): Promise<Speciality | string> {
    const hasSpecialityId = await this.specialityRepository.findOne({
      where: { id },
    }); // Criar uma função Reutilizável

    if (!hasSpecialityId)
      throw new NotFoundException(`we couldn't find a doctor with id: ${id}`);

    await this.specialityRepository.update({ id }, { name });

    return this.specialityRepository.findOne({ where: { id } });
  }

  public async delete(id: string): Promise<string> {
    const hasSpeciality = await this.specialityRepository.findOne({
      where: { id },
    });

    if (!hasSpeciality)
      throw new NotFoundException(
        `we couldn't find a speciality with id: ${id}`,
      );

    await this.specialityRepository.delete({ id });

    return `the speciality with the id '${id}' was successfully deleted!`;
  }
}
