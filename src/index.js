import fs from 'node:fs';
import path from 'node:path';
import getFileObject from './parsers.js';
import buildTree from './diff-tree.js';
import getFormatter from './formatters/index.js';

const getFileFormat = (filepath) => path.extname(filepath).slice(1);

export default (filepath1, filepath2, formatName = 'stylish') => {
  const filedata1 = fs.readFileSync(filepath1);
  const filedata2 = fs.readFileSync(filepath2);
  const fileFormat1 = getFileFormat(filepath1);
  const fileFormat2 = getFileFormat(filepath2);

  const fileObject1 = getFileObject(filedata1, fileFormat1);
  const fileObject2 = getFileObject(filedata2, fileFormat2);
  return getFormatter(formatName)(buildTree(fileObject1, fileObject2));
};
