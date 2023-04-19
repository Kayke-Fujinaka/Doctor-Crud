import { Doctor } from '@doctors/infra/typeorm/entities/doctor.entity';
import { IDoctorsRepository } from '@doctors/interfaces';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class FindByCRMUseCase {
  constructor(private doctorsRepository: IDoctorsRepository) {}

  async execute(crm: string): Promise<Doctor> {
    const doctor = await this.doctorsRepository.findByCRM(crm);

    if (!doctor) {
      throw new NotFoundException('Doctor does not exist');
    }

    return doctor;
  }
}
