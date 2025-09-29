import { getLocalStorage } from './getLocalStorage';

// localStorage 모킹
const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};

// window 객체 모킹
Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
});

describe('getLocalStorage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // window 객체가 정의되어 있음을 보장
    Object.defineProperty(window, 'localStorage', {
      value: mockLocalStorage,
      writable: true,
    });
  });

  afterEach(() => {
    // 테스트 후 localStorage 모킹 초기화
    jest.clearAllMocks();
  });

  it('클라이언트 사이드에서 localStorage에 값이 있을 때 해당 값을 반환한다', () => {
    const testKey = 'test-key';
    const testValue = 'test-value';

    mockLocalStorage.getItem.mockReturnValue(testValue);

    const result = getLocalStorage(testKey);

    expect(result).toBe(testValue);
    expect(mockLocalStorage.getItem).toHaveBeenCalledWith(testKey);
    expect(mockLocalStorage.getItem).toHaveBeenCalledTimes(1);
  });

  it('클라이언트 사이드에서 localStorage에 값이 없을 때 null을 반환한다', () => {
    const testKey = 'non-existent-key';

    mockLocalStorage.getItem.mockReturnValue(null);

    const result = getLocalStorage(testKey);

    expect(result).toBeNull();
    expect(mockLocalStorage.getItem).toHaveBeenCalledWith(testKey);
    expect(mockLocalStorage.getItem).toHaveBeenCalledTimes(1);
  });

  it('빈 문자열 키로 호출해도 정상적으로 작동한다', () => {
    const testValue = 'empty-key-value';

    mockLocalStorage.getItem.mockReturnValue(testValue);

    const result = getLocalStorage('');

    expect(result).toBe(testValue);
    expect(mockLocalStorage.getItem).toHaveBeenCalledWith('');
  });

  it('특수 문자가 포함된 키로 호출해도 정상적으로 작동한다', () => {
    const testKey = 'key-with-special-chars!@#$%^&*()';
    const testValue = 'special-key-value';

    mockLocalStorage.getItem.mockReturnValue(testValue);

    const result = getLocalStorage(testKey);

    expect(result).toBe(testValue);
    expect(mockLocalStorage.getItem).toHaveBeenCalledWith(testKey);
  });

  it('localStorage.getItem이 에러를 던져도 에러를 전파한다', () => {
    const testKey = 'error-key';
    const error = new Error('localStorage error');

    mockLocalStorage.getItem.mockImplementation(() => {
      throw error;
    });

    expect(() => getLocalStorage(testKey)).toThrow('localStorage error');
    expect(mockLocalStorage.getItem).toHaveBeenCalledWith(testKey);
  });

  it('여러 번 호출해도 각각 올바르게 작동한다', () => {
    const key1 = 'key1';
    const key2 = 'key2';
    const value1 = 'value1';
    const value2 = 'value2';

    mockLocalStorage.getItem.mockReturnValueOnce(value1).mockReturnValueOnce(value2);

    const result1 = getLocalStorage(key1);
    const result2 = getLocalStorage(key2);

    expect(result1).toBe(value1);
    expect(result2).toBe(value2);
    expect(mockLocalStorage.getItem).toHaveBeenCalledWith(key1);
    expect(mockLocalStorage.getItem).toHaveBeenCalledWith(key2);
    expect(mockLocalStorage.getItem).toHaveBeenCalledTimes(2);
  });
});
