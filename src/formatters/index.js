import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

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
export default getFormatter;
