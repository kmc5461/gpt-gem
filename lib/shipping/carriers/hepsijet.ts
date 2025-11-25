// lib/shipping/carriers/hepsijet.ts

export const hepsijetConfig = {
  apiKey: process.env.HEPSIJET_API_KEY,
  apiSecret: process.env.HEPSIJET_SECRET,
  baseUrl: 'https://api.hepsijet.com'
};

export const hepsijet = {
  calculatePrice: async (desi: number, city: string) => {
    // Hepsijet genellikle sabit veya kontratlı fiyat sunar
    return 35 + (desi * 3);
  },

  createShipment: async (orderData: any) => {
    return {
      success: true,
      trackingNumber: `HJ${Math.floor(Math.random() * 1000000000)}`,
      barcode: `BARCODE-${Math.random().toString(36).substring(7)}`
    };
  },

  trackShipment: async (trackingNumber: string) => {
    return {
      status: 'OUT_FOR_DELIVERY',
      description: 'Dağıtıma çıkarıldı',
      lastUpdate: new Date().toISOString(),
      carrier: 'HepsiJet'
    };
  },

  createReturnLabel: async (orderId: string) => {
    return {
      returnCode: `HJ-IADE-${Math.floor(Math.random() * 9999)}`,
      pickupDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
    };
  }
};
