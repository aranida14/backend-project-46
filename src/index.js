import _ from 'lodash';
import * as fs from 'node:fs';
import * as path from 'node:path';

export default (filepath1, filepath2) => {
  const format = path.extname(filepath1);
  if (format !== '.json') return '';

  const fileObject1 = JSON.parse(fs.readFileSync(filepath1));

  const fileObject2 = JSON.parse(fs.readFileSync(filepath2));

  const keys = _.sortBy(_.union(Object.keys(fileObject1), Object.keys(fileObject2)));
  let diff = '{';
  for (const key of keys) {
    if (!Object.hasOwn(fileObject1, key)) {
      diff = `${diff}\n  + ${key}: ${fileObject2[key]}`;
    } else if (!Object.hasOwn(fileObject2, key)) {
      diff = `${diff}\n  - ${key}: ${fileObject1[key]}`;
    } else if (fileObject1[key] === fileObject2[key]) {
      diff = `${diff}\n    ${key}: ${fileObject1[key]}`;
    } else {
      diff = `${diff}\n  - ${key}: ${fileObject1[key]}`;
      diff = `${diff}\n  + ${key}: ${fileObject2[key]}`;
    }
  }
  diff = `${diff}\n}`;

  return diff;
};
