import _ from 'lodash';

const buildTree = (obj1, obj2) => {
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
      if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
        return {
          name: key, type: 'complex', children: buildTree(obj1[key], obj2[key]),
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

export default buildTree;
