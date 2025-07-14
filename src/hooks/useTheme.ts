'use client';
import { useEffect, useState } from 'react';
type Theme = 'synthwave' | 'pastel';

const useTheme = () => {
  const [theme, setTheme] = useState<Theme>('pastel');

  const handleThemeChange = () => {
    const getTheme = (current: Theme) => (current === 'synthwave' ? 'pastel' : 'synthwave');
    setTheme(getTheme(theme));
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return { theme, handleThemeChange };
};

export default useTheme;
