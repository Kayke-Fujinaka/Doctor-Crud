import { InMemorySpecialtiesRepository } from '@specialties/test/in-memory/InMemorySpecialtiesRepository';
import { FindAllSpecialtiesUseCase } from './FindAllSpecialtiesUseCase';

describe('Find all Specialties', () => {
  let inMemorySpecialtyRepository: InMemorySpecialtiesRepository;
  let findAllSpecialtiesUseCase: FindAllSpecialtiesUseCase;

  beforeEach(() => {
    inMemorySpecialtyRepository = new InMemorySpecialtiesRepository();
    findAllSpecialtiesUseCase = new FindAllSpecialtiesUseCase(
      inMemorySpecialtyRepository,
    );
  });

  it('should return an array with at least one specialty', async () => {
    const specialty = await inMemorySpecialtyRepository.create({
      name: 'Alergologia',
    });

    const specialties = await findAllSpecialtiesUseCase.execute();

    expect(specialties).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: specialty.id, name: specialty.name }),
      ]),
    );
  });

  it('should return an array with all specialties', async () => {
    const specialtyOne = await inMemorySpecialtyRepository.create({
      name: 'Alergologia',
    });
    const specialtyTwo = await inMemorySpecialtyRepository.create({
      name: 'Buco Maxilo',
    });
    const specialtyThree = await inMemorySpecialtyRepository.create({
      name: 'Angiologia',
    });

    const specialties = await findAllSpecialtiesUseCase.execute();

    expect(specialties).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: specialtyOne.id,
          name: specialtyOne.name,
        }),
        expect.objectContaining({
          id: specialtyTwo.id,
          name: specialtyTwo.name,
        }),
        expect.objectContaining({
          id: specialtyThree.id,
          name: specialtyThree.name,
        }),
      ]),
    );
  });

  it('should return an empty array', async () => {
    const specialties = await findAllSpecialtiesUseCase.execute();

    expect(specialties).toEqual(expect.arrayContaining([]));
  });
});
