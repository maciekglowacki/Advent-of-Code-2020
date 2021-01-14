export const findTwoNumbersSummingToValue = (numbers: Array<number>, sum: number) => {
  for (let i = 0; i < numbers.length - 1; i++) {
    for (let j = i + 1; j < numbers.length; j++) {
      if (numbers[i] + numbers[j] === sum) {
        return [numbers[i], numbers[j]];
      }
    }
  }
  return [0, 0];
};
