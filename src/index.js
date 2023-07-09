import _ from 'lodash';
import getFileObject from './parsers.js';
import stylish from './formatters/stylish.js';
import plain from './formatters/plain.js';
import json from './formatters/json.js';

const isObject = (value) => typeof value === 'object' && value !== null;
const formattersMap = {
  stylish,
  plain,
  json,
};

const getFormatter = (formatName) => {
  if (!formattersMap[formatName]) {
    throw new Error(`Unknown format name: ${formatName}`);
  }
  return formattersMap[formatName];
};

export default (filepath1, filepath2, formatName = 'stylish') => {
  const fileObject1 = getFileObject(filepath1);
  const fileObject2 = getFileObject(filepath2);

  const iter = (obj1, obj2) => {
    const keys = _.sortBy(_.union(Object.keys(obj1), Object.keys(obj2)));
    const diffArray = keys
      .map((key) => {
        if (!Object.hasOwn(obj1, key)) {
          return {
            name: key, type: 'plain', status: 'added', newValue: obj2[key],
          };
        }
        if (!Object.hasOwn(obj2, key)) {
          return {
            name: key, type: 'plain', status: 'removed', oldValue: obj1[key],
          };
        }
        if (isObject(obj1[key]) && isObject(obj2[key])) {
          return {
            name: key, type: 'complex', children: iter(obj1[key], obj2[key]),
          };
        }
        if (obj1[key] === obj2[key]) {
          return {
            name: key, type: 'plain', status: 'unchanged', oldValue: obj1[key], newValue: obj2[key],
          };
        }
        return {
          name: key, type: 'plain', status: 'updated', oldValue: obj1[key], newValue: obj2[key],
        };
      });

    return diffArray;
  };

  return getFormatter(formatName)(iter(fileObject1, fileObject2));
};
