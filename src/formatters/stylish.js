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
        let line;
        if (type === 'plain') {
          switch (status) {
            case 'unchanged':
              line = `${indent}  ${name}: ${stringify(oldValue, replacer, spacesPerLevel, nestedIndent)}`;
              break;
            case 'changed':
              line = [];
              line.push(`${indent}- ${name}: ${stringify(oldValue, replacer, spacesPerLevel, nestedIndent)}`);
              line.push(`${indent}+ ${name}: ${stringify(newValue, replacer, spacesPerLevel, nestedIndent)}`);
              break;
            case 'added':
              line = `${indent}+ ${name}: ${stringify(newValue, replacer, spacesPerLevel, nestedIndent)}`;
              break;
            case 'deleted':
              line = `${indent}- ${name}: ${stringify(oldValue, replacer, spacesPerLevel, nestedIndent)}`;
              break;
            default:
              throw new Error(`Unknown status ${status}`);
          }
        } else {
          line = `${indent}  ${name}: ${iter(children, depth + 1)}`;
        }
        return line;
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
