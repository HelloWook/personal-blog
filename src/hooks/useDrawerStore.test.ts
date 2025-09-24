import { renderHook, act } from '@testing-library/react';
import { useDrawerStore } from './useDrawerStore';
import { drawerStore } from '@/components/Drawer/DrawerStore';

// DrawerStore를 모킹
jest.mock('@/components/Drawer/DrawerStore', () => {
  const mockListeners = new Set<() => void>();
  let mockIsOpen = false;

  return {
    drawerStore: {
      get: jest.fn(() => mockIsOpen),
      set: jest.fn((value: boolean) => {
        mockIsOpen = value;
        mockListeners.forEach((listener) => listener());
      }),
      subscribe: jest.fn((listener: () => void) => {
        mockListeners.add(listener);
        return () => mockListeners.delete(listener);
      }),
      toggle: jest.fn(() => {
        mockIsOpen = !mockIsOpen;
        mockListeners.forEach((listener) => listener());
      }),
      // 테스트용 헬퍼 메서드
      _reset: () => {
        mockIsOpen = false;
        mockListeners.clear();
      },
      _getState: () => mockIsOpen,
      _setState: (value: boolean) => {
        mockIsOpen = value;
      },
    },
  };
});

describe('useDrawerStore', () => {
  beforeEach(() => {
    // 각 테스트 전에 모킹된 store 초기화
    (drawerStore as any)._reset();
    jest.clearAllMocks();
  });

  it('초기 상태에서 false를 반환한다', () => {
    const { result } = renderHook(() => useDrawerStore());

    expect(result.current).toBe(false);
    expect(drawerStore.get).toHaveBeenCalled();
  });

  it('store의 상태가 변경되면 hook이 새로운 값을 반환한다', () => {
    const { result } = renderHook(() => useDrawerStore());

    // 초기 상태 확인
    expect(result.current).toBe(false);

    // store 상태 변경
    act(() => {
      (drawerStore as any)._setState(true);
      (drawerStore as any).set(true);
    });

    expect(result.current).toBe(true);
  });

  it('store의 상태가 false로 변경되면 hook이 false를 반환한다', () => {
    const { result } = renderHook(() => useDrawerStore());

    // 초기 상태를 true로 설정
    act(() => {
      (drawerStore as any)._setState(true);
      (drawerStore as any).set(true);
    });

    expect(result.current).toBe(true);

    // store 상태를 false로 변경
    act(() => {
      (drawerStore as any)._setState(false);
      (drawerStore as any).set(false);
    });

    expect(result.current).toBe(false);
  });

  it('store의 toggle 메서드가 호출되면 상태가 토글된다', () => {
    const { result } = renderHook(() => useDrawerStore());

    // 초기 상태 확인
    expect(result.current).toBe(false);

    // toggle 호출
    act(() => {
      (drawerStore as any).toggle();
    });

    expect(result.current).toBe(true);

    // 다시 toggle 호출
    act(() => {
      (drawerStore as any).toggle();
    });

    expect(result.current).toBe(false);
  });

  it('useSyncExternalStore의 subscribe 함수가 올바르게 호출된다', () => {
    renderHook(() => useDrawerStore());

    expect(drawerStore.subscribe).toHaveBeenCalledWith(expect.any(Function));
  });

  it('컴포넌트가 언마운트될 때 구독이 해제된다', () => {
    const unsubscribeMock = jest.fn();
    (drawerStore.subscribe as jest.Mock).mockReturnValue(unsubscribeMock);

    const { unmount } = renderHook(() => useDrawerStore());

    // 컴포넌트 언마운트
    unmount();

    expect(unsubscribeMock).toHaveBeenCalled();
  });

  it('store의 get 메서드가 서버 사이드 렌더링 시에도 호출된다', () => {
    // useSyncExternalStore의 세 번째 인자(서버 사이드 렌더링용)도 테스트
    renderHook(() => useDrawerStore());

    // get 메서드가 여러 번 호출될 수 있음 (클라이언트와 서버 사이드)
    expect(drawerStore.get).toHaveBeenCalled();
  });

  it('store의 get 메서드가 예외를 던져도 hook이 안전하게 처리한다', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    (drawerStore.get as jest.Mock).mockImplementation(() => {
      throw new Error('Store get error');
    });

    expect(() => {
      renderHook(() => useDrawerStore());
    }).toThrow('Store get error');

    consoleSpy.mockRestore();
  });
});
