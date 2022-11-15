import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDoctorDto } from '../dtos/create-doctor.dto';
import { UpdateDoctorInfoDto } from '../dtos/update-doctor.dto';
import { Doctor } from '../entities/doctor.entities';

@Injectable()
export class DoctorService {
  constructor(
    @InjectRepository(Doctor)
    private readonly doctorRepository: Repository<Doctor>,
  ) {}

  public async create(body: CreateDoctorDto): Promise<{ data: Doctor }> {
    const doctorCreated = await this.doctorRepository.save(body);
    return { data: doctorCreated };
  }

  public async readAll(): Promise<{ doctors: Doctor[] }> {
    const list = await this.doctorRepository.find();
    return { doctors: list };
  }

  public async readById(id: number): Promise<{ data: Doctor }> {
    const doctor = await this.doctorRepository.findOne({ where: { id } });
    return { data: doctor };
  }

  public async update(
    id: number,
    body: UpdateDoctorInfoDto,
  ): Promise<{ data: Doctor }> {
    const person = await this.doctorRepository.findOne({ where: { id } });

    if (!person)
      throw new NotFoundException(`Não achamos um doutor com o id ${id}`);

    await this.doctorRepository.update({ id }, body);

    return { data: await this.doctorRepository.findOne({ where: { id } }) };
  }

  public async delete(id: number): Promise<{ data: string }> {
    const person = await this.doctorRepository.findOne({ where: { id } });

    if (!person)
      throw new NotFoundException(`Não achamos um doutor com o id ${id}`);

    await this.doctorRepository.delete({ id });

    return { data: `A pessoa com o id ${id} foi deletada com sucesso!!!` };
  }
}
