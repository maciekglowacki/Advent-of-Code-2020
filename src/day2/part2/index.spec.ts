import { adhereToNewTobogganCorporatePolicy } from './lib';

test('password abcde adheres to new toboggan corporate policy', () => {
  const firstPos = 1;
  const secondPos = 3;
  const letter = 'a';
  const password = 'abcde';

  expect(adhereToNewTobogganCorporatePolicy(firstPos, secondPos, letter, password)).toBe(true);
});

test('password cdefg does not adhere to new toboggan corporate policy', () => {
  const firstPos = 1;
  const secondPos = 3;
  const letter = 'b';
  const password = 'cdefg';

  expect(adhereToNewTobogganCorporatePolicy(firstPos, secondPos, letter, password)).toBe(false);
});

test('pasword ccccccccc does not adhere to new toboggan corporate policy', () => {
  const firstPos = 2;
  const secondPos = 9;
  const letter = 'c';
  const password = 'ccccccccc';

  expect(adhereToNewTobogganCorporatePolicy(firstPos, secondPos, letter, password)).toBe(false);
});
