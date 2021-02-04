import { adhereToTobogganCorporatePolicy } from './lib';

test('password abcde adheres to toboggan corporate policy', () => {
  const min = 1;
  const max = 3;
  const letter = 'a';
  const password = 'abcde';

  expect(adhereToTobogganCorporatePolicy(min, max, letter, password)).toBe(true);
});

test('password cdefg does not adhere to toboggan corporate policy', () => {
  const min = 1;
  const max = 3;
  const letter = 'b';
  const password = 'cdefg';

  expect(adhereToTobogganCorporatePolicy(min, max, letter, password)).toBe(false);
});

test('password ccccccccc adheres to toboggan corporate policy', () => {
  const min = 2;
  const max = 9;
  const letter = 'c';
  const password = 'ccccccccc';

  expect(adhereToTobogganCorporatePolicy(min, max, letter, password)).toBe(true);
});
