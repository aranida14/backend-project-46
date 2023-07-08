const isPrimitive = (value) => typeof value !== 'object' || value === null;

const stringify = (value, replacer = ' ', spacesCount = 1, defaultIndent = '') => {
  const iter = (currentValue, depth) => {
    if (isPrimitive(currentValue)) {
      return `${currentValue}`;
    }

    const indent = replacer.repeat(spacesCount).repeat(depth);
    const bracketIndent = replacer.repeat(spacesCount).repeat(depth - 1);
    const lines = Object
      .entries(currentValue)
      .map(([key, val]) => `${defaultIndent}${indent}${key}: ${iter(val, depth + 1)}`);

    return [
      '{',
      ...lines,
      `${defaultIndent}${bracketIndent}}`,
    ].join('\n');
  };
  return iter(value, 1);
};

export default stringify;
