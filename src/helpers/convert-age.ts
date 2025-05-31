export function convertAgeToBirthdate(ageMin?: number, ageMax?: number) {
  const today = new Date();

  const birthdateMax = ageMin
    ? new Date(today.getFullYear() - ageMin, 11, 31) // Pessoa mais nova (idade mínima)
    : undefined;

  const birthdateMin = ageMax
    ? new Date(today.getFullYear() - ageMax, 0, 1) // Pessoa mais velha (idade máxima)
    : undefined;

  return { birthdateMin, birthdateMax };
}
