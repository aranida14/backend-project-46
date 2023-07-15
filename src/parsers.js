import yaml from 'js-yaml';

const getFileObject = (filedata, format) => {
  if (format === 'json') {
    return JSON.parse(filedata);
  }
  if (format === 'yaml' || format === 'yml') {
    return yaml.load(filedata);
  }
  throw new Error(`Unknown file format ${format}`);
};
export default getFileObject;
