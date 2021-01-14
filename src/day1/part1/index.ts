import { readFileSync } from 'fs';
import { join } from 'path';
import { findTwoNumbersSummingToValue } from './lib';

const input = readFileSync(join(__dirname, '../input.txt')).toString();
const array = input.split('\n').map((el) => Number(el));
const [a, b] = findTwoNumbersSummingToValue(array, 2020);

console.log(`numbers are: ${a} and ${b}`);
console.log(`multiplication is: ${a * b}`);
