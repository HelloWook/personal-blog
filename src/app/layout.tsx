import Footer from '@/components/Footer/Footer';
import suite from '../util/suite';
import '../styles/global.css';
import Header from '@/components/Header/Header';
import Drawer from '@/components/Drawer/Drawer';
import { Metadata } from 'next';
// Theme is now applied via localStorage early script; no headers needed

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
  return (
    <html lang='ko' className={suite.className} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
             function getCookie(name) {
              const match = document.cookie.match(
                new RegExp('(?:^|; )' + name + '=([^;]*)')
              );
              return match ? decodeURIComponent(match[1]) : null;
            }
            (function(){
                  const t = getCookie('theme') ;
                  console.log('Initial theme:', t);
                    var theme = t === 'synthwave' ? 'synthwave' : 'pastel';
                    var el = document.documentElement;
                    el.setAttribute('data-theme', theme);
            })();
            `,
          }}
        />
      </head>
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
