export const getLocalStorage = (key: string) => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(key);
};
