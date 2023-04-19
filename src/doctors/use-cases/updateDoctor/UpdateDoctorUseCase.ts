import { IAddressesRepository } from '@addresses/interfaces';
import { IDoctorsRepository, IUpdateDoctorRequest } from '@doctors/interfaces';
import { Injectable, NotFoundException } from '@nestjs/common';
import { IAddressProvider } from '@shared/providers/interfaces/IAddressProvider';
import { validateSpecialties } from '@shared/utils';
import { ISpecialtiesRepository } from '@specialties/interfaces';

@Injectable()
export class UpdateDoctorUseCase {
  constructor(
    private doctorsRepository: IDoctorsRepository,
    private specialtiesRepository: ISpecialtiesRepository,
    private addressesRepository: IAddressesRepository,
    private addressProvider: IAddressProvider,
  ) {}

  async execute(crm: string, data: IUpdateDoctorRequest) {
    const { zipCode, medicalSpecialties } = data;

    const doctor = await this.doctorsRepository.findByCRM(crm);

    if (!doctor) throw new NotFoundException('Doctor does not exist');

    if (zipCode) {
      const addressAlreadyExists = await this.addressesRepository.findByZipCode(
        zipCode,
      );

      if (!addressAlreadyExists) {
        const address = await this.addressProvider.getAddress(zipCode);

        if (address.errors?.length > 0)
          throw new NotFoundException('Zip code not found');

        const { cep, city, neighborhood, state, street } = address;

        await this.addressesRepository.create({
          zipCode: cep,
          city,
          neighborhood,
          state,
          street,
        });
      }
    }

    if (medicalSpecialties) {
      const specialties = await validateSpecialties(
        medicalSpecialties,
        this.specialtiesRepository,
      );

      if (typeof specialties === 'string')
        throw new NotFoundException(specialties);
    }

    const keys = Object.keys(data);

    keys.forEach((key) => (doctor[key] = data[key]));

    return this.doctorsRepository.update({ crm, data: doctor });
  }
}
