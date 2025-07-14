import { renderHook, act } from '@testing-library/react';
import useTheme from './useTheme';

describe('useTheme', () => {
  it('기본 테마가 pastel이다.', () => {
    const { result } = renderHook(() => useTheme());
    expect(result.current.theme).toBe('pastel');
  });

  it('테마 변경 함수가 올바르게 작동한다.', () => {
    const { result } = renderHook(() => useTheme());
    act(() => {
      result.current.handleThemeChange();
    });
    expect(result.current.theme).toBe('synthwave');
  });
});
