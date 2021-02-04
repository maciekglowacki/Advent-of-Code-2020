export const adhereToTobogganCorporatePolicy = (min: number, max: number, letter: string, password: string) => {
  const regex = new RegExp(letter, 'g');
  const matchings = password.match(regex) === null ? 0 : password.match(regex)!;
  return Array.isArray(matchings) && matchings.length >= min && matchings.length <= max ? true : false;
};
