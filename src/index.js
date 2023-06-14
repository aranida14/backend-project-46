import _ from 'lodash';
import * as fs from 'node:fs';
import * as path from 'node:path';

export default (filepath1, filepath2) => {
  const format = path.extname(filepath1);
  console.log('format: ' + format);
  if (format !== '.json') return;

  // const fileContent1 = fs.readFileSync(filepath1);
  const fileObject1 = JSON.parse(fs.readFileSync(filepath1));

  // const fileContent2 = fs.readFileSync(filepath2);
  const fileObject2 = JSON.parse(fs.readFileSync(filepath2));

  const keys = _.sortBy(_.union(Object.keys(fileObject1), Object.keys(fileObject2)));
  let diff = '{'
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
  
  // let result = `${filepath1}:\n${fileContent1}\n${filepath2}:\n${fileContent2}`;
  return diff;
}
