import { NotFoundException } from '@nestjs/common';

import { InMemoryAddressesRepository } from '@addresses/test/in-memory/InMemoryAddressesRepository';
import { InMemoryDoctorsRepository } from '@doctors/test/in-memory/InMemoryDoctorsRepository';
import { AddressProvider } from '@shared/providers/address-provider';
import { InMemorySpecialtiesRepository } from '@specialties/test/in-memory/InMemorySpecialtiesRepository';
import { UpdateDoctorUseCase } from './UpdateDoctorUseCase';

describe('Update Doctor', () => {
  let inMemoryDoctorsRepository: InMemoryDoctorsRepository;
  let inMemorySpecialtiesRepository: InMemorySpecialtiesRepository;
  let inMemoryAddressesRepository: InMemoryAddressesRepository;
  let addressProvider: AddressProvider;
  let updateDoctorUseCase: UpdateDoctorUseCase;

  beforeEach(() => {
    inMemoryDoctorsRepository = new InMemoryDoctorsRepository();
    inMemorySpecialtiesRepository = new InMemorySpecialtiesRepository();
    inMemoryAddressesRepository = new InMemoryAddressesRepository();
    addressProvider = new AddressProvider();
    updateDoctorUseCase = new UpdateDoctorUseCase(
      inMemoryDoctorsRepository,
      inMemorySpecialtiesRepository,
      inMemoryAddressesRepository,
      addressProvider,
    );
  });

  it('should be able to update doctor info', async () => {
    await inMemorySpecialtiesRepository.create({
      name: 'Specialty3',
    });

    await inMemorySpecialtiesRepository.create({
      name: 'Specialty4',
    });

    const doctorInfo = {
      crm: '432905290',
      name: 'Doctor',
      cellphoneNumber: '1234597453',
      email: 'doctor@email.com',
      zipCode: '04582050',
      medicalSpecialties: [],
    };
    const doctor = await inMemoryDoctorsRepository.create(doctorInfo);

    const { crm } = doctor;

    const updateInfo = {
      name: 'updated doctor',
      cellphoneNumber: '8504932',
      email: 'updatedoctor@email.com',
      zipCode: '05641010',
      medicalSpecialties: ['Specialty3', 'Specialty4'],
    };

    const updatedDoctor = await updateDoctorUseCase.execute(crm, updateInfo);

    expect(doctor.name).toEqual(updatedDoctor.name);
    expect(doctor.cellphoneNumber).toEqual(updatedDoctor.cellphoneNumber);
    expect(doctor.email).toEqual(updatedDoctor.email);
    expect(doctor.zipCode).toEqual(updatedDoctor.zipCode);
    expect(doctor.medicalSpecialties).toEqual(updatedDoctor.medicalSpecialties);
  });

  it('should not be able to update a nonexistent doctor', async () => {
    const crm = '1424523';
    const doctorInfo = {
      name: 'updated doctor',
      cellphoneNumber: '8504932',
      email: 'updatedoctor@email.com',
      zipCode: '05641010',
      medicalSpecialties: ['Specialty3', 'Specialty4'],
    };

    await expect(updateDoctorUseCase.execute(crm, doctorInfo)).rejects.toEqual(
      new NotFoundException('Doctor does not exist'),
    );
  });

  it('should not be able to update a nonexistent specialty', async () => {
    const doctorInfo = {
      crm: '1424523',
      name: 'updated doctor',
      cellphoneNumber: '8504932',
      email: 'updatedoctor@email.com',
      zipCode: '04582050',
      medicalSpecialties: [],
    };

    const doctor = await inMemoryDoctorsRepository.create(doctorInfo);

    const { crm } = doctor;

    const updateInfo = {
      medicalSpecialties: ['Nonexistent Specialty'],
    };

    await expect(updateDoctorUseCase.execute(crm, updateInfo)).rejects.toEqual(
      new NotFoundException('Specialty "Nonexistent Specialty" does not exist'),
    );
  });
});
