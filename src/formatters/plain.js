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
        const {
          name, status, oldValue, newValue, children,
        } = item;
        const stringifiedOld = stringifyPlain(oldValue);
        const stringifiedNew = stringifyPlain(newValue);
        const newAncestry = [...ancestry, name];

        switch (status) {
          case 'changed':
            return `Property '${newAncestry.join('.')}' was updated. From ${stringifiedOld} to ${stringifiedNew}`;
          case 'added':
            return `Property '${newAncestry.join('.')}' was ${status} with value: ${stringifiedNew}`;
          case 'removed':
            return `Property '${newAncestry.join('.')}' was ${status}`;
          case 'unchanged':
            return [];
          case 'complex':
            return `${iter(children, newAncestry)}`;
          default:
            throw new Error(`Incorrect status ${status}`);
        }
      });
    return lines.join('\n');
  };
  return iter(diff, []);
};

export default plain;
