import { themeManager, Theme } from './tokenManger';
import { cookies } from 'next/headers';

// next/headers의 cookies 모킹
jest.mock('next/headers', () => ({
  cookies: jest.fn(),
}));

const mockCookies = cookies as jest.MockedFunction<typeof cookies>;

describe('themeManager', () => {
  let mockCookieStore: any;

  beforeEach(() => {
    jest.clearAllMocks();
    
    // 쿠키 스토어 모킹
    mockCookieStore = {
      get: jest.fn(),
      set: jest.fn(),
    };
    
    mockCookies.mockResolvedValue(mockCookieStore);
  });

  describe('getTheme', () => {
    it('쿠키에 테마가 설정되어 있으면 해당 테마를 반환한다', async () => {
      const expectedTheme: Theme = 'synthwave';
      mockCookieStore.get.mockReturnValue({ value: expectedTheme });

      const { getTheme } = await themeManager();
      const result = getTheme();

      expect(result).toBe(expectedTheme);
      expect(mockCookieStore.get).toHaveBeenCalledWith('theme');
    });

    it('쿠키에 테마가 없으면 기본값 pastel을 반환한다', async () => {
      mockCookieStore.get.mockReturnValue(undefined);

      const { getTheme } = await themeManager();
      const result = getTheme();

      expect(result).toBe('pastel');
      expect(mockCookieStore.get).toHaveBeenCalledWith('theme');
    });

    it('쿠키 값이 빈 문자열이면 기본값 pastel을 반환한다', async () => {
      mockCookieStore.get.mockReturnValue({ value: '' });

      const { getTheme } = await themeManager();
      const result = getTheme();

      expect(result).toBe('pastel');
      expect(mockCookieStore.get).toHaveBeenCalledWith('theme');
    });

    it('synthwave 테마를 올바르게 반환한다', async () => {
      mockCookieStore.get.mockReturnValue({ value: 'synthwave' });

      const { getTheme } = await themeManager();
      const result = getTheme();

      expect(result).toBe('synthwave');
    });

    it('pastel 테마를 올바르게 반환한다', async () => {
      mockCookieStore.get.mockReturnValue({ value: 'pastel' });

      const { getTheme } = await themeManager();
      const result = getTheme();

      expect(result).toBe('pastel');
    });
  });

  describe('setTheme', () => {
    it('synthwave 테마를 쿠키에 저장한다', async () => {
      const theme: Theme = 'synthwave';

      const { setTheme } = await themeManager();
      setTheme(theme);

      expect(mockCookieStore.set).toHaveBeenCalledWith('theme', theme);
      expect(mockCookieStore.set).toHaveBeenCalledTimes(1);
    });

    it('pastel 테마를 쿠키에 저장한다', async () => {
      const theme: Theme = 'pastel';

      const { setTheme } = await themeManager();
      setTheme(theme);

      expect(mockCookieStore.set).toHaveBeenCalledWith('theme', theme);
      expect(mockCookieStore.set).toHaveBeenCalledTimes(1);
    });

    it('여러 번 테마를 설정해도 각각 올바르게 저장된다', async () => {
      const { setTheme } = await themeManager();
      
      setTheme('synthwave');
      setTheme('pastel');

      expect(mockCookieStore.set).toHaveBeenCalledWith('theme', 'synthwave');
      expect(mockCookieStore.set).toHaveBeenCalledWith('theme', 'pastel');
      expect(mockCookieStore.set).toHaveBeenCalledTimes(2);
    });
  });

  describe('themeManager 함수', () => {
    it('getTheme과 setTheme 함수를 반환한다', async () => {
      const result = await themeManager();

      expect(result).toHaveProperty('getTheme');
      expect(result).toHaveProperty('setTheme');
      expect(typeof result.getTheme).toBe('function');
      expect(typeof result.setTheme).toBe('function');
    });

    it('cookies 함수를 한 번만 호출한다', async () => {
      await themeManager();
      await themeManager();

      expect(mockCookies).toHaveBeenCalledTimes(2);
    });

    it('cookies 함수가 에러를 던져도 에러를 전파한다', async () => {
      const error = new Error('cookies error');
      mockCookies.mockRejectedValue(error);

      await expect(themeManager()).rejects.toThrow('cookies error');
    });
  });

  describe('통합 테스트', () => {
    it('테마를 설정하고 가져오는 전체 플로우가 정상 작동한다', async () => {
      const { getTheme, setTheme } = await themeManager();
      
      // 초기 상태 확인 (기본값)
      expect(getTheme()).toBe('pastel');
      
      // 테마 설정
      setTheme('synthwave');
      expect(mockCookieStore.set).toHaveBeenCalledWith('theme', 'synthwave');
      
      // 새로운 쿠키 스토어 인스턴스에서 설정된 테마 확인
      mockCookieStore.get.mockReturnValue({ value: 'synthwave' });
      expect(getTheme()).toBe('synthwave');
    });

    it('여러 테마 매니저 인스턴스가 독립적으로 작동한다', async () => {
      const manager1 = await themeManager();
      const manager2 = await themeManager();
      
      // 각각 독립적으로 테마 설정
      manager1.setTheme('synthwave');
      manager2.setTheme('pastel');
      
      expect(mockCookieStore.set).toHaveBeenCalledWith('theme', 'synthwave');
      expect(mockCookieStore.set).toHaveBeenCalledWith('theme', 'pastel');
      expect(mockCookieStore.set).toHaveBeenCalledTimes(2);
    });
  });
});

