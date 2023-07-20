import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const expectedResultStylish = readFile('expectedResultStylish.txt');
const expectedResultPlain = readFile('expectedResultPlain.txt');
const expectedResultJSON = readFile('expectedResultJSON.json');

test
  .each([
    {
      file1: 'file1.json', file2: 'file2.json', expected: expectedResultStylish, format: undefined, formatForTitle: 'stylish (default)',
    },
    {
      file1: 'file1.yml', file2: 'file2.yml', expected: expectedResultStylish, format: undefined, formatForTitle: 'stylish (default)',
    },
    {
      file1: 'file1.json', file2: 'file2.json', expected: expectedResultPlain, format: 'plain', formatForTitle: 'plain',
    },
    {
      file1: 'file1.yml', file2: 'file2.yml', expected: expectedResultPlain, format: 'plain', formatForTitle: 'plain',
    },
    {
      file1: 'file1.yml', file2: 'file2.json', expected: expectedResultJSON, format: 'json', formatForTitle: 'json',
    },
  ])('testing diff ($file1, $file2) with format $formatForTitle', ({
    file1, file2, expected, format,
  }) => {
    expect(genDiff(getFixturePath(file1), getFixturePath(file2), format)).toEqual(expected);
  });
