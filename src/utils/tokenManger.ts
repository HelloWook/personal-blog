import { cookies } from 'next/headers';

export type Theme = 'synthwave' | 'pastel';

/**
 * 테마 관리 유틸리티
 * - getTheme: 쿠키에서 테마를 가져옴. 기본값은 'pastel'
 * - setTheme: 테마를 쿠키에 저장하고, document의 data-theme 속성을 업데이트
 */
export const themeManager = async () => {
  const cookieStore = await cookies();

  const getTheme = (): Theme => {
    const theme = (cookieStore.get('theme')?.value || 'pastel') as Theme;
    return theme;
  };

  const setTheme = (theme: Theme) => {
    cookieStore.set('theme', theme);
  };

  return { getTheme, setTheme };
};
