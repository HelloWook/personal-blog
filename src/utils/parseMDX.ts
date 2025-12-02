import { buildPath } from '@/utils/file';
import fs from 'fs';
import matter from 'gray-matter';

const parseMDX = (fileName: string, locale: string = 'ko') => {
  // Try to read locale-specific file first (e.g., index.ko.mdx, index.en.mdx)
  const localeFilePath = buildPath(`contents/posts/${fileName}/index.${locale}.mdx`);
  const defaultFilePath = buildPath(`contents/posts/${fileName}/index.mdx`);
  
  let filePath: string;
  if (fs.existsSync(localeFilePath)) {
    filePath = localeFilePath;
  } else if (fs.existsSync(defaultFilePath)) {
    filePath = defaultFilePath;
  } else {
    throw new Error(`MDX file not found for ${fileName} with locale ${locale}`);
  }

  const { content: mdxContent, data, language } = matter(fs.readFileSync(filePath, 'utf-8'));

  return { mdxContent, data, language };
};

export default parseMDX;
