import { InMemoryDoctorsRepository } from '@doctors/test/in-memory/InMemoryDoctorsRepository';
import { FilterByPropertiesUseCase } from '@doctors/use-cases';
import { Specialty } from '@specialties/infra/typeorm/entities/specialty.entity';

describe('Filter doctors by properties', () => {
  let medicalSpecialties: Specialty[];
  let inMemoryDoctorsRepository: InMemoryDoctorsRepository;
  let filterByProperties: FilterByPropertiesUseCase;

  beforeEach(() => {
    inMemoryDoctorsRepository = new InMemoryDoctorsRepository();
    filterByProperties = new FilterByPropertiesUseCase(
      inMemoryDoctorsRepository,
    );
  });

  it('should be able to return an array with doctors if passed properties are valid', async () => {
    medicalSpecialties = [
      {
        id: '1215121612axa215asrt',
        name: 'Pediatria',
        created_at: new Date(),
        deleted_at: null,
        updated_at: null,
      },
    ];

    const doctor = await inMemoryDoctorsRepository.create({
      name: 'João Paulo',
      crm: '123456',
      cellphoneNumber: '5511941809501',
      email: 'joaopaulo@gmail.com',
      zipCode: '12345678',
      medicalSpecialties,
    });

    const doctors = await filterByProperties.execute({
      name: doctor.name,
      crm: doctor.crm,
      cellphoneNumber: doctor.cellphoneNumber,
      email: doctor.email,
      zipCode: doctor.zipCode,
      medicalSpecialties: ['Pediatria'],
    });

    expect(doctors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: doctor.name,
          crm: doctor.crm,
          cellphoneNumber: doctor.cellphoneNumber,
          email: doctor.email,
          zipCode: doctor.zipCode,
          medicalSpecialties: doctor.medicalSpecialties,
        }),
      ]),
    );
  });

  it('should be able to return an empty array if no properties are passed', async () => {
    await inMemoryDoctorsRepository.create({
      name: 'João Paulo',
      crm: '123456',
      cellphoneNumber: '5511941809501',
      email: 'joaopaulo@gmail.com',
      zipCode: '12345678',
      medicalSpecialties: medicalSpecialties,
    });

    const doctors = await filterByProperties.execute({});

    expect(doctors).toEqual([]);
  });

  it('should be able to return an empty array if crm passed is invalid', async () => {
    await inMemoryDoctorsRepository.create({
      name: 'João Paulo',
      crm: '123456',
      cellphoneNumber: '5511941809501',
      email: 'joaopaulo@gmail.com',
      zipCode: '12345678',
      medicalSpecialties: medicalSpecialties,
    });

    const doctors = await filterByProperties.execute({ crm: 'invalid crm' });

    expect(doctors).toEqual([]);
  });

  it('should be able to return an empty array if name passed is invalid', async () => {
    await inMemoryDoctorsRepository.create({
      name: 'João Paulo',
      crm: '123456',
      cellphoneNumber: '5511941809501',
      email: 'joaopaulo@gmail.com',
      zipCode: '12345678',
      medicalSpecialties: medicalSpecialties,
    });

    const doctors = await filterByProperties.execute({
      name: 'inexistent name',
    });

    expect(doctors).toEqual([]);
  });

  it('should be able to return an empty array if cellphone number passed is invalid', async () => {
    await inMemoryDoctorsRepository.create({
      name: 'João Paulo',
      crm: '123456',
      cellphoneNumber: '5511941809501',
      email: 'joaopaulo@gmail.com',
      zipCode: '12345678',
      medicalSpecialties: medicalSpecialties,
    });

    const doctors = await filterByProperties.execute({
      cellphoneNumber: 'invalid number',
    });

    expect(doctors).toEqual([]);
  });

  it('should be able to return an empty array if email passed is invalid', async () => {
    await inMemoryDoctorsRepository.create({
      name: 'João Paulo',
      crm: '123456',
      cellphoneNumber: '5511941809501',
      email: 'joaopaulo@gmail.com',
      zipCode: '12345678',
      medicalSpecialties: medicalSpecialties,
    });

    const doctors = await filterByProperties.execute({
      email: 'invalid email',
    });

    expect(doctors).toEqual([]);
  });

  it('should be able to return an empty array if zip code passed is invalid', async () => {
    await inMemoryDoctorsRepository.create({
      name: 'João Paulo',
      crm: '123456',
      cellphoneNumber: '5511941809501',
      email: 'joaopaulo@gmail.com',
      zipCode: '12345678',
      medicalSpecialties: medicalSpecialties,
    });

    const doctors = await filterByProperties.execute({
      zipCode: 'invalid zip code',
    });

    expect(doctors).toEqual([]);
  });

  it('should be able to return an empty array if specialties passed are nonexistent', async () => {
    const doctors = await filterByProperties.execute({
      medicalSpecialties: ['Pediatria'],
    });

    expect(doctors).toEqual([]);
  });
});
