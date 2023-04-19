import { InMemoryDoctorsRepository } from '@doctors/test/in-memory/InMemoryDoctorsRepository';
import { FindAllDoctorsUseCase } from './findAllDoctorsUseCase';

describe('Find All Doctors', () => {
  let inMemoryDoctorsRepository: InMemoryDoctorsRepository;
  let findAllDoctorsUseCase: FindAllDoctorsUseCase;

  beforeEach(() => {
    inMemoryDoctorsRepository = new InMemoryDoctorsRepository();
    findAllDoctorsUseCase = new FindAllDoctorsUseCase(
      inMemoryDoctorsRepository,
    );
  });

  it('should return an array with all doctors', async () => {
    const doctorOne = await inMemoryDoctorsRepository.create({
      name: 'Caio Miguel',
      crm: '123456',
      cellphoneNumber: '1234567890123',
      email: 'caio@gmail.com',
      zipCode: '12345678',
      medicalSpecialties: [
        {
          id: '123456',
          name: 'specialty1',
          created_at: new Date(),
          updated_at: new Date(),
          deleted_at: new Date(),
        },
        {
          id: '654321',
          name: 'specialty2',
          created_at: new Date(),
          updated_at: new Date(),
          deleted_at: new Date(),
        },
      ],
    });

    const doctorTwo = await inMemoryDoctorsRepository.create({
      name: 'Gabriel Silva',
      crm: '654321',
      cellphoneNumber: '3210987654321',
      email: 'gabriel@hotmail.com',
      zipCode: '87654321',
      medicalSpecialties: [
        {
          id: '979251',
          name: 'specialty3',
          created_at: new Date(),
          updated_at: new Date(),
          deleted_at: new Date(),
        },
        {
          id: '678425',
          name: 'specialty1',
          created_at: new Date(),
          updated_at: new Date(),
          deleted_at: new Date(),
        },
      ],
    });

    const doctors = await findAllDoctorsUseCase.execute();

    expect(doctors).toEqual(expect.arrayContaining([doctorOne, doctorTwo]));
  });

  it('should return an empty array', async () => {
    const doctors = await findAllDoctorsUseCase.execute();

    expect(doctors).toEqual(expect.arrayContaining([]));
  });
});
