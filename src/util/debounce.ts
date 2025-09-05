export const debounceAsync = (time: number) => {
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
