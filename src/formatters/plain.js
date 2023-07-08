const isComplex = (value) => typeof value === 'object' && value !== null;
const stringifyPlain = (value) => {
  if (isComplex(value)) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return value;
};

const filterChanged = (diff) => {
  const filtered = diff
    .map((node) => {
      if (node.type === 'complex') {
        return { ...node, children: filterChanged(node.children) };
      }
      return node;
    })
    .filter((node) => {
      const { type, status, children } = node;
      if (type === 'plain') {
        return status === 'updated' || status === 'added' || status === 'removed';
      }
      return (children && children.length > 0);
    });
  return filtered;
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
            default:
              throw new Error(`Incorrect status ${status}`);
          }
        }
        return `${iter(children, newAncestry)}`;
      });
    return lines.join('\n');
  };
  return iter(filterChanged(diff), []);
};

export default plain;
