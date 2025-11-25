'use server';

import { cookies } from 'next/headers';
import { Locale } from '@/lib/i18n';

const COOKIE_NAME = 'lang';
const ONE_YEAR = 365 * 24 * 60 * 60 * 1000;

export async function setLocaleCookie(locale: Locale) {
  // Güvenli cookie ayarları
  cookies().set(COOKIE_NAME, locale, {
    httpOnly: false, // Client tarafında okunabilmesi gerekebilir (opsiyonel)
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: ONE_YEAR,
    path: '/',
  });
}