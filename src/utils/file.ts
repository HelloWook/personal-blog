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
export const getAllPosts = (directory: string = POSTS_DIRECTORY): Post[] => {
  const files = readDirectory(directory);

  return files
    .map((file) => {
      try {
        const filePath = buildPath(directory, file, MDX_FILE_NAME);
        const { data, content } = parseMdxFile(filePath);
        return createPostFromMetadata(data, content, file);
      } catch (error) {
        console.error(`${file}`, error);
        return null;
      }
    })
    .filter((post): post is ParsedPost => post !== null);
};

export const getPostByFileName = (fileName: string, directory: string = POSTS_DIRECTORY): Post => {
  const filePath = buildPath(directory, fileName, MDX_FILE_NAME);
  const { data, content } = parseMdxFile(filePath);
  return createPostFromMetadata(data, content, fileName);
};

export const getAllPostFileNames = (directory: string = POSTS_DIRECTORY): string[] => {
  const posts = getAllPosts(directory);
  return Array.from(new Set(posts.map((post) => post.fileName))).sort();
};

export const getAllSeries = (directory: string = POSTS_DIRECTORY): string[] => {
  const posts = getAllPosts(directory);
  return Array.from(new Set(posts.map((post) => post.series).filter(Boolean))).sort();
};

export const getPostsWithBlurData = async (directory: string = POSTS_DIRECTORY): Promise<PostWithBlur[]> => {
  const posts = getAllPosts(directory);

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
