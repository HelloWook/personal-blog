import { throttlingAsync } from './throttling';

describe('throttlingAsync', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  it('여러 번 호출해도 마지막 호출만 실행된다', async () => {
    const callback = jest.fn().mockResolvedValue(undefined);
    const throttled = throttlingAsync(300);

    // 두 번 연속 호출
    throttled(callback);
    throttled(callback);

    // 아직 시간 안 갔으니 실행 X
    expect(callback).not.toHaveBeenCalled();

    // 299ms까진 실행 안 됨
    jest.advanceTimersByTime(299);
    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(1);

    await Promise.resolve();

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('지정된 시간 내에 재호출되면 이전 호출은 취소된다', async () => {
    const callback = jest.fn().mockResolvedValue(undefined);
    const throttled = throttlingAsync(300);

    throttled(callback);
    jest.advanceTimersByTime(200);
    throttled(callback);

    jest.advanceTimersByTime(100);

    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(300);
    await Promise.resolve();

    expect(callback).toHaveBeenCalledTimes(1);
  });
});
