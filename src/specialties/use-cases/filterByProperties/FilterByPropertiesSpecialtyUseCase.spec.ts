import { InMemorySpecialtiesRepository } from '@specialties/test/in-memory/InMemorySpecialtiesRepository';
import { FilterByPropertiesUseCase } from '@specialties/use-cases';

describe('Filter by properties', () => {
  let inMemorySpecialtiesRepository: InMemorySpecialtiesRepository;
  let filterByProperties: FilterByPropertiesUseCase;

  beforeEach(() => {
    inMemorySpecialtiesRepository = new InMemorySpecialtiesRepository();
    filterByProperties = new FilterByPropertiesUseCase(
      inMemorySpecialtiesRepository,
    );
  });

  it('should be able to return an array with specialties if includes name passed', async () => {
    const specialty = await inMemorySpecialtiesRepository.create({
      name: 'Alergologia',
    });

    const specialties = await filterByProperties.execute({
      name: 'Aler',
    });

    expect(specialties).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: specialty.id, name: specialty.name }),
      ]),
    );
  });

  it('should be able to return an array with specialties if includes id passed', async () => {
    const specialty = await inMemorySpecialtiesRepository.create({
      name: 'Alergologia',
    });

    const specialties = await filterByProperties.execute({ id: specialty.id });

    expect(specialties).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: specialty.id, name: specialty.name }),
      ]),
    );
  });

  it('should be able to return an array with specialties if includes id and name passed', async () => {
    const specialty = await inMemorySpecialtiesRepository.create({
      name: 'Alergologia',
    });
    const specialties = await filterByProperties.execute({
      id: specialty.id,
      name: 'Alergologia',
    });

    expect(specialties).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: specialty.id, name: specialty.name }),
      ]),
    );
  });

  it('should be able to return an empty array if no properties are passed', async () => {
    await inMemorySpecialtiesRepository.create({
      name: 'Alergologia',
    });

    const specialties = await filterByProperties.execute({});

    expect(specialties).toEqual([]);
  });

  it('should be able to return an empty array if id is invalid', async () => {
    await inMemorySpecialtiesRepository.create({
      name: 'Alergologia',
    });

    const specialties = await filterByProperties.execute({ id: 'invalido' });

    expect(specialties).toEqual([]);
  });

  it('should be able to return an empty array if name is invalid', async () => {
    await inMemorySpecialtiesRepository.create({
      name: 'Alergologia',
    });

    const specialties = await filterByProperties.execute({
      name: 'inexistente',
    });

    expect(specialties).toEqual([]);
  });

  it('should be able to return an empty array if id and name are invalid', async () => {
    await inMemorySpecialtiesRepository.create({
      name: 'Alergologia',
    });

    const specialties = await filterByProperties.execute({
      id: 'invalido',
      name: 'inexistente',
    });

    expect(specialties).toEqual([]);
  });
});
