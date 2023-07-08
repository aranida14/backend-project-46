import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

let expectedResultStylish;
let expectedResultPlain;

beforeAll(() => {
  expectedResultStylish = readFile('expectedResultStylish.txt');
  expectedResultPlain = readFile('expectedResultPlain.txt');
});

test('json stylish diff', () => {
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'))).toEqual(expectedResultStylish);
});

test('yaml stylish diff', () => {
  expect(genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'))).toEqual(expectedResultStylish);
});

test('json plain diff', () => {
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'plain')).toEqual(expectedResultPlain);
});

test('yaml plain diff', () => {
  expect(genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'), 'plain')).toEqual(expectedResultPlain);
});
