import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSpecialityDto } from '../dtos/create-speciality.dto';
import { Speciality } from '../entities/specialities.entity';

@Injectable()
export class SpecialitiesService {
  constructor(
    @InjectRepository(Speciality)
    private readonly specialtyRepository: Repository<Speciality>,
  ) {}

  public async create(body: CreateSpecialityDto): Promise<Speciality> {
    const specialitiesCreated = this.specialtyRepository.create(body);
    return this.specialtyRepository.save(specialitiesCreated);
  }

  public async readAll(): Promise<Speciality[]> {
    return this.specialtyRepository.find();
  }

  public async update(id: string, name: string): Promise<Speciality | string> {
    const hasSpecialityId = await this.specialtyRepository.findOne({
      where: { id },
    }); // Criar uma função Reutilizável

    if (!hasSpecialityId)
      throw new NotFoundException(`we couldn't find a doctor with id: ${id}`);

    await this.specialtyRepository.update({ id }, { name });

    return this.specialtyRepository.findOne({ where: { id } });
  }

  public async delete(id: string): Promise<string> {
    const hasSpeciality = await this.specialtyRepository.findOne({
      where: { id },
    });

    if (!hasSpeciality)
      throw new NotFoundException(
        `we couldn't find a speciality with id: ${id}`,
      );

    await this.specialtyRepository.delete({ id });

    return `the speciality with the id '${id}' was successfully deleted!`;
  }
}
