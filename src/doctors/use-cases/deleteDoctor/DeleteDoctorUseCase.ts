import { IDoctorsRepository } from '@doctors/interfaces';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class DeleteDoctorUseCase {
  constructor(private doctorRepository: IDoctorsRepository) {}

  async execute(crm: string) {
    const doctor = await this.doctorRepository.findByCRM(crm);

    if (!doctor) throw new NotFoundException('Doctor does not exist');

    await this.doctorRepository.delete(crm);
  }
}
