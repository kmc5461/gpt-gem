// İstemci tarafında da güvenle import edilebilecek temel tanımlar
// Burada cookie veya header erişimi YOKTUR.

export const i18n = {
  defaultLocale: 'tr',
  locales: ['tr', 'en'],
} as const;

export type Locale = (typeof i18n)['locales'][number];

// JSON dosyalarını dinamik olarak import eden sözlük yükleyicisi
const dictionaries = {
  tr: () => import('@/locales/tr.json').then((module) => module.default),
  en: () => import('@/locales/en.json').then((module) => module.default),
};

export const getDictionary = async (locale: Locale) => {
  // Eğer geçersiz bir locale gelirse varsayılana dön
  const validLocale = i18n.locales.includes(locale) ? locale : i18n.defaultLocale;
  return dictionaries[validLocale]();
};