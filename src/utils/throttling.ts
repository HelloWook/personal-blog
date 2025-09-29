/**
 * 쓰트롤링 함수 (비동기)
 * @param time 밀리초
 * @returns  콜백 함수 반환
 */

export const throttlingAsync = (time: number) => {
  let timeoutId: NodeJS.Timeout;

  return (callback: () => Promise<void>): Promise<void> => {
    clearTimeout(timeoutId);

    return new Promise((resolve) => {
      timeoutId = setTimeout(async () => {
        try {
          await callback();
          resolve();
        } catch (error) {
          console.error('Error occurred while debouncing:', error);
          resolve();
        }
      }, time);
    });
  };
};
