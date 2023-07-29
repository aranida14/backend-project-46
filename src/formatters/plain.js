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
          name, type, status, oldValue, newValue, children,
        } = item;
        const stringifiedOld = stringifyPlain(oldValue);
        const stringifiedNew = stringifyPlain(newValue);
        const newAncestry = [...ancestry, name];

        if (type === 'plain') {
          switch (status) {
            case 'updated':
              return `Property '${newAncestry.join('.')}' was ${status}. From ${stringifiedOld} to ${stringifiedNew}`;
            case 'added':
              return `Property '${newAncestry.join('.')}' was ${status} with value: ${stringifiedNew}`;
            case 'removed':
              return `Property '${newAncestry.join('.')}' was ${status}`;
            case 'unchanged':
              return [];
            default:
              throw new Error(`Incorrect status ${status}`);
          }
        }
        return `${iter(children, newAncestry)}`;
      });
    return lines.join('\n');
  };
  return iter(diff, []);
};

export default plain;
