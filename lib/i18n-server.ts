// Sunucu tarafında çalışan ve cookie okuyan fonksiyonlar
import { cookies } from 'next/headers';
import { Locale, i18n } from '@/lib/i18n';

const COOKIE_NAME = 'lang';

export async function getLocale(): Promise<Locale> {
  const cookieStore = cookies();
  const lang = cookieStore.get(COOKIE_NAME)?.value;

  // Cookie'deki dil geçerli mi kontrol et, değilse varsayılanı dön
  if (lang && i18n.locales.includes(lang as Locale)) {
    return lang as Locale;
  }

  return i18n.defaultLocale;
}