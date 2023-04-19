import { InMemorySpecialtiesRepository } from '@specialties/test/in-memory/InMemorySpecialtiesRepository';
import { FindByNameUseCase } from './FindByNameUseCase';

describe('Find Specialty By Name', () => {
  let inMemorySpecialtiesRepository: InMemorySpecialtiesRepository;
  let findByNameUseCase: FindByNameUseCase;

  beforeEach(() => {
    inMemorySpecialtiesRepository = new InMemorySpecialtiesRepository();
    findByNameUseCase = new FindByNameUseCase(inMemorySpecialtiesRepository);
  });

  it('should be able to find a specialty by name', async () => {
    const specialty = await inMemorySpecialtiesRepository.create({
      name: 'Buco Maxilo',
    });

    const specialtyFinded = await findByNameUseCase.execute(specialty.name);

    expect(specialtyFinded).toEqual(
      expect.objectContaining({
        id: specialty.id,
        name: specialty.name,
      }),
    );
  });

  it('should not be able to find a nonexistent specialty name', async () => {
    await expect(async () => {
      await findByNameUseCase.execute('Inexistent Specialty');
    }).rejects.toEqual(new Error('Specialty does not exist'));
  });
});
