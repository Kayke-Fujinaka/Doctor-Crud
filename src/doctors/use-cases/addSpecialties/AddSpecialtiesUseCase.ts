import {
  IAddSpecialtiesRequest,
  IDoctorsRepository,
} from '@doctors/interfaces';
import { Injectable, NotFoundException } from '@nestjs/common';
import { validateSpecialties } from '@shared/utils';
import { ISpecialtiesRepository } from '@specialties/interfaces';

@Injectable()
export class AddSpecialtiesUseCase {
  constructor(
    private doctorsRepository: IDoctorsRepository,
    private specialtiesRepository: ISpecialtiesRepository,
  ) {}

  async execute({ crm, medicalSpecialties }: IAddSpecialtiesRequest) {
    const doctor = await this.doctorsRepository.findByCRM(crm);

    if (!doctor) throw new NotFoundException('Doctor does not exist');

    const specialties = await validateSpecialties(
      medicalSpecialties,
      this.specialtiesRepository,
    );

    if (typeof specialties === 'string') {
      throw new NotFoundException(specialties);
    }

    return this.doctorsRepository.addSpecialties({
      crm,
      medicalSpecialties: specialties,
    });
  }
}
