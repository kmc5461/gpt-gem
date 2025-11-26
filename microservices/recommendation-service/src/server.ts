// microservices/recommendation-service/src/server.ts
import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const PORT = process.env.PORT || 50062;

app.use(bodyParser.json());

// Mock Data: Ürün Matrisi
const PRODUCT_VECTORS: Record<string, number[]> = {
  'prod_1': [0.1, 0.9, 0.3], // [Kategori, Fiyat, Stil]
  'prod_2': [0.1, 0.8, 0.4],
  'prod_3': [0.9, 0.2, 0.1],
};

// Mock ML Model: Collaborative Filtering
function getCollaborativeRecommendations(userId: string, history: string[]) {
  // Kullanıcı geçmişine benzer ürünleri bul (Mock)
  // Gerçekte matris faktörizasyonu veya NN kullanılır
  return [
    { id: 'prod_55', score: 0.98, reason: 'Similar to items you viewed' },
    { id: 'prod_89', score: 0.85, reason: 'Bought together frequently' },
    { id: 'prod_12', score: 0.76, reason: 'Trending in your area' },
  ];
}

app.post('/recommend/user', (req, res) => {
  const { userId, viewHistory } = req.body;
  const recommendations = getCollaborativeRecommendations(userId, viewHistory);
  res.json({ userId, recommendations });
});

app.post('/recommend/product', (req, res) => {
  const { productId } = req.body;
  // Item-to-item benzerlik
  res.json({
    baseProduct: productId,
    similarProducts: [
      { id: 'prod_2', score: 0.95 },
      { id: 'prod_7', score: 0.88 }
    ]
  });
});

app.listen(PORT, () => {
  console.log(`Recommendation Engine running on port ${PORT}`);
});
