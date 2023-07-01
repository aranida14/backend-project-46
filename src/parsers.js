import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';

export const isJSONExt = (filepath) => path.extname(filepath) === '.json';
export const isYamlExt = (filepath) => (path.extname(filepath) === '.yaml' || path.extname(filepath) === '.yml');

const getFileObject = (filepath) => {
  let fileObject;
  if (isJSONExt(filepath)) {
    fileObject = JSON.parse(fs.readFileSync(filepath));
  }
  if (isYamlExt(filepath)) {
    fileObject = yaml.load(fs.readFileSync(filepath));
  }
  return fileObject;
};
export default getFileObject;
