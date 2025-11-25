// lib/shipping/carriers/mng.ts

export const mngConfig = {
  customerId: process.env.MNG_CUSTOMER_ID,
  password: process.env.MNG_PASSWORD,
  baseUrl: 'https://service.mngkargo.com.tr/tservis/musterikargosiparis.asmx'
};

export const mng = {
  calculatePrice: async (desi: number, city: string) => {
    const basePrice = 40;
    return basePrice + (desi * 4.5);
  },

  createShipment: async (orderData: any) => {
    return {
      success: true,
      trackingNumber: `MNG${Math.floor(Math.random() * 1000000000)}`,
      labelUrl: 'https://mngkargo.com/mock-label.pdf'
    };
  },

  trackShipment: async (trackingNumber: string) => {
    return {
      status: 'DELIVERED',
      description: 'Teslim edildi',
      lastUpdate: new Date().toISOString(),
      carrier: 'MNG Kargo'
    };
  },

  createReturnLabel: async (orderId: string) => {
    return {
      returnCode: `MNG-RET-${Math.floor(Math.random() * 100000)}`,
      validUntil: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString()
    };
  }
};