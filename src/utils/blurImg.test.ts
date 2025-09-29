import { getBlurImg, getBlurLocalImg } from './blurImg';
import { getPlaiceholder } from 'plaiceholder';
import fs from 'fs';
import path from 'path';

// Mock dependencies
jest.mock('plaiceholder');
jest.mock('fs');
jest.mock('path');

const mockGetPlaiceholder = getPlaiceholder as jest.MockedFunction<typeof getPlaiceholder>;
const mockFs = fs as jest.Mocked<typeof fs>;
const mockPath = path as jest.Mocked<typeof path>;

// Mock fetch
global.fetch = jest.fn();

describe('블러 이미지 유틸리티', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getBlurImg', () => {
    it('유효한 이미지 URL로부터 블러 데이터를 생성해야 한다', async () => {
      const mockImageUrl = 'https://example.com/image.jpg';
      const mockBuffer = Buffer.from('mock-image-data');
      const mockBase64 = 'data:image/jpeg;base64,mock-base64-data';

      (global.fetch as jest.Mock).mockResolvedValue({
        arrayBuffer: jest.fn().mockResolvedValue(mockBuffer),
      });
      mockGetPlaiceholder.mockResolvedValue({ base64: mockBase64 } as any);

      const result = await getBlurImg(mockImageUrl);

      expect(global.fetch).toHaveBeenCalledWith(mockImageUrl);
      expect(mockGetPlaiceholder).toHaveBeenCalledWith(mockBuffer, { size: 5 });
      expect(result).toBe(mockBase64);
    });

    it('잘못된 URL에 대해 빈 문자열을 반환해야 한다', async () => {
      const invalidUrl = 'https://invalid-url.com/nonexistent.jpg';

      (global.fetch as jest.Mock).mockRejectedValue(new Error('Network error'));

      const result = await getBlurImg(invalidUrl);

      expect(result).toBe('');
    });

    it('plaiceholder 에러 발생 시 빈 문자열을 반환해야 한다', async () => {
      const mockImageUrl = 'https://example.com/image.jpg';
      const mockBuffer = Buffer.from('mock-image-data');

      (global.fetch as jest.Mock).mockResolvedValue({
        arrayBuffer: jest.fn().mockResolvedValue(mockBuffer),
      });
      mockGetPlaiceholder.mockRejectedValue(new Error('Plaiceholder error'));

      const result = await getBlurImg(mockImageUrl);

      expect(result).toBe('');
    });
  });

  describe('getBlurLocalImg', () => {
    it('유효한 로컬 이미지 경로로부터 블러 데이터를 생성해야 한다', async () => {
      const mockImagePath = '/images/test.jpg';
      const mockFullPath = '/full/path/to/image.jpg';
      const mockBuffer = Buffer.from('mock-image-data');
      const mockBase64 = 'data:image/jpeg;base64,mock-base64-data';

      mockPath.join.mockReturnValue(mockFullPath);
      mockFs.readFileSync.mockReturnValue(mockBuffer);
      mockGetPlaiceholder.mockResolvedValue({ base64: mockBase64 } as any);

      const result = await getBlurLocalImg(mockImagePath);

      expect(mockPath.join).toHaveBeenCalledWith(process.cwd(), 'public', mockImagePath);
      expect(mockFs.readFileSync).toHaveBeenCalledWith(mockFullPath);
      expect(mockGetPlaiceholder).toHaveBeenCalledWith(mockBuffer, { size: 5 });
      expect(result).toBe(mockBase64);
    });

    it('존재하지 않는 파일에 대해 빈 문자열을 반환해야 한다', async () => {
      const invalidPath = '/nonexistent/image.jpg';
      const mockFullPath = '/full/path/to/nonexistent/image.jpg';

      mockPath.join.mockReturnValue(mockFullPath);
      mockFs.readFileSync.mockImplementation(() => {
        throw new Error('File not found');
      });

      const result = await getBlurLocalImg(invalidPath);

      expect(result).toBe('');
    });

    it('plaiceholder 에러 발생 시 빈 문자열을 반환해야 한다', async () => {
      const mockImagePath = '/images/test.jpg';
      const mockFullPath = '/full/path/to/image.jpg';
      const mockBuffer = Buffer.from('mock-image-data');

      mockPath.join.mockReturnValue(mockFullPath);
      mockFs.readFileSync.mockReturnValue(mockBuffer);
      mockGetPlaiceholder.mockRejectedValue(new Error('Plaiceholder error'));

      const result = await getBlurLocalImg(mockImagePath);

      expect(result).toBe('');
    });

    it('올바른 경로를 생성해야 한다', async () => {
      const mockImagePath = 'images/test.jpg';
      const mockFullPath = '/project/public/images/test.jpg';
      const mockBuffer = Buffer.from('mock-image-data');
      const mockBase64 = 'data:image/jpeg;base64,mock-base64-data';

      mockPath.join.mockReturnValue(mockFullPath);
      mockFs.readFileSync.mockReturnValue(mockBuffer);
      mockGetPlaiceholder.mockResolvedValue({ base64: mockBase64 } as any);

      await getBlurLocalImg(mockImagePath);

      expect(mockPath.join).toHaveBeenCalledWith(process.cwd(), 'public', mockImagePath);
    });
  });
});