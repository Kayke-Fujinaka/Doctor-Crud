interface IFilterByMedicalSpecialtiesProps {
  medicalSpecialtiesNames: string[];
  requestMedicalSpecialties: string[];
}

export function filterByMedicalSpecialties({
  medicalSpecialtiesNames,
  requestMedicalSpecialties,
}: IFilterByMedicalSpecialtiesProps): boolean {
  return requestMedicalSpecialties.every((requestSpecialtyName) =>
    medicalSpecialtiesNames.find((specialtyName) =>
      specialtyName.toLowerCase().includes(requestSpecialtyName.toLowerCase()),
    ),
  );
}
