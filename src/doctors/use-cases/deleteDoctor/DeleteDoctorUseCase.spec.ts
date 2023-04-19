import { InMemoryDoctorsRepository } from '@doctors/test/in-memory/InMemoryDoctorsRepository';
import { NotFoundException } from '@nestjs/common';
import { DeleteDoctorUseCase } from './DeleteDoctorUseCase';

describe('Delete Doctor', () => {
  let inMemoryDoctorsRepository: InMemoryDoctorsRepository;
  let deleteDoctorUseCase: DeleteDoctorUseCase;

  beforeEach(() => {
    inMemoryDoctorsRepository = new InMemoryDoctorsRepository();
    deleteDoctorUseCase = new DeleteDoctorUseCase(inMemoryDoctorsRepository);
  });

  it('should be able to delete a doctor', async () => {
    const doctorCreated = await inMemoryDoctorsRepository.create({
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

    await deleteDoctorUseCase.execute(doctorCreated.crm);

    await expect(
      inMemoryDoctorsRepository.findByCRM(doctorCreated.crm),
    ).resolves.toEqual(
      expect.objectContaining({
        deleted_at: expect.any(Date),
      }),
    );
  });

  it('should not be able to delete a non existing doctor', async () => {
    await expect(
      async () => await deleteDoctorUseCase.execute('Inexistent Doctor'),
    ).rejects.toEqual(new NotFoundException('Doctor does not exist'));
  });
});
