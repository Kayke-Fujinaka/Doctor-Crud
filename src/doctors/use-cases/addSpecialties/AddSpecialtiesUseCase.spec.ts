import { InMemoryDoctorsRepository } from '@doctors/test/in-memory/InMemoryDoctorsRepository';
import { NotFoundException } from '@nestjs/common';
import { InMemorySpecialtiesRepository } from '@specialties/test/in-memory/InMemorySpecialtiesRepository';
import { AddSpecialtiesUseCase } from './AddSpecialtiesUseCase';

describe('Add Specialties', () => {
  let inMemoryDoctorsRepository: InMemoryDoctorsRepository;
  let inMemorySpecialtiesRepository: InMemorySpecialtiesRepository;
  let addSpecialtiesUseCase: AddSpecialtiesUseCase;

  beforeEach(() => {
    inMemoryDoctorsRepository = new InMemoryDoctorsRepository();
    inMemorySpecialtiesRepository = new InMemorySpecialtiesRepository();
    addSpecialtiesUseCase = new AddSpecialtiesUseCase(
      inMemoryDoctorsRepository,
      inMemorySpecialtiesRepository,
    );
  });

  it('should be able to add specialties to doctor', async () => {
    const specialty1 = await inMemorySpecialtiesRepository.create({
      name: 'Alergologia',
    });

    const specialty2 = await inMemorySpecialtiesRepository.create({
      name: 'Buco Maxilo',
    });

    const specialty3 = await inMemorySpecialtiesRepository.create({
      name: 'Cardiologia',
    });

    const doctor = await inMemoryDoctorsRepository.create({
      crm: '123456',
      name: 'Jonh Doe',
      cellphoneNumber: '1234597453',
      email: 'johndoe@mail.com',
      zipCode: '39289502',
      medicalSpecialties: [specialty1],
    });

    expect(
      await addSpecialtiesUseCase.execute({
        crm: doctor.crm,
        medicalSpecialties: [specialty2.name, specialty3.name],
      }),
    ).toEqual(
      expect.objectContaining({
        crm: doctor.crm,
        name: doctor.name,
        cellphoneNumber: doctor.cellphoneNumber,
        email: doctor.email,
        zipCode: doctor.zipCode,
        medicalSpecialties: [specialty1, specialty2, specialty3],
      }),
    );
  });

  it('should throw a error if nonexistent crm is passed', async () => {
    const specialty = await inMemorySpecialtiesRepository.create({
      name: 'Alergologia',
    });

    await expect(
      addSpecialtiesUseCase.execute({
        crm: 'Invalid',
        medicalSpecialties: [specialty.name],
      }),
    ).rejects.toEqual(new NotFoundException('Doctor does not exist'));
  });

  it('should throw a error if nonexistent specialties are passed', async () => {
    const specialty = await inMemorySpecialtiesRepository.create({
      name: 'Alergologia',
    });

    const doctor = await inMemoryDoctorsRepository.create({
      crm: '123456',
      name: 'Jonh Doe',
      cellphoneNumber: '1234597453',
      email: 'johndoe@mail.com',
      zipCode: '39289502',
      medicalSpecialties: [specialty],
    });

    await expect(
      addSpecialtiesUseCase.execute({
        crm: doctor.crm,
        medicalSpecialties: ['Invalid'],
      }),
    ).rejects.toEqual(
      new NotFoundException('Specialty "Invalid" does not exist'),
    );
  });
});
