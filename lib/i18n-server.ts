// /lib/i18n-server.ts

import { Locale, i18n } from "@/lib/i18n";

// JSON dictionary'leri statik import — Vercel için en stabil yöntem
import tr from "@/dictionaries/tr.json";
import en from "@/dictionaries/en.json";

const dictionaries: Record<Locale, any> = {
  tr: tr,
  en: en,
};

export async function getDictionary(locale: Locale) {
  // geçersiz dil gelirse fallback
  if (!i18n.locales.includes(locale)) {
    return dictionaries[i18n.defaultLocale];
  }

  return dictionaries[locale];
}
