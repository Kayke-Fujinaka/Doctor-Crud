import { InMemorySpecialtiesRepository } from '@specialties/test/in-memory/InMemorySpecialtiesRepository';
import { UpdateSpecialtyUseCase } from './UpdateSpecialtyUseCase';

describe('Update Specialty', () => {
  let inMemorySpecialtiesRepository: InMemorySpecialtiesRepository;
  let updateSpecialtyUseCase: UpdateSpecialtyUseCase;

  beforeEach(() => {
    inMemorySpecialtiesRepository = new InMemorySpecialtiesRepository();
    updateSpecialtyUseCase = new UpdateSpecialtyUseCase(
      inMemorySpecialtiesRepository,
    );
  });

  it('should be able to update specialty name', async () => {
    const specialty = {
      name: 'Buco Maxilo',
    };
    await inMemorySpecialtiesRepository.create(specialty);

    const updatedSpecialty = await updateSpecialtyUseCase.execute({
      name: specialty.name,
      newName: 'Pediatria',
    });
    expect(updatedSpecialty.name).toEqual('Pediatria');

    await expect(
      inMemorySpecialtiesRepository.findByName(specialty.name),
    ).resolves.toEqual(undefined);
  });

  it('should not be able to update a nonexistent specialty', async () => {
    await expect(async () => {
      await updateSpecialtyUseCase.execute({
        name: 'nonexistent specialty',
        newName: 'nonexistent newName',
      });
    }).rejects.toEqual(new Error('Specialty does not exist'));
  });
});
