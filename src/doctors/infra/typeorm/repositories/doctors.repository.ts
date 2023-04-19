import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import {
  AddSpecialtiesDTO,
  CreateDoctorDTO,
  FilterByPropertiesDoctorDTO,
  UpdateDoctorDTO,
} from '@doctors/dtos';
import { IDoctorsRepository } from '@doctors/interfaces';
import { filterByMedicalSpecialties } from '@shared/utils';
import { Doctor } from '../entities/doctor.entity';

@Injectable()
export class DoctorsRepository implements IDoctorsRepository {
  constructor(
    @InjectRepository(Doctor)
    private doctorsRepository: Repository<Doctor>,
  ) {}

  async create({
    crm,
    name,
    cellphoneNumber,
    email,
    medicalSpecialties,
    zipCode,
  }: CreateDoctorDTO): Promise<Doctor> {
    const doctor = this.doctorsRepository.create({
      crm,
      name,
      cellphoneNumber,
      email,
      medicalSpecialties,
      zipCode,
    });

    await this.doctorsRepository.save(doctor);

    return doctor;
  }

  async findAll(): Promise<Doctor[]> {
    return this.doctorsRepository.find({
      relations: ['medicalSpecialties', 'zipCode'],
    });
  }

  async filterByProperties(
    properties: FilterByPropertiesDoctorDTO,
  ): Promise<Doctor[]> {
    const keys = Object.keys(properties);

    const doctors: Doctor[] = await this.findAll();

    return doctors.filter((doctor) =>
      keys.every((key) => {
        if (key === 'medicalSpecialties') {
          const medicalSpecialtiesNames = doctor.medicalSpecialties.map(
            (specialty) => specialty.name,
          );

          const requestMedicalSpecialties = properties.medicalSpecialties;

          return filterByMedicalSpecialties({
            medicalSpecialtiesNames,
            requestMedicalSpecialties,
          });
        }
        return doctor[key]
          .toLowerCase()
          .includes(properties[key].toLowerCase());
      }),
    );
  }

  async update({ crm, data }: UpdateDoctorDTO): Promise<Doctor> {
    await this.doctorsRepository.update(crm, data);

    return await this.doctorsRepository.findOne({ where: { crm } });
  }

  async findByCRM(crm: string): Promise<Doctor> {
    return this.doctorsRepository.findOne({
      relations: ['medicalSpecialties', 'zipCode'],
      where: { crm },
    });
  }

  async delete(crm: string): Promise<void> {
    await this.doctorsRepository.softDelete({ crm });
  }

  async addSpecialties({
    crm,
    medicalSpecialties,
  }: AddSpecialtiesDTO): Promise<Doctor> {
    const doctor = await this.doctorsRepository.findOne({
      where: { crm },
      relations: ['medicalSpecialties'],
    });

    doctor.medicalSpecialties = [
      ...doctor.medicalSpecialties,
      ...medicalSpecialties,
    ];

    await this.doctorsRepository.save(doctor);

    return doctor;
  }
}
