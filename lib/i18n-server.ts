// /lib/i18n-server.ts

import { Locale, i18n } from "@/lib/i18n";

/**
 * Sunucu tarafında dictionary (çeviri dosyalarını) dinamik import eder
 */
export async function getDictionary(locale: Locale) {
  try {
    const dict = await import(`@/dictionaries/${locale}.json`);
    return dict.default;
  } catch (error) {
    console.error("Dictionary load error:", error);
    const fallback = await import(`@/dictionaries/${i18n.defaultLocale}.json`);
    return fallback.default;
  }
}
