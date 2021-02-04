import { readFileSync } from 'fs';
import { join } from 'path';
import { adhereToNewTobogganCorporatePolicy } from './lib';

const input = readFileSync(join(__dirname, '../input.txt')).toString();
const data = input
  .split('\n')
  .map((el) => el.split(' '))
  .map((el) => ({
    firstPos: parseInt(el[0].split('-')[0]),
    secondPos: parseInt(el[0].split('-')[1]),
    letter: el[1][0],
    password: el[2]
  }));

const validPasswordsCount = data.reduce((sum, { firstPos, secondPos, letter, password }) => {
  const isAdhering = adhereToNewTobogganCorporatePolicy(firstPos, secondPos, letter, password);
  return (sum += isAdhering ? 1 : 0);
}, 0);

console.log(`There is: ${validPasswordsCount} valid passwords`);
