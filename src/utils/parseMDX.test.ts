import parseMDX from './parseMDX';
import { buildPath } from './file';
import fs from 'fs';
import matter from 'gray-matter';

// Mock dependencies
jest.mock('./file');
jest.mock('fs');
jest.mock('gray-matter');

const mockBuildPath = buildPath as jest.MockedFunction<typeof buildPath>;
const mockFs = fs as jest.Mocked<typeof fs>;
const mockMatter = matter as jest.MockedFunction<typeof matter>;

describe('MDX 파싱 유틸리티', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // fs.existsSync를 명시적으로 모킹
    (mockFs.existsSync as jest.Mock) = jest.fn();
  });

  it('MDX 파일을 올바르게 파싱해야 한다', () => {
    const fileName = 'test-post';
    const locale = 'ko';
    const mockLocaleFilePath = '/path/to/contents/posts/test-post/index.ko.mdx';
    const mockDefaultFilePath = '/path/to/contents/posts/test-post/index.mdx';
    const mockFileContent = `---
title: Test Post
date: 2024-01-01
tags: [test, example]
slug: test-post
---

# Test Post

This is the content of the test post.`;

    const mockParsedData = {
      content: '# Test Post\n\nThis is the content of the test post.',
      data: {
        title: 'Test Post',
        date: '2024-01-01',
        tags: ['test', 'example'],
        slug: 'test-post',
      },
      language: 'markdown',
    };

    mockBuildPath
      .mockReturnValueOnce(mockLocaleFilePath)
      .mockReturnValueOnce(mockDefaultFilePath);
    mockFs.existsSync
      .mockReturnValueOnce(false) // locale 파일이 없으면
      .mockReturnValueOnce(true); // default 파일이 있으면
    mockFs.readFileSync.mockReturnValue(mockFileContent);
    mockMatter.mockReturnValue(mockParsedData as any);

    const result = parseMDX(fileName, locale);

    expect(mockBuildPath).toHaveBeenCalledWith(`contents/posts/${fileName}/index.${locale}.mdx`);
    expect(mockBuildPath).toHaveBeenCalledWith(`contents/posts/${fileName}/index.mdx`);
    expect(mockFs.readFileSync).toHaveBeenCalledWith(mockDefaultFilePath, 'utf-8');
    expect(mockMatter).toHaveBeenCalledWith(mockFileContent);
    expect(result).toEqual({
      mdxContent: mockParsedData.content,
      data: mockParsedData.data,
      language: mockParsedData.language,
    });
  });

  it('복잡한 메타데이터가 있는 MDX 파일을 파싱해야 한다', () => {
    const fileName = 'complex-post';
    const locale = 'ko';
    const mockLocaleFilePath = '/path/to/contents/posts/complex-post/index.ko.mdx';
    const mockDefaultFilePath = '/path/to/contents/posts/complex-post/index.mdx';
    const mockFileContent = `---
title: Complex Post
date: 2024-01-01
tags: [react, nextjs, typescript]
slug: complex-post
excerpt: This is a complex post with many features
thumbnail: /images/complex-post.jpg
series: React Series
author: John Doe
---

# Complex Post

This is a complex post with many features and metadata.`;

    const mockParsedData = {
      content: '# Complex Post\n\nThis is a complex post with many features and metadata.',
      data: {
        title: 'Complex Post',
        date: '2024-01-01',
        tags: ['react', 'nextjs', 'typescript'],
        slug: 'complex-post',
        excerpt: 'This is a complex post with many features',
        thumbnail: '/images/complex-post.jpg',
        series: 'React Series',
        author: 'John Doe',
      },
      language: 'markdown',
    };

    mockBuildPath
      .mockReturnValueOnce(mockLocaleFilePath)
      .mockReturnValueOnce(mockDefaultFilePath);
    mockFs.existsSync.mockReturnValueOnce(false).mockReturnValueOnce(true);
    mockFs.readFileSync.mockReturnValue(mockFileContent);
    mockMatter.mockReturnValue(mockParsedData as any);

    const result = parseMDX(fileName, locale);

    expect(result.mdxContent).toBe(mockParsedData.content);
    expect(result.data).toEqual(mockParsedData.data);
    expect(result.language).toBe(mockParsedData.language);
  });

  it('메타데이터가 없는 MDX 파일을 파싱해야 한다', () => {
    const fileName = 'no-metadata-post';
    const locale = 'ko';
    const mockLocaleFilePath = '/path/to/contents/posts/no-metadata-post/index.ko.mdx';
    const mockDefaultFilePath = '/path/to/contents/posts/no-metadata-post/index.mdx';
    const mockFileContent = `# No Metadata Post

This post has no frontmatter metadata.`;

    const mockParsedData = {
      content: '# No Metadata Post\n\nThis post has no frontmatter metadata.',
      data: {},
      language: 'markdown',
    };

    mockBuildPath
      .mockReturnValueOnce(mockLocaleFilePath)
      .mockReturnValueOnce(mockDefaultFilePath);
    mockFs.existsSync.mockReturnValueOnce(false).mockReturnValueOnce(true);
    mockFs.readFileSync.mockReturnValue(mockFileContent);
    mockMatter.mockReturnValue(mockParsedData as any);

    const result = parseMDX(fileName, locale);

    expect(result.mdxContent).toBe(mockParsedData.content);
    expect(result.data).toEqual({});
    expect(result.language).toBe(mockParsedData.language);
  });

  it('올바른 파일 경로를 생성해야 한다', () => {
    const fileName = 'path-test';
    const locale = 'ko';
    const mockLocaleFilePath = '/correct/path/to/contents/posts/path-test/index.ko.mdx';
    const mockDefaultFilePath = '/correct/path/to/contents/posts/path-test/index.mdx';
    const mockFileContent = '# Test';
    const mockParsedData = {
      content: '# Test',
      data: {},
      language: 'markdown',
    };

    mockBuildPath
      .mockReturnValueOnce(mockLocaleFilePath)
      .mockReturnValueOnce(mockDefaultFilePath);
    mockFs.existsSync.mockReturnValueOnce(false).mockReturnValueOnce(true);
    mockFs.readFileSync.mockReturnValue(mockFileContent);
    mockMatter.mockReturnValue(mockParsedData as any);

    parseMDX(fileName, locale);

    expect(mockBuildPath).toHaveBeenCalledWith(`contents/posts/${fileName}/index.${locale}.mdx`);
    expect(mockBuildPath).toHaveBeenCalledWith(`contents/posts/${fileName}/index.mdx`);
  });

  it('파일 읽기 시 올바른 인코딩을 사용해야 한다', () => {
    const fileName = 'encoding-test';
    const locale = 'ko';
    const mockLocaleFilePath = '/path/to/contents/posts/encoding-test/index.ko.mdx';
    const mockDefaultFilePath = '/path/to/contents/posts/encoding-test/index.mdx';
    const mockFileContent = '# Test';
    const mockParsedData = {
      content: '# Test',
      data: {},
      language: 'markdown',
    };

    mockBuildPath
      .mockReturnValueOnce(mockLocaleFilePath)
      .mockReturnValueOnce(mockDefaultFilePath);
    mockFs.existsSync.mockReturnValueOnce(false).mockReturnValueOnce(true);
    mockFs.readFileSync.mockReturnValue(mockFileContent);
    mockMatter.mockReturnValue(mockParsedData as any);

    parseMDX(fileName, locale);

    expect(mockFs.readFileSync).toHaveBeenCalledWith(mockDefaultFilePath, 'utf-8');
  });
});