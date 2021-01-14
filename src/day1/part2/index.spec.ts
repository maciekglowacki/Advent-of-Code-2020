import { findThreeNumbersSummingToValue } from './lib';

test('should find three numbers summing to value', () => {
  const input = [1721, 979, 366, 299, 675, 1456];
  const expected = [979, 366, 675];
  expect(findThreeNumbersSummingToValue(input, 2020)).toEqual(expected);
});
