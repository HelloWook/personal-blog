import { NextRequest, NextResponse } from 'next/server';
import { themeManager } from '@/util/tokenManger';

export async function POST(request: NextRequest) {
  try {
    const res = await request.json();

    const { setTheme } = await themeManager();

    console.log('Received theme:', res.theme);
    await setTheme(res.theme);

    return NextResponse.json({ message: 'ok' });
  } catch (error) {
    console.error('에러 발생 :', error);
    return NextResponse.json({ error: '서버 에러 발생' }, { status: 500 });
  }
}
