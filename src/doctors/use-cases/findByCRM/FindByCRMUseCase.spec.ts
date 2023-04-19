import { InMemoryDoctorsRepository } from '@doctors/test/in-memory/InMemoryDoctorsRepository';
import { FindByCRMUseCase } from './FindByCRMUseCase';

describe('Find Doctor by CRM', () => {
  let inMemoryDoctorsRepository: InMemoryDoctorsRepository;
  let findByCRMUseCase: FindByCRMUseCase;

  beforeEach(() => {
    inMemoryDoctorsRepository = new InMemoryDoctorsRepository();
    findByCRMUseCase = new FindByCRMUseCase(inMemoryDoctorsRepository);
  });

  it('should be able to find a doctor by CRM', async () => {
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

    await inMemoryDoctorsRepository.create({
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

    const doctor = await inMemoryDoctorsRepository.create(doctorOne);

    const doctorFinded = await findByCRMUseCase.execute(doctor.crm);

    expect(doctorFinded).toEqual(doctorOne);
  });

  it('should not be able to find a nonexistent doctor crm', async () => {
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

    await inMemoryDoctorsRepository.create(doctorOne);

    await expect(async () => {
      await findByCRMUseCase.execute('Invalid CRM');
    }).rejects.toEqual(new Error('Doctor does not exist'));
  });
});
