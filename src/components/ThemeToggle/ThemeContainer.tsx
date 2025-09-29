import React from 'react';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import { themeManager } from '@/utils/tokenManger';

const ThemeContainer = async () => {
  const theme = await themeManager().then((manager) => manager.getTheme());

  return (
    <>
      <ThemeToggle defaultTheme={theme} />
    </>
  );
};

export default ThemeContainer;
