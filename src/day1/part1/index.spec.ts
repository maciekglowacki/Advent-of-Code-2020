import { findTwoNumbersSummingToValue } from './lib';

test('should find two numbers summing to value', () => {
  const input = [1721, 979, 366, 299, 675, 1456];
  const expected = [1721, 299];
  expect(findTwoNumbersSummingToValue(input, 2020)).toEqual(expected);
});
