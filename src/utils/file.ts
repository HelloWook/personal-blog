import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Post, PostWithBlur } from '@/types/post';
import { getBlurLocalImg } from './blurImg';

// Types
interface PostMetadata {
  title: string;
  date: string;
  tags: string[];
  slug: string;
  excerpt?: string;
  thumbnail: string;
  series: string;
}

interface ParsedPost extends Post {
  content: string;
}

// Constants
const POSTS_DIRECTORY = 'contents/posts';
const MDX_FILE_NAME = 'index.mdx';

// Helper function to get MDX file path with locale fallback
const getMdxFilePath = (directory: string, fileName: string, locale: string = 'ko'): string => {
  const localeFilePath = buildPath(directory, fileName, `index.${locale}.mdx`);
  const defaultFilePath = buildPath(directory, fileName, MDX_FILE_NAME);
  
  if (fs.existsSync(localeFilePath)) {
    return localeFilePath;
  }
  return defaultFilePath;
};

// Utility functions
export const buildPath = (...segments: string[]): string => {
  return path.join(process.cwd(), ...segments);
};

export const readDirectory = (directory: string): string[] => {
  try {
    return fs.readdirSync(buildPath(directory));
  } catch (error) {
    console.error(`${directory}`, error);
    return [];
  }
};

export const readFileContent = (filePath: string): string => {
  try {
    return fs.readFileSync(filePath, 'utf-8');
  } catch (error) {
    console.error(`${filePath}`, error);
    throw new Error(`${filePath}`);
  }
};

export const parseMdxFile = (filePath: string): { data: PostMetadata; content: string } => {
  try {
    const fileContent = readFileContent(filePath);
    const parsed = matter(fileContent);

    return {
      data: {
        title: parsed.data.title as string,
        date: parsed.data.date as string,
        tags: (parsed.data.tags as string[]) || [],
        slug: parsed.data.slug as string,
        excerpt: parsed.data.excerpt as string,
        thumbnail: parsed.data.thumbnail as string,
        series: parsed.data.series as string,
      },
      content: parsed.content,
    };
  } catch (error) {
    console.error(`${filePath}`, error);
    throw new Error(`${filePath}`);
  }
};

export const parseMdxFileWithLocale = (directory: string, fileName: string, locale: string = 'ko'): { data: PostMetadata; content: string } => {
  const filePath = getMdxFilePath(directory, fileName, locale);
  return parseMdxFile(filePath);
};

export const createPostFromMetadata = (metadata: PostMetadata, content: string, fileName: string): ParsedPost => {
  return {
    title: metadata.title,
    date: metadata.date,
    tags: metadata.tags,
    slug: metadata.slug,
    content,
    excerpt: metadata.excerpt || content.slice(0, 100),
    thumbnail: metadata.thumbnail,
    fileName: fileName.replace('.mdx', ''),
    series: metadata.series,
  };
};

// Main functions
export const getAllPosts = (directory: string = POSTS_DIRECTORY, locale: string = 'ko'): Post[] => {
  const files = readDirectory(directory);

  return files
    .map((file) => {
      try {
        const { data, content } = parseMdxFileWithLocale(directory, file, locale);
        return createPostFromMetadata(data, content, file);
      } catch (error) {
        console.error(`${file}`, error);
        return null;
      }
    })
    .filter((post): post is ParsedPost => post !== null);
};

export const getPostByFileName = (fileName: string, directory: string = POSTS_DIRECTORY, locale: string = 'ko'): Post => {
  const { data, content } = parseMdxFileWithLocale(directory, fileName, locale);
  return createPostFromMetadata(data, content, fileName);
};

export const getAllPostFileNames = (directory: string = POSTS_DIRECTORY): string[] => {
  // Get file names from directory structure, not from parsed posts
  // This ensures we get all posts regardless of locale
  const files = readDirectory(directory);
  return files.sort();
};

export const getAllSeries = (directory: string = POSTS_DIRECTORY, locale: string = 'ko'): string[] => {
  const posts = getAllPosts(directory, locale);
  return Array.from(new Set(posts.map((post) => post.series).filter(Boolean))).sort();
};

export const getPostsWithBlurData = async (directory: string = POSTS_DIRECTORY, locale: string = 'ko'): Promise<PostWithBlur[]> => {
  const posts = getAllPosts(directory, locale);

  return Promise.all(
    posts.map(async (post) => ({
      ...post,
      blurDataURL: await getBlurLocalImg(post.thumbnail),
    }))
  );
};

// Legacy exports for backward compatibility
export const getPosts = getAllPosts;
export const getFileNames = getAllPostFileNames;
export const getSeries = getAllSeries;
export const getPostWithBlur = getPostsWithBlurData;
export const extract = getPostByFileName;
export const getStaticpath = buildPath;
export const getFile = readDirectory;
export const extractPostContent = getAllPosts;
