import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import {
  buildPath,
  readDirectory,
  readFileContent,
  parseMdxFile,
  createPostFromMetadata,
  getAllPosts,
  getPostByFileName,
  getAllPostFileNames,
  getAllSeries,
  getPostsWithBlurData,
  // Legacy exports
  getPosts,
  getFileNames,
  getSeries,
  getPostWithBlur,
  extract,
  getStaticpath,
  getFile,
  extractPostContent,
} from './file';
import { getBlurLocalImg } from './blurImg';

// 모킹
jest.mock('fs');
jest.mock('path');
jest.mock('gray-matter');
jest.mock('./blurImg');

const mockFs = fs as jest.Mocked<typeof fs>;
const mockPath = path as jest.Mocked<typeof path>;
const mockMatter = matter as jest.MockedFunction<typeof matter>;
const mockGetBlurLocalImg = getBlurLocalImg as jest.MockedFunction<typeof getBlurLocalImg>;

describe('file 유틸리티 함수들', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    // 기본 모킹 설정
    mockPath.join.mockImplementation((...args) => args.join('/'));
    mockPath.resolve.mockImplementation((...args) => args.join('/'));
    process.cwd = jest.fn(() => '/test/workspace');
  });

  describe('buildPath', () => {
    it('여러 경로 세그먼트를 올바르게 결합한다', () => {
      const result = buildPath('contents', 'posts', 'test-post');
      
      expect(result).toBe('/test/workspace/contents/posts/test-post');
      expect(mockPath.join).toHaveBeenCalledWith('/test/workspace', 'contents', 'posts', 'test-post');
    });

    it('단일 세그먼트를 올바르게 처리한다', () => {
      const result = buildPath('contents');
      
      expect(result).toBe('/test/workspace/contents');
      expect(mockPath.join).toHaveBeenCalledWith('/test/workspace', 'contents');
    });

    it('빈 세그먼트 배열을 처리한다', () => {
      const result = buildPath();
      
      expect(result).toBe('/test/workspace');
      expect(mockPath.join).toHaveBeenCalledWith('/test/workspace');
    });
  });

  describe('readDirectory', () => {
    it('디렉토리를 성공적으로 읽는다', () => {
      const mockFiles = ['post1', 'post2', 'post3'];
      mockFs.readdirSync.mockReturnValue(mockFiles as any);

      const result = readDirectory('contents/posts');

      expect(result).toEqual(mockFiles);
      expect(mockFs.readdirSync).toHaveBeenCalledWith('/test/workspace/contents/posts');
    });

    it('디렉토리 읽기 실패 시 빈 배열을 반환한다', () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      mockFs.readdirSync.mockImplementation(() => {
        throw new Error('Directory not found');
      });

      const result = readDirectory('non-existent-directory');

      expect(result).toEqual([]);
      expect(consoleSpy).toHaveBeenCalledWith('non-existent-directory', expect.any(Error));
      
      consoleSpy.mockRestore();
    });
  });

  describe('readFileContent', () => {
    it('파일 내용을 성공적으로 읽는다', () => {
      const mockContent = 'test file content';
      mockFs.readFileSync.mockReturnValue(mockContent);

      const result = readFileContent('/test/file.mdx');

      expect(result).toBe(mockContent);
      expect(mockFs.readFileSync).toHaveBeenCalledWith('/test/file.mdx', 'utf-8');
    });

    it('파일 읽기 실패 시 에러를 던진다', () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      mockFs.readFileSync.mockImplementation(() => {
        throw new Error('File not found');
      });

      expect(() => readFileContent('/test/non-existent.mdx')).toThrow('/test/non-existent.mdx');
      expect(consoleSpy).toHaveBeenCalledWith('/test/non-existent.mdx', expect.any(Error));
      
      consoleSpy.mockRestore();
    });
  });

  describe('parseMdxFile', () => {
    it('MDX 파일을 성공적으로 파싱한다', () => {
      const mockFileContent = '---\ntitle: Test Post\ndate: 2023-01-01\n---\n# Content';
      const mockParsed = {
        data: {
          title: 'Test Post',
          date: '2023-01-01',
          tags: ['test'],
          slug: 'test-post',
          excerpt: 'Test excerpt',
          thumbnail: 'test-thumbnail.png',
          series: 'test-series',
        },
        content: '# Content',
      };

      mockFs.readFileSync.mockReturnValue(mockFileContent);
      mockMatter.mockReturnValue(mockParsed as any);

      const result = parseMdxFile('/test/post.mdx');

      expect(result).toEqual({
        data: {
          title: 'Test Post',
          date: '2023-01-01',
          tags: ['test'],
          slug: 'test-post',
          excerpt: 'Test excerpt',
          thumbnail: 'test-thumbnail.png',
          series: 'test-series',
        },
        content: '# Content',
      });
    });

    it('tags가 없을 때 빈 배열을 사용한다', () => {
      const mockFileContent = '---\ntitle: Test Post\n---\n# Content';
      const mockParsed = {
        data: {
          title: 'Test Post',
          date: '2023-01-01',
          slug: 'test-post',
          thumbnail: 'test-thumbnail.png',
          series: 'test-series',
        },
        content: '# Content',
      };

      mockFs.readFileSync.mockReturnValue(mockFileContent);
      mockMatter.mockReturnValue(mockParsed as any);

      const result = parseMdxFile('/test/post.mdx');

      expect(result.data.tags).toEqual([]);
    });

    it('excerpt가 없을 때 undefined를 사용한다', () => {
      const mockFileContent = '---\ntitle: Test Post\n---\n# Content';
      const mockParsed = {
        data: {
          title: 'Test Post',
          date: '2023-01-01',
          tags: [],
          slug: 'test-post',
          thumbnail: 'test-thumbnail.png',
          series: 'test-series',
        },
        content: '# Content',
      };

      mockFs.readFileSync.mockReturnValue(mockFileContent);
      mockMatter.mockReturnValue(mockParsed as any);

      const result = parseMdxFile('/test/post.mdx');

      expect(result.data.excerpt).toBeUndefined();
    });

    it('파싱 실패 시 에러를 던진다', () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      mockFs.readFileSync.mockImplementation(() => {
        throw new Error('File read error');
      });

      expect(() => parseMdxFile('/test/error.mdx')).toThrow('/test/error.mdx');
      expect(consoleSpy).toHaveBeenCalledWith('/test/error.mdx', expect.any(Error));
      
      consoleSpy.mockRestore();
    });
  });

  describe('createPostFromMetadata', () => {
    it('메타데이터로부터 포스트 객체를 생성한다', () => {
      const metadata = {
        title: 'Test Post',
        date: '2023-01-01',
        tags: ['test'],
        slug: 'test-post',
        excerpt: 'Test excerpt',
        thumbnail: 'test-thumbnail.png',
        series: 'test-series',
      };
      const content = '# Test Content';
      const fileName = 'test-post.mdx';

      const result = createPostFromMetadata(metadata, content, fileName);

      expect(result).toEqual({
        title: 'Test Post',
        date: '2023-01-01',
        tags: ['test'],
        slug: 'test-post',
        content: '# Test Content',
        excerpt: 'Test excerpt',
        thumbnail: 'test-thumbnail.png',
        fileName: 'test-post',
        series: 'test-series',
      });
    });

    it('excerpt가 없을 때 content의 처음 100자를 사용한다', () => {
      const metadata = {
        title: 'Test Post',
        date: '2023-01-01',
        tags: ['test'],
        slug: 'test-post',
        thumbnail: 'test-thumbnail.png',
        series: 'test-series',
      };
      const content = 'This is a very long content that should be truncated to 100 characters for the excerpt when no excerpt is provided in the metadata.';
      const fileName = 'test-post.mdx';

      const result = createPostFromMetadata(metadata, content, fileName);

      expect(result.excerpt).toBe(content.slice(0, 100));
    });
  });

  describe('getAllPosts', () => {
    it('모든 포스트를 성공적으로 가져온다', () => {
      const mockFiles = ['post1', 'post2'];
      const mockParsed = {
        data: {
          title: 'Test Post',
          date: '2023-01-01',
          tags: ['test'],
          slug: 'test-post',
          thumbnail: 'test-thumbnail.png',
          series: 'test-series',
        },
        content: '# Content',
      };

      mockFs.readdirSync.mockReturnValue(mockFiles as any);
      mockFs.readFileSync.mockReturnValue('test content');
      mockMatter.mockReturnValue(mockParsed as any);

      const result = getAllPosts();

      expect(result).toHaveLength(2);
      expect(result[0].fileName).toBe('post1');
      expect(result[1].fileName).toBe('post2');
    });

    it('파일 읽기 실패한 포스트는 제외한다', () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      const mockFiles = ['valid-post', 'invalid-post'];
      const mockParsed = {
        data: {
          title: 'Test Post',
          date: '2023-01-01',
          tags: ['test'],
          slug: 'test-post',
          thumbnail: 'test-thumbnail.png',
          series: 'test-series',
        },
        content: '# Content',
      };

      mockFs.readdirSync.mockReturnValue(mockFiles as any);
      mockFs.readFileSync
        .mockReturnValueOnce('valid content')
        .mockImplementationOnce(() => {
          throw new Error('File read error');
        });
      mockMatter.mockReturnValue(mockParsed as any);

      const result = getAllPosts();

      expect(result).toHaveLength(1);
      expect(result[0].fileName).toBe('valid-post');
      expect(consoleSpy).toHaveBeenCalledWith('invalid-post', expect.any(Error));
      
      consoleSpy.mockRestore();
    });

    it('커스텀 디렉토리를 사용할 수 있다', () => {
      const mockFiles = ['custom-post'];
      const mockParsed = {
        data: {
          title: 'Custom Post',
          date: '2023-01-01',
          tags: ['custom'],
          slug: 'custom-post',
          thumbnail: 'custom-thumbnail.png',
          series: 'custom-series',
        },
        content: '# Custom Content',
      };

      mockFs.readdirSync.mockReturnValue(mockFiles as any);
      mockFs.readFileSync.mockReturnValue('custom content');
      mockMatter.mockReturnValue(mockParsed as any);

      const result = getAllPosts('custom/posts');

      expect(result).toHaveLength(1);
      expect(mockFs.readdirSync).toHaveBeenCalledWith('/test/workspace/custom/posts');
    });
  });

  describe('getPostByFileName', () => {
    it('파일명으로 특정 포스트를 가져온다', () => {
      const mockParsed = {
        data: {
          title: 'Specific Post',
          date: '2023-01-01',
          tags: ['specific'],
          slug: 'specific-post',
          thumbnail: 'specific-thumbnail.png',
          series: 'specific-series',
        },
        content: '# Specific Content',
      };

      mockFs.readFileSync.mockReturnValue('specific content');
      mockMatter.mockReturnValue(mockParsed as any);

      const result = getPostByFileName('specific-post');

      expect(result.title).toBe('Specific Post');
      expect(result.fileName).toBe('specific-post');
      expect(mockFs.readFileSync).toHaveBeenCalledWith('/test/workspace/contents/posts/specific-post/index.mdx', 'utf-8');
    });
  });

  describe('getAllPostFileNames', () => {
    it('모든 포스트의 파일명을 중복 제거하고 정렬하여 반환한다', () => {
      const mockFiles = ['post-c', 'post-a', 'post-b', 'post-a']; // 중복 포함
      
      mockFs.readdirSync.mockReturnValue(mockFiles as any);

      const result = getAllPostFileNames();

      expect(result).toEqual(['post-a', 'post-b', 'post-c']);
    });
  });

  describe('getAllSeries', () => {
    it('모든 시리즈를 중복 제거하고 정렬하여 반환한다', () => {
      const mockFiles = ['post1', 'post2', 'post3'];
      const mockParsed1 = {
        data: {
          title: 'Post 1',
          date: '2023-01-01',
          tags: ['test'],
          slug: 'post-1',
          thumbnail: 'thumb1.png',
          series: 'series-b',
        },
        content: '# Content 1',
      };
      const mockParsed2 = {
        data: {
          title: 'Post 2',
          date: '2023-01-02',
          tags: ['test'],
          slug: 'post-2',
          thumbnail: 'thumb2.png',
          series: 'series-a',
        },
        content: '# Content 2',
      };
      const mockParsed3 = {
        data: {
          title: 'Post 3',
          date: '2023-01-03',
          tags: ['test'],
          slug: 'post-3',
          thumbnail: 'thumb3.png',
          series: 'series-b', // 중복
        },
        content: '# Content 3',
      };

      mockFs.readdirSync.mockReturnValue(mockFiles as any);
      mockFs.readFileSync.mockReturnValue('test content');
      mockMatter
        .mockReturnValueOnce(mockParsed1 as any)
        .mockReturnValueOnce(mockParsed2 as any)
        .mockReturnValueOnce(mockParsed3 as any);

      const result = getAllSeries();

      expect(result).toEqual(['series-a', 'series-b']);
    });

    it('빈 시리즈는 제외한다', () => {
      const mockFiles = ['post1', 'post2'];
      const mockParsed1 = {
        data: {
          title: 'Post 1',
          date: '2023-01-01',
          tags: ['test'],
          slug: 'post-1',
          thumbnail: 'thumb1.png',
          series: 'valid-series',
        },
        content: '# Content 1',
      };
      const mockParsed2 = {
        data: {
          title: 'Post 2',
          date: '2023-01-02',
          tags: ['test'],
          slug: 'post-2',
          thumbnail: 'thumb2.png',
          series: '', // 빈 시리즈
        },
        content: '# Content 2',
      };

      mockFs.readdirSync.mockReturnValue(mockFiles as any);
      mockFs.readFileSync.mockReturnValue('test content');
      mockMatter
        .mockReturnValueOnce(mockParsed1 as any)
        .mockReturnValueOnce(mockParsed2 as any);

      const result = getAllSeries();

      expect(result).toEqual(['valid-series']);
    });
  });

  describe('getPostsWithBlurData', () => {
    it('블러 데이터가 포함된 포스트들을 반환한다', async () => {
      const mockFiles = ['post1'];
      const mockParsed = {
        data: {
          title: 'Test Post',
          date: '2023-01-01',
          tags: ['test'],
          slug: 'test-post',
          thumbnail: 'test-thumbnail.png',
          series: 'test-series',
        },
        content: '# Content',
      };
      const mockBlurData = 'data:image/jpeg;base64,blur-data';

      mockFs.readdirSync.mockReturnValue(mockFiles as any);
      mockFs.readFileSync.mockReturnValue('test content');
      mockMatter.mockReturnValue(mockParsed as any);
      mockGetBlurLocalImg.mockResolvedValue(mockBlurData);

      const result = await getPostsWithBlurData();

      expect(result).toHaveLength(1);
      expect(result[0].blurDataURL).toBe(mockBlurData);
      expect(mockGetBlurLocalImg).toHaveBeenCalledWith('test-thumbnail.png');
    });
  });

  describe('Legacy exports', () => {
    it('getPosts는 getAllPosts와 동일하다', () => {
      expect(getPosts).toBe(getAllPosts);
    });

    it('getFileNames는 getAllPostFileNames와 동일하다', () => {
      expect(getFileNames).toBe(getAllPostFileNames);
    });

    it('getSeries는 getAllSeries와 동일하다', () => {
      expect(getSeries).toBe(getAllSeries);
    });

    it('getPostWithBlur는 getPostsWithBlurData와 동일하다', () => {
      expect(getPostWithBlur).toBe(getPostsWithBlurData);
    });

    it('extract는 getPostByFileName과 동일하다', () => {
      expect(extract).toBe(getPostByFileName);
    });

    it('getStaticpath는 buildPath와 동일하다', () => {
      expect(getStaticpath).toBe(buildPath);
    });

    it('getFile는 readDirectory와 동일하다', () => {
      expect(getFile).toBe(readDirectory);
    });

    it('extractPostContent는 getAllPosts와 동일하다', () => {
      expect(extractPostContent).toBe(getAllPosts);
    });
  });
});
