import stringify from './stringify.js';

const stylish = (diff) => {
  const replacer = ' ';
  const spacesPerLevel = 4;
  const leftOffset = 2;
  const iter = (currentDiff, depth) => {
    const indent = replacer.repeat(spacesPerLevel * depth - leftOffset);
    const bracketIndent = replacer.repeat(spacesPerLevel * (depth - 1));
    const nestedIndent = replacer.repeat(spacesPerLevel * depth);
    const lines = currentDiff
      .flatMap((item) => {
        const {
          name, type, status, oldValue, newValue, children,
        } = item;
        if (type === 'plain') {
          switch (status) {
            case 'unchanged':
              return `${indent}  ${name}: ${stringify(oldValue, replacer, spacesPerLevel, nestedIndent)}`;
            case 'updated':
              return [
                `${indent}- ${name}: ${stringify(oldValue, replacer, spacesPerLevel, nestedIndent)}`,
                `${indent}+ ${name}: ${stringify(newValue, replacer, spacesPerLevel, nestedIndent)}`,
              ];
            case 'added':
              return `${indent}+ ${name}: ${stringify(newValue, replacer, spacesPerLevel, nestedIndent)}`;
            case 'removed':
              return `${indent}- ${name}: ${stringify(oldValue, replacer, spacesPerLevel, nestedIndent)}`;
            default:
              throw new Error(`Unknown status ${status}`);
          }
        }
        return `${indent}  ${name}: ${iter(children, depth + 1)}`;
      });
    return [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');
  };

  return iter(diff, 1);
};

export default stylish;
