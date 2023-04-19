import { ConflictException, NotFoundException } from '@nestjs/common';

import { InMemoryAddressesRepository } from '@addresses/test/in-memory/InMemoryAddressesRepository';
import { InMemoryDoctorsRepository } from '@doctors/test/in-memory/InMemoryDoctorsRepository';
import { AddressProvider } from '@shared/providers/address-provider';
import { InMemorySpecialtiesRepository } from '@specialties/test/in-memory/InMemorySpecialtiesRepository';
import { CreateDoctorUseCase } from './CreateDoctorUseCase';

describe('Create Doctor', () => {
  let doctorsRepository: InMemoryDoctorsRepository;

  let specialtiesRepository: InMemorySpecialtiesRepository;

  let addressesRepository: InMemoryAddressesRepository;

  let createDoctorUseCase: CreateDoctorUseCase;

  let addressProvider: AddressProvider;

  beforeEach(() => {
    doctorsRepository = new InMemoryDoctorsRepository();

    specialtiesRepository = new InMemorySpecialtiesRepository();

    addressesRepository = new InMemoryAddressesRepository();

    addressProvider = new AddressProvider();

    createDoctorUseCase = new CreateDoctorUseCase(
      doctorsRepository,
      specialtiesRepository,
      addressesRepository,
      addressProvider,
    );
  });

  it('should be able to throw an error if invalid specialty was passed', async () => {
    await specialtiesRepository.create({ name: 'Angiologia' });

    await expect(
      createDoctorUseCase.execute({
        crm: '123456',
        name: 'John Doe',
        email: 'johndoe@example.com',
        cellphoneNumber: '123456',
        zipCode: '04582050',
        medicalSpecialties: ['Angiologia', 'Invalid Specialty'],
      }),
    ).rejects.toEqual(
      new NotFoundException('Specialty "Invalid Specialty" does not exist'),
    );

    await expect(
      createDoctorUseCase.execute({
        crm: '123456',
        name: 'John Doe',
        email: 'johndoe@example.com',
        cellphoneNumber: '123456',
        zipCode: '04582050',
        medicalSpecialties: [
          'Angiologia',
          'Invalid Specialty1',
          'Invalid Specialty2',
          'Invalid Specialty3',
        ],
      }),
    ).rejects.toEqual(
      new NotFoundException(
        'Specialties "Invalid Specialty1, Invalid Specialty2, Invalid Specialty3" does not exist',
      ),
    );
  });

  it('should be able to throw an error when trying to create a doctor with a CRM already registered', async () => {
    const doctor1 = {
      crm: '123456',
      name: 'John Doe',
      email: 'johndoe@example.com',
      cellphoneNumber: '123456',
      zipCode: '04582050',
      medicalSpecialties: ['Angiologia', 'Cardiologista'],
    };

    const doctor2 = {
      crm: '123456',
      name: 'Caio Miguel',
      email: 'caiomiguel@example.com',
      cellphoneNumber: '123456',
      zipCode: '04582050',
      medicalSpecialties: ['Angiologia', 'Cardiologista'],
    };

    await specialtiesRepository.create({ name: 'Angiologia' });

    await specialtiesRepository.create({
      name: 'Cardiologista',
    });

    await createDoctorUseCase.execute(doctor1);

    await expect(createDoctorUseCase.execute(doctor2)).rejects.toEqual(
      new ConflictException('CRM already registered'),
    );
  });

  it('should be able to throw an error when trying to create a doctor with an email already registered', async () => {
    const doctor1 = {
      crm: '123456',
      name: 'John Doe',
      email: 'johndoe@example.com',
      cellphoneNumber: '123456',
      zipCode: '04582050',
      medicalSpecialties: ['Angiologia', 'Cardiologista'],
    };

    const doctor2 = {
      crm: '654321',
      name: 'Caio Miguel',
      email: 'johndoe@example.com',
      cellphoneNumber: '123456',
      zipCode: '04582050',
      medicalSpecialties: ['Angiologia', 'Cardiologista'],
    };

    await specialtiesRepository.create({ name: 'Angiologia' });

    await specialtiesRepository.create({
      name: 'Cardiologista',
    });

    await createDoctorUseCase.execute(doctor1);

    await expect(createDoctorUseCase.execute(doctor2)).rejects.toEqual(
      new ConflictException('Email already registered'),
    );
  });

  it('should be able to create a doctor', async () => {
    const doctor = {
      crm: '123456',
      name: 'John Doe',
      email: 'johndoe@example.com',
      cellphoneNumber: '123456',
      zipCode: '04582050',
      medicalSpecialties: ['Angiologia', 'Cardiologista'],
    };

    const { crm, name, email, cellphoneNumber, zipCode } = doctor;

    const specialty1 = await specialtiesRepository.create({
      name: 'Angiologia',
    });

    const specialty2 = await specialtiesRepository.create({
      name: 'Cardiologista',
    });

    const createdDoctor = await createDoctorUseCase.execute(doctor);

    expect(createdDoctor).toEqual({
      crm,
      name,
      email,
      cellphoneNumber,
      zipCode,
      medicalSpecialties: [
        { id: specialty1.id, name: specialty1.name },
        { id: specialty2.id, name: specialty2.name },
      ],
    });
  });

  it('should be able to throw an error if an invalid zipCode is provided', async () => {
    const doctor = {
      crm: '123456',
      name: 'John Doe',
      email: 'johndoe@example.com',
      cellphoneNumber: '123456',
      zipCode: '000',
      medicalSpecialties: ['Angiologia', 'Cardiologista'],
    };

    await specialtiesRepository.create({ name: 'Angiologia' });

    await specialtiesRepository.create({
      name: 'Cardiologista',
    });

    await expect(createDoctorUseCase.execute(doctor)).rejects.toEqual(
      new NotFoundException('Zip code not found'),
    );
  });

  it('should be able to use an existent response if address zip code provided is already registered', async () => {
    const doctor1 = {
      crm: '123456',
      name: 'John Doe',
      email: 'johndoe@example.com',
      cellphoneNumber: '123456',
      zipCode: '04582050',
      medicalSpecialties: ['Angiologia', 'Cardiologista'],
    };

    const doctor2 = {
      crm: '345678',
      name: 'Caio Miguel',
      email: 'caiomig@example.com',
      cellphoneNumber: '123456',
      zipCode: '04582050',
      medicalSpecialties: ['Angiologia', 'Cardiologista'],
    };

    await specialtiesRepository.create({ name: 'Angiologia' });

    await specialtiesRepository.create({
      name: 'Cardiologista',
    });

    const addressProviderSpy = jest.spyOn(addressProvider, 'getAddress');

    await createDoctorUseCase.execute(doctor1);

    await createDoctorUseCase.execute(doctor2);

    expect(addressProviderSpy).toHaveBeenCalledTimes(1);
  });

  it('should be able to make another request to the address provider if address zip code is not registred', async () => {
    const doctor1 = {
      crm: '123456',
      name: 'John Doe',
      email: 'johndoe@example.com',
      cellphoneNumber: '123456',
      zipCode: '04582050',
      medicalSpecialties: ['Angiologia', 'Cardiologista'],
    };

    const doctor2 = {
      crm: '345678',
      name: 'Caio Miguel',
      email: 'caiomig@example.com',
      cellphoneNumber: '123456',
      zipCode: '02122060',
      medicalSpecialties: ['Angiologia', 'Cardiologista'],
    };

    await specialtiesRepository.create({ name: 'Angiologia' });

    await specialtiesRepository.create({
      name: 'Cardiologista',
    });

    const addressProviderSpy = jest.spyOn(addressProvider, 'getAddress');

    await createDoctorUseCase.execute(doctor1);

    await createDoctorUseCase.execute(doctor2);

    expect(addressProviderSpy).toHaveBeenCalledTimes(2);
  });
});
