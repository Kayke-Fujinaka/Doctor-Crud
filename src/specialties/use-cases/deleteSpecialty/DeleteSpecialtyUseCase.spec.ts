import { InMemorySpecialtiesRepository } from '@specialties/test/in-memory/InMemorySpecialtiesRepository';
import { DeleteSpecialtyUseCase } from './DeleteSpecialtyUseCase';

describe('Delete Specialty', () => {
  let inMemorySpecialtyRepository: InMemorySpecialtiesRepository;
  let deleteSpecialtyUseCase: DeleteSpecialtyUseCase;

  beforeEach(() => {
    inMemorySpecialtyRepository = new InMemorySpecialtiesRepository();
    deleteSpecialtyUseCase = new DeleteSpecialtyUseCase(
      inMemorySpecialtyRepository,
    );
  });

  it('should be able to delete a specialty', async () => {
    const spy = jest.spyOn(inMemorySpecialtyRepository, 'delete');

    const specialty = await inMemorySpecialtyRepository.create({
      name: 'Buco Maxilo',
    });

    await deleteSpecialtyUseCase.execute(specialty.name);

    expect(spy).toHaveBeenCalled();

    await expect(
      inMemorySpecialtyRepository.findByName(specialty.name),
    ).resolves.toEqual(
      expect.objectContaining({
        deleted_at: expect.any(Date),
        name: specialty.name,
      }),
    );
  });

  it('should not be able to delete a non existing specialty', async () => {
    await expect(
      async () => await deleteSpecialtyUseCase.execute('Invalid specialty'),
    ).rejects.toEqual(new Error('Specialty does not exist'));
  });
});
