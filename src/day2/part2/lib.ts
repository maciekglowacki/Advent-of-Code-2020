const isOnlyOnePositionUsed = (firstPos: number, secondPos: number, positions: Array<number>) => {
  return (positions.includes(firstPos) || positions.includes(secondPos)) &&
    ![firstPos, secondPos].every((pos) => positions.includes(pos))
    ? true
    : false;
};

export const adhereToNewTobogganCorporatePolicy = (
  firstPos: number,
  secondPos: number,
  letter: string,
  password: string
) => {
  const regex = new RegExp(letter, 'g');
  const positions = [...password.matchAll(regex)]
    .map((el) => el.index)
    .filter((el): el is number => el !== undefined)
    .map((el) => el + 1);
  return isOnlyOnePositionUsed(firstPos, secondPos, positions);
};
