import { Specialty } from '@specialties/infra/typeorm/entities/specialty.entity';
import { ISpecialtiesRepository } from '@specialties/interfaces';

export async function validateSpecialties(
  medicalSpecialties: string[],
  specialtiesRepository: ISpecialtiesRepository,
): Promise<string | Specialty[]> {
  const invalidSpecialties: string[] = [];

  const specialties = await Promise.all(
    medicalSpecialties.map(async (specialty) => {
      const response = await specialtiesRepository.findByName(specialty);

      if (!response) invalidSpecialties.push(' ' + specialty);

      return response;
    }),
  );

  if (invalidSpecialties.length === 1) {
    return `Specialty "${invalidSpecialties
      .toString()
      .trimStart()}" does not exist`;
  } else if (invalidSpecialties.length > 1) {
    return `Specialties "${invalidSpecialties
      .toString()
      .trimStart()}" does not exist`;
  }

  return specialties;
}
