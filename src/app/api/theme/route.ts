import { NextRequest, NextResponse } from 'next/server';
import { themeManager } from '@/util/tokenManger';

export async function POST(request: NextRequest) {
  try {
    const res = await request.json();
    const { setTheme } = await themeManager();

    await setTheme(res.theme);

    return NextResponse.json({ message: 'ok' });
  } catch (error) {
    console.error('Error in theme API:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
