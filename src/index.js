import _ from 'lodash';
import getFileObject from './parsers.js';
import stylish from './formatters/stylish.js';

const isObject = (value) => typeof value === 'object' && value !== null;
const formattersMap = {
  stylish,
};

export default (filepath1, filepath2, format = 'stylish') => {
  const fileObject1 = getFileObject(filepath1);
  const fileObject2 = getFileObject(filepath2);

  const iter = (obj1, obj2) => {
    const keys = _.sortBy(_.union(Object.keys(obj1), Object.keys(obj2)));
    const diffArray = keys
      .map((key) => {
        let singleDiff = {
          name: key,
        };
        if (!Object.hasOwn(obj1, key)) {
          singleDiff = {
            ...singleDiff, type: 'plain', status: 'added', newValue: obj2[key],
          };
        } else if (!Object.hasOwn(obj2, key)) {
          singleDiff = {
            ...singleDiff, type: 'plain', status: 'deleted', oldValue: obj1[key],
          };
        } else if (isObject(obj1[key]) && isObject(obj2[key])) {
          singleDiff = { ...singleDiff, type: 'complex', children: iter(obj1[key], obj2[key]) };
        } else if (obj1[key] === obj2[key]) {
          singleDiff = {
            ...singleDiff, type: 'plain', status: 'unchanged', oldValue: obj1[key], newValue: obj2[key],
          };
        } else {
          singleDiff = {
            ...singleDiff, type: 'plain', status: 'changed', oldValue: obj1[key], newValue: obj2[key],
          };
        }
        return singleDiff;
      });

    return diffArray;
  };

  return formattersMap[format](iter(fileObject1, fileObject2));
};
