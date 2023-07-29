import _ from 'lodash';

const stringifyPlain = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return value;
};

const plain = (diff) => {
  const iter = (currentDiff, ancestry) => {
    const lines = currentDiff
      .flatMap((item) => {
        const { name, status } = item;
        const newAncestry = [...ancestry, name];

        switch (status) {
          case 'changed':
            return `Property '${newAncestry.join('.')}' was updated. From ${stringifyPlain(item.oldValue)} to ${stringifyPlain(item.newValue)}`;
          case 'added':
            return `Property '${newAncestry.join('.')}' was added with value: ${stringifyPlain(item.newValue)}`;
          case 'removed':
            return `Property '${newAncestry.join('.')}' was removed`;
          case 'unchanged':
            return [];
          case 'complex':
            return `${iter(item.children, newAncestry)}`;
          default:
            throw new Error(`Incorrect status ${status}`);
        }
      });
    return lines.join('\n');
  };
  return iter(diff, []);
};

export default plain;
