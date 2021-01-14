import { readFileSync } from 'fs';
import { join } from 'path';
import { findThreeNumbersSummingToValue } from './lib';

const input = readFileSync(join(__dirname, '../input.txt')).toString();
const array = input.split('\n').map((el) => Number(el));
const [a, b, c] = findThreeNumbersSummingToValue(array, 2020);

console.log(`numbers are: ${a} and ${b} and ${c}`);
console.log(`multiplication is: ${a * b * c}`);
