import { getPlaiceholder } from 'plaiceholder';
import fs from 'fs';
import path from 'path';

const getBlurImg = async (imgSrc: string) => {
  try {
    const buffer = await fetch(imgSrc).then(async (res) => Buffer.from(await res.arrayBuffer()));
    const { base64 } = await getPlaiceholder(buffer, { size: 5 });
    return base64;
  } catch {
    return '';
  }
};

const getBlurLocalImg = async (imgPath: string) => {
  try {
    const fullPath = path.join(process.cwd(), imgPath);
    const buffer = fs.readFileSync(fullPath);
    const { base64 } = await getPlaiceholder(buffer, { size: 5 });
    return base64;
  } catch {
    return '';
  }
};

export { getBlurImg, getBlurLocalImg };
