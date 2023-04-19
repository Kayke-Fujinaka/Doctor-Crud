import { InMemorySpecialtiesRepository } from '@specialties/test/in-memory/InMemorySpecialtiesRepository';
import { CreateSpecialtyUseCase } from './CreateSpecialtyUseCase';

describe('Create Specialty', () => {
  let inMemorySpecialtiesRepository: InMemorySpecialtiesRepository;
  let createSpecialtyUseCase: CreateSpecialtyUseCase;

  beforeEach(() => {
    inMemorySpecialtiesRepository = new InMemorySpecialtiesRepository();
    createSpecialtyUseCase = new CreateSpecialtyUseCase(
      inMemorySpecialtiesRepository,
    );
  });

  it('should be able to create a new specialty', async () => {
    const specialty = await createSpecialtyUseCase.execute({
      name: 'Buco Maxilo',
    });

    expect(specialty).toEqual(
      expect.objectContaining({
        id: specialty.id,
        name: specialty.name,
      }),
    );

    await expect(
      inMemorySpecialtiesRepository.findByName(specialty.name),
    ).resolves.toEqual(
      expect.objectContaining({
        id: specialty.id,
        name: specialty.name,
      }),
    );
  });

  it('should not be to create an alredy registered specialty', async () => {
    await createSpecialtyUseCase.execute({
      name: 'Buco Maxilo',
    });

    await expect(
      async () =>
        await createSpecialtyUseCase.execute({
          name: 'Buco Maxilo',
        }),
    ).rejects.toEqual(new Error('Specialty already exists'));
  });
});
