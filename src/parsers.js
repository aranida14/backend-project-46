import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';

export const isJSONExt = (filepath) => path.extname(filepath) === '.json';
export const isYamlExt = (filepath) => (path.extname(filepath) === '.yaml' || path.extname(filepath) === '.yml');

const getFileObject = (filepath) => {
  if (isJSONExt(filepath)) {
    return JSON.parse(fs.readFileSync(filepath));
  }
  if (isYamlExt(filepath)) {
    return yaml.load(fs.readFileSync(filepath));
  }
  throw new Error(`File with unknown extention: ${filepath}`);
};
export default getFileObject;
