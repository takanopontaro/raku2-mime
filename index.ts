import fileType from 'file-type';
import fs from 'fs';
import readChunk from 'read-chunk';
import { promisify } from 'util';

const stat = promisify(fs.stat);

export const type = async (path: string) => {
  const stats = await stat(path);
  if (!stats.isFile()) return null;
  const buffer = await readChunk(path, 0, 4100);
  const res = fileType(buffer);
  return res ? res.mime : null;
};

export const is = async (fileType: string, path: string) => {
  const mime = await type(path);
  switch (fileType) {
    case 'zip':
      return mime === 'application/zip';
    default:
      return null;
  }
};
