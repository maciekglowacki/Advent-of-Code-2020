function notUndefined<TValue>(value: TValue | undefined): value is TValue {
  return value !== undefined;
}

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
    .filter(notUndefined)
    .map((el) => el + 1);
  return isOnlyOnePositionUsed(firstPos, secondPos, positions);
};
