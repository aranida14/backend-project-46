import yaml from 'js-yaml';

const formatParserMap = {
  json: JSON.parse,
  yaml: yaml.load,
  yml: yaml.load,
};

const getFileObject = (filedata, format) => {
  if (!formatParserMap[format]) {
    throw new Error(`Unknown file format ${format}`);
  }
  return formatParserMap[format](filedata);
};
export default getFileObject;
