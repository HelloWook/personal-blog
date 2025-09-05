import Footer from '@/components/Footer/Footer';
import suite from '../util/suite';
import '../styles/global.css';
import Header from '@/components/Header/Header';
import Drawer from '@/components/Drawer/Drawer';
import { Metadata } from 'next';
import { headers } from 'next/headers';

export const metadata: Metadata = {
  title: 'HelloWook 블로그',
  description: 'HelloWook의 개인 블로그입니다.',
  keywords: ['블로그', 'HelloWook', '프론트엔드', 'next', 'react', 'ts'],
};

export default async function RootLayouta({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const h = await headers();
  const theme = h.get('x-theme') ?? 'pastel';

  return (
    <html lang='ko' data-theme={theme} className={suite.className}>
      <body>
        <Drawer />
        <div className='max-w-[900px] w-[90%] min-h-screen m-auto'>
          <Header />
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
