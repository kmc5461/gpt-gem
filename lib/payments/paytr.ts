// lib/payments/paytr.ts
import crypto from 'crypto';

// PayTR iFrame API iskeleti

export const paytrConfig = {
  merchantId: process.env.PAYTR_MERCHANT_ID,
  merchantKey: process.env.PAYTR_MERCHANT_KEY,
  merchantSalt: process.env.PAYTR_MERCHANT_SALT,
  noInstallment: 0, // Taksit yok
  maxInstallment: 0,
  debugOn: 1,
  timeoutLimit: 30,
  testMode: 1,
};

export const paytr = {
  generateToken: async (userIp: string, orderId: string, email: string, paymentAmount: number, basket: any[]) => {
    // Token oluşturma mantığı
    // Hash hesaplama (merchant_id + user_ip + merchant_oid + email + payment_amount + payment_type + installment_count + currency + test_mode + merchant_salt)
    
    const mockToken = crypto.randomBytes(16).toString('hex');
    
    return {
      status: 'success',
      token: mockToken,
      iframeUrl: `https://www.paytr.com/odeme/guvenli/${mockToken}`
    };
  }
};