'use client';
import { getLocalStorage } from '@/util/getLocalStorage';
import { useEffect, useState } from 'react';
type Theme = 'synthwave' | 'pastel';

const useTheme = () => {
  const [theme, setTheme] = useState<Theme>('pastel');

  const handleThemeChange = () => {
    const getTheme = (current: Theme) => (current === 'synthwave' ? 'pastel' : 'synthwave');
    setTheme(getTheme(theme));
    localStorage.setItem('theme', getTheme(theme));
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    const initTheme = getLocalStorage('theme') as Theme | null;
    setTheme(initTheme || 'pastel');
  }, [theme]);

  return { theme, handleThemeChange };
};

export default useTheme;
