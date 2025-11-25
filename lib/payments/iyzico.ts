// lib/payments/iyzico.ts

// Iyzico (iyzipay) için örnek wrapper iskeleti
// Gerçek entegrasyonda 'iyzipay' npm paketi kullanılır.

export const iyzicoConfig = {
  apiKey: process.env.IYZICO_API_KEY,
  secretKey: process.env.IYZICO_SECRET_KEY,
  baseUrl: process.env.IYZICO_BASE_URL || 'https://sandbox-api.iyzipay.com',
};

export const iyzico = {
  initialize: () => {
    // İyzipay instance başlatma
    console.log('Iyzico initialized with', iyzicoConfig.apiKey);
  },
  
  startPaymentProcess: async (orderData: any) => {
    // Mock response: Gerçekte Iyzico API'ye istek atılır ve checkoutFormContent döner
    return {
      status: 'success',
      paymentPageUrl: 'https://sandbox-payment.iyzipay.com/mock-checkout',
      token: 'mock_iyzico_token_' + Date.now()
    };
  }
};