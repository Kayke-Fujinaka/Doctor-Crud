import { Doctor } from '@doctors/infra/typeorm/entities/doctor.entity';
import { IDoctorsRepository } from '@doctors/interfaces';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FindAllDoctorsUseCase {
  constructor(private doctorsRepository: IDoctorsRepository) {}
  k;
  async execute(): Promise<Doctor[]> {
    return this.doctorsRepository.findAll();
  }
}
