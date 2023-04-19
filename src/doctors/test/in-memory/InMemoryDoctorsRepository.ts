import {
  AddSpecialtiesDTO,
  CreateDoctorDTO,
  FilterByPropertiesDoctorDTO,
  UpdateDoctorDTO,
} from '@doctors/dtos';

import { Doctor } from '@doctors/infra/typeorm/entities/doctor.entity';
import { IDoctorsRepository } from '@doctors/interfaces';
import { filterByMedicalSpecialties } from '@shared/utils';

export class InMemoryDoctorsRepository implements IDoctorsRepository {
  doctors: Doctor[] = [];

  async create(data: CreateDoctorDTO): Promise<Doctor> {
    const doctor = new Doctor();

    Object.assign(doctor, data);

    this.doctors.push(doctor);

    return doctor;
  }

  async findAll(): Promise<Doctor[]> {
    return this.doctors;
  }

  async filterByProperties(
    properties: FilterByPropertiesDoctorDTO,
  ): Promise<Doctor[]> {
    const keys = Object.keys(properties);

    if (keys.length === 0) return [];

    return this.doctors.filter((doctor) =>
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

  async findByCRM(crm: string): Promise<Doctor> {
    return this.doctors.find((doctor) => doctor.crm === crm);
  }

  async update({ crm, data }: UpdateDoctorDTO): Promise<Doctor> {
    const doctor = await this.findByCRM(crm);

    const keys = Object.keys(data);

    keys.forEach((key) => (doctor[key] = data[key]));

    return doctor;
  }

  async delete(crm: string): Promise<void> {
    const doctor = await this.findByCRM(crm);

    doctor.deleted_at = new Date();
  }

  async addSpecialties({
    crm,
    medicalSpecialties,
  }: AddSpecialtiesDTO): Promise<Doctor> {
    const doctor = await this.findByCRM(crm);

    medicalSpecialties.forEach((specialty) => {
      doctor.medicalSpecialties.push(specialty);
    });

    return doctor;
  }
}
