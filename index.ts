import fileType from 'file-type';
import fs from 'fs';
import ndPath from 'path';
import readChunk from 'read-chunk';
import { promisify } from 'util';

import { Options } from './index.d';

const stat = promisify(fs.stat);

const type = async (path: string, options?: Options) => {
  const cwd = (options && options.cwd) || null;
  const p = cwd ? ndPath.resolve(cwd, path) : path;
  const stats = await stat(p);
  if (!stats.isFile()) return null;
  const buffer = await readChunk(p, 0, 4100);
  const res = fileType(buffer);
  return res ? res.mime : null;
};

const is = async (fileType: string, path: string, options?: Options) => {
  const mime = await type(path, options);
  if (mime === null) return null;
  switch (fileType) {
    case 'zip':
      return mime === 'application/zip';
    default:
      return null;
  }
};

module.exports = { type, is };
