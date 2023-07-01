import _ from 'lodash';
import getFileObject from './parsers.js';

export default (filepath1, filepath2) => {
  const fileObject1 = getFileObject(filepath1);
  const fileObject2 = getFileObject(filepath2);

  const keys = _.sortBy(_.union(Object.keys(fileObject1), Object.keys(fileObject2)));
  let diff = '{';
  keys.forEach((key) => {
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
  });
  diff = `${diff}\n}`;

  return diff;
};
