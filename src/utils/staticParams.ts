import { routing } from '@/i18n/routing';

export function getStaticLocaleParams() {
  return routing.locales.map((locale) => ({ locale }));
}
