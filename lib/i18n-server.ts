// /lib/i18n-server.ts

import { cookies } from "next/headers";
import { Locale, i18n } from "@/lib/i18n";

// Statik JSON import — Vercel için ideal
import tr from "@/dictionaries/tr.json";
import en from "@/dictionaries/en.json";

const dictionaries: Record<Locale, any> = {
  tr: tr,
  en: en,
};

/**
 * Dictionary yükleme
 */
export async function getDictionary(locale: Locale) {
  if (!i18n.locales.includes(locale)) {
    return dictionaries[i18n.defaultLocale];
  }
  return dictionaries[locale];
}

/**
 * Cookie'den dil okuyan fonksiyon
 * categories/[slug]/page.tsx içinde kullanılan fonksiyon bu
 */
export function getLocale(): Locale {
  const store = cookies();
  const cookieLocale = store.get("lang")?.value;

  if (cookieLocale && i18n.locales.includes(cookieLocale as Locale)) {
    return cookieLocale as Locale;
  }

  return i18n.defaultLocale;
}
