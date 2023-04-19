import {
  AddSpecialtiesDTO,
  CreateDoctorDTO,
  FilterByPropertiesDoctorDTO,
  UpdateDoctorDTO,
} from '@doctors/dtos';
import { Doctor } from '@doctors/infra/typeorm/entities/doctor.entity';

export abstract class IDoctorsRepository {
  abstract create(data: CreateDoctorDTO): Promise<Doctor>;

  abstract findAll(): Promise<Doctor[]>;

  abstract filterByProperties(
    properties: FilterByPropertiesDoctorDTO,
  ): Promise<Doctor[]>;

  abstract findByCRM(crm: string): Promise<Doctor>;

  abstract update(updateInfo: UpdateDoctorDTO): Promise<Doctor>;

  abstract delete(crm: string): Promise<void>;

  abstract addSpecialties(data: AddSpecialtiesDTO): Promise<Doctor>;
}
