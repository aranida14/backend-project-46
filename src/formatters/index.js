import stylish from './stylish.js';
import plain from './plain.js';

const formattersMap = {
  stylish,
  plain,
  json: JSON.stringify,
};

const getFormatter = (formatName) => {
  if (!formattersMap[formatName]) {
    throw new Error(`Unknown format name: ${formatName}`);
  }
  return formattersMap[formatName];
};
export default getFormatter;
