import Footer from '@/components/Footer/Footer';
import suite from '../../utils/suite';
import '@/styles/global.css';
import Header from '@/components/Header/Header';
import Drawer from '@/components/Drawer/Drawer';
import { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { SITE_URL, OG_LOCALE, OG_IMAGE, buildAlternates } from '@/utils/seo';
import { Suspense } from 'react';
import NavigationProgress from '@/components/NavigationProgress/NavigationProgress';
import ScrollToTop from '@/components/ScrollToTop/ScrollToTop';

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Pick<LocaleLayoutProps, 'params'>): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Meta' });

  const siteName = t('siteName');
  const title = t('title');
  const description = t('description');

  return {
    title: {
      default: title,
      template: `%s | ${siteName}`,
    },
    description,
    keywords: t('keywords')
      .split(',')
      .map((keyword) => keyword.trim()),
    authors: [{ name: 'HelloWook' }],
    creator: 'HelloWook',
    publisher: 'HelloWook',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(SITE_URL),
    alternates: buildAlternates(locale),
    icons: {
      icon: '/favicon.ico',
      shortcut: '/favicon.ico',
      apple: '/favicon.ico',
    },
    openGraph: {
      type: 'website',
      locale: OG_LOCALE[locale],
      url: `/${locale}`,
      title,
      description,
      siteName,
      images: [
        {
          url: OG_IMAGE.url,
          width: OG_IMAGE.width,
          height: OG_IMAGE.height,
          alt: siteName,
        },
      ],
    },
    twitter: {
      // 사이트 대표 이미지가 세로형(433x577)이라 큰 카드 대신 요약 카드를 쓴다
      card: 'summary',
      title,
      description,
      images: [OG_IMAGE.url],
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
}

export default async function RootLayouta({ children, params }: Readonly<LocaleLayoutProps>) {
  const { locale } = await params;

  return (
    <html lang={locale} className={suite.className} suppressHydrationWarning>
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
              url: SITE_URL,
              sameAs: ['https://github.com/HelloWook'],
              knowsAbout: ['Frontend Development', 'React', 'Next.js', 'TypeScript', 'JavaScript'],
            }),
          }}
        />
      </head>
      <body>
        <NavigationProgress />
        <ScrollToTop />
        <Suspense>
          <NextIntlClientProvider>
            <Drawer />
            <div className='max-w-[900px] w-[90%] min-h-screen m-auto'>
              <Header />
              {children}
            </div>
            <Footer />
          </NextIntlClientProvider>
        </Suspense>
      </body>
    </html>
  );
}
