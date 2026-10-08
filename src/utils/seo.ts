import { routing } from '@/i18n/routing';

export const SITE_URL = 'https://hellowook.is-a.dev';

// og:locale 표기 (BCP 47 locale → OpenGraph locale)
export const OG_LOCALE: Record<string, string> = {
  ko: 'ko_KR',
  en: 'en_US',
};

export const OG_IMAGE = {
  url: '/알밤.png',
  width: 433,
  height: 577,
};

/**
 * canonical + hreflang 묶음을 만든다.
 * metadataBase가 설정돼 있어 상대 경로로 둔다.
 * @param locale 현재 로케일
 * @param path 로케일을 제외한 경로 (예: 'posts/good-dialog'). 홈이면 생략.
 */
export const buildAlternates = (locale: string, path: string = '') => {
  const suffix = path ? `/${path.replace(/^\/+/, '')}` : '';

  return {
    canonical: `/${locale}${suffix}`,
    languages: {
      ...Object.fromEntries(routing.locales.map((candidate) => [candidate, `/${candidate}${suffix}`])),
      'x-default': `/${routing.defaultLocale}${suffix}`,
    },
  };
};
