import { NextRequest, NextResponse } from 'next/server';
import { themeManager } from '@/util/tokenManger';

export async function POST(request: NextRequest) {
  try {
    const res = await request.json();
    if (!res.theme) {
      return NextResponse.json({ error: '테마가 존재 하지 않습니다.' }, { status: 400 });
    }

    const { setTheme } = await themeManager();

    await setTheme(res.theme);

    return NextResponse.json({ message: 'ok' });
  } catch {
    return NextResponse.json({ error: '서버 에러 발생' }, { status: 500 });
  }
}
