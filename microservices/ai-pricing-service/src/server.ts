// microservices/ai-pricing-service/src/server.ts
import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const PORT = process.env.PORT || 50061;

app.use(bodyParser.json());

// Mock ML Model: Fiyat Tahmini
// Talep (0-100), Stok (adet), Sezon (katsayı 0.8 - 1.2), Rakip Fiyatı
function predictOptimalPrice(basePrice: number, demandScore: number, stock: number, seasonality: number, competitorPrice: number) {
  // Basit bir regresyon mantığı simülasyonu
  let priceFactor = 1.0;

  // Talep etkisi
  if (demandScore > 80) priceFactor += 0.15;
  else if (demandScore < 20) priceFactor -= 0.10;

  // Stok etkisi (Kıtlık prensibi)
  if (stock < 10) priceFactor += 0.10;
  else if (stock > 1000) priceFactor -= 0.05;

  // Sezon etkisi
  priceFactor *= seasonality;

  // Rakip analizi (Rekabetçi kalmak için)
  let estimatedPrice = basePrice * priceFactor;
  
  // Rakip fiyatından çok yüksekse biraz düşür
  if (estimatedPrice > competitorPrice * 1.2) {
    estimatedPrice = competitorPrice * 1.15;
  }

  return Math.round(estimatedPrice * 100) / 100;
}

app.post('/predict', (req, res) => {
  const { productId, basePrice, demandScore, stock, seasonality, competitorPrice } = req.body;

  // Model inference simülasyonu (gecikme)
  setTimeout(() => {
    const recommendedPrice = predictOptimalPrice(basePrice, demandScore, stock, seasonality, competitorPrice);
    
    res.json({
      productId,
      currentPrice: basePrice,
      recommendedPrice,
      confidenceScore: 0.92, // Model güven skoru
      factors: {
        demandImpact: demandScore > 50 ? 'High' : 'Low',
        stockLevel: stock < 20 ? 'Critical' : 'Healthy'
      }
    });
  }, 500);
});

app.listen(PORT, () => {
  console.log(`AI Pricing Service running on port ${PORT}`);
});
