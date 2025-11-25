// lib/auth/2fa.ts
import { authenticator } from 'otplib';
import qrcode from 'qrcode';

// Servis adı Google Authenticator uygulamasında görünecek
const SERVICE_NAME = 'Archetype Enterprise';

/**
 * Yeni bir 2FA secret oluşturur.
 * Kullanıcıya QR kod göstermek için kullanılır.
 */
export async function generateTwoFactorSecret(userEmail: string) {
  const secret = authenticator.generateSecret();
  const otpauth = authenticator.keyuri(userEmail, SERVICE_NAME, secret);
  
  const qrCodeUrl = await qrcode.toDataURL(otpauth);

  return {
    secret,
    qrCodeUrl
  };
}

/**
 * Kullanıcının girdiği token'ı doğrular.
 */
export function verifyTwoFactorToken(token: string, secret: string): boolean {
  // Token 6 haneli olmalı
  if (!token || token.length !== 6) return false;

  try {
    return authenticator.verify({ token, secret });
  } catch (error) {
    console.error('2FA Verify Error:', error);
    return false;
  }
}

/**
 * (Opsiyonel) Recovery kodları üretir
 */
export function generateRecoveryCodes(count: number = 8): string[] {
  const codes = [];
  for (let i = 0; i < count; i++) {
    // Basit random string, production'da crypto.randomBytes kullanılması önerilir
    codes.push(Math.random().toString(36).substr(2, 10).toUpperCase());
  }
  return codes;
}
