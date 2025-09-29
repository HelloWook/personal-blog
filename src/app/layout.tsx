import Footer from '@/components/Footer/Footer';
import suite from '../utils/suite';
import '../styles/global.css';
import Header from '@/components/Header/Header';
import Drawer from '@/components/Drawer/Drawer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'HelloWook 블로그',
    template: '%s | HelloWook 블로그',
  },
  description: 'HelloWook의 개인 블로그입니다. 프론트엔드 개발과 기술에 대한 글을 공유합니다.',
  keywords: ['블로그', 'HelloWook', '프론트엔드', 'next', 'react', 'ts', '개발', '기술'],
  authors: [{ name: 'HelloWook' }],
  creator: 'HelloWook',
  publisher: 'HelloWook',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://www.hellowook.com'),
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: 'https://www.hellowook.com',
    title: 'HelloWook 블로그',
    description: 'HelloWook의 개인 블로그입니다. 프론트엔드 개발과 기술에 대한 글을 공유합니다.',
    siteName: 'HelloWook 블로그',
    images: [
      {
        url: '/알밤.png',
        width: 1200,
        height: 630,
        alt: 'HelloWook 블로그',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default async function RootLayouta({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko' className={suite.className} suppressHydrationWarning>
      <head>
        <script async src='https://www.googletagmanager.com/gtag/js?id=G-C8K55X4T6Z'></script>
        <script>
          {`  window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'G-C8K55X4T6Z');`}
        </script>
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
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'HelloWook',
              description: '프론트엔드 개발자',
              url: 'https://hellowook.dev',
              sameAs: ['https://github.com/HelloWook'],
              knowsAbout: ['Frontend Development', 'React', 'Next.js', 'TypeScript', 'JavaScript'],
            }),
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
