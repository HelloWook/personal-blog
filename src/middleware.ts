import { themeManager } from './util/tokenManger';
import { NextResponse } from 'next/server';

export async function middleware() {
  const theme = (await themeManager()).getTheme();

  const res = NextResponse.next();
  res.headers.set('x-theme', theme);
  return res;
}
