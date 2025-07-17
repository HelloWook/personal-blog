import path from 'path';
import { getFile, extractPostContent, getPosts, getStaticpath } from './file';
import fs from 'fs';

describe('파일 유틸 테스팅', () => {
  it('getStaticpath는 정적 경로를 기반으로 작동해야 합니다', () => {
    const result = getStaticpath(['test']);
    expect(result).toBe(path.join(process.cwd(), 'test'));
  });

  it('getFile은 지정된 디렉토리의 파일 목록을 반환해야 합니다', () => {
    const mockDirectory = 'mockDir';
    jest.spyOn(fs, 'readdirSync').mockReturnValue(['file1.mdx', 'file2.mdx']);

    const result = getFile(mockDirectory);
    expect(result).toEqual(['file1.mdx', 'file2.mdx']);
  });

  it('extractPostContent는 파일 목록에서 포스트 내용을 추출해야 합니다', () => {
    const mockFiles = ['post1.mdx', 'post2.mdx'];
    const mockDirectory = 'mockDir';
    jest.spyOn(fs, 'readFileSync').mockImplementation((filePath) => {
      if (filePath.includes('post1.mdx')) return `---\ntitle: "Post 1"\ndate: "2023-01-01"\ntags: ["tag1"]\n---\nContent of post 1`;

      if (filePath.includes('post2.mdx')) return `---\ntitle: "Post 2"\ndate: "2023-01-02"\ntags: ["tag2"]\n---\nContent of post 2`;

      return '';
    });

    const result = extractPostContent(mockFiles, mockDirectory);
    expect(result).toEqual([
      {
        title: 'Post 1',
        date: '2023-01-01',
        tags: ['tag1'],
        slug: 'post1',
        content: 'Content of post 1',
        excerpt: 'Content of post 1',
        thumbnail: undefined,
      },
      {
        title: 'Post 2',
        date: '2023-01-02',
        tags: ['tag2'],
        slug: 'post2',
        content: 'Content of post 2',
        excerpt: 'Content of post 2',
        thumbnail: undefined,
      },
    ]);
  });

  it('getPosts는 지정된 디렉토리에서 포스트 목록을 반환해야 합니다', () => {
    const mockDirectory = 'mockPosts';
    jest.spyOn(fs, 'readdirSync').mockReturnValue(['post1.mdx', 'post2.mdx']);
    jest.spyOn(fs, 'readFileSync').mockImplementation((filePath) => {
      if (filePath.includes('post1.mdx')) return `---\ntitle: "Post 1"\ndate: "2023-01-01"\ntags: ["tag1"]\n---\nContent of post 1`;

      if (filePath.includes('post2.mdx')) return `---\ntitle: "Post 2"\ndate: "2023-01-02"\ntags: ["tag2"]\n---\nContent of post 2`;

      return '';
    });

    const result = getPosts(mockDirectory);
    expect(result).toHaveLength(2);
    expect(result[0].title).toBe('Post 1');
    expect(result[1].title).toBe('Post 2');
  });

  it('getPosts는 지정된 디렉토리에서 MDX 파일만 필터링해야 합니다', () => {
    jest.spyOn(fs, 'readdirSync').mockReturnValue(['post1.mdx', 'post2.ts', 'post3.js']);

    jest.spyOn(fs, 'readFileSync').mockImplementation((filePath) => {
      if (filePath.includes('mdx')) return `---\ntitle: "Post 1"\ndate: "2023-01-01"\ntags: ["tag1"]\n---\nContent of post 1`;

      return '';
    });
  });
});
