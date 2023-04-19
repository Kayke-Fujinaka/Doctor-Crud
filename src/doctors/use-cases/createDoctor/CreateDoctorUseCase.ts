import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { IAddressesRepository } from '@addresses/interfaces';
import { Doctor } from '@doctors/infra/typeorm/entities/doctor.entity';
import { ICreateDoctorRequest, IDoctorsRepository } from '@doctors/interfaces';
import { IAddressProvider } from '@shared/providers/interfaces/IAddressProvider';
import { validateSpecialties, verifyAddress } from '@shared/utils';
import { ISpecialtiesRepository } from '@specialties/interfaces';

@Injectable()
export class CreateDoctorUseCase {
  constructor(
    private doctorsRepository: IDoctorsRepository,
    private specialtiesRepository: ISpecialtiesRepository,
    private addressesRepository: IAddressesRepository,
    private addressProvider: IAddressProvider,
  ) {}

  async execute({
    crm,
    name,
    email,
    cellphoneNumber,
    zipCode,
    medicalSpecialties,
  }: ICreateDoctorRequest) {
    const doctor = new Doctor();

    const crmAlreadyRegistered = await this.doctorsRepository.findByCRM(crm);

    if (crmAlreadyRegistered)
      throw new ConflictException('CRM already registered');

    const doctors = await this.doctorsRepository.filterByProperties({ email });

    if (doctors.length !== 0)
      throw new ConflictException('Email already registered');

    await verifyAddress(
      this.addressesRepository,
      this.addressProvider,
      zipCode,
    );

    const specialties = await validateSpecialties(
      medicalSpecialties,
      this.specialtiesRepository,
    );

    if (typeof specialties === 'string')
      throw new NotFoundException(specialties);

    Object.assign(doctor, {
      crm,
      name,
      email,
      cellphoneNumber,
      zipCode,
      medicalSpecialties: specialties,
    });

    await this.doctorsRepository.create(doctor);

    return doctor;
  }
}
