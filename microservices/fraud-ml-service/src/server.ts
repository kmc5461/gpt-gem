// microservices/fraud-ml-service/src/server.ts
import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const PORT = process.env.PORT || 50063;

app.use(bodyParser.json());

// Mock ML Model: Anomaly Detection (Isolation Forest)
function detectAnomaly(transaction: any) {
  const { amount, ipCountry, billingCountry, deviceFingerprint, velocity } = transaction;
  
  let riskScore = 0;
  const anomalies = [];

  // Kural 1: Coğrafi Uyumsuzluk
  if (ipCountry !== billingCountry) {
    riskScore += 40;
    anomalies.push('GEO_MISMATCH');
  }

  // Kural 2: Yüksek Tutar (Anomaly)
  if (amount > 5000) {
    riskScore += 30;
    anomalies.push('HIGH_AMOUNT_OUTLIER');
  }

  // Kural 3: Hız Limiti (Velocity Check)
  if (velocity > 5) { // 1 saatte 5 işlem
    riskScore += 50;
    anomalies.push('HIGH_VELOCITY');
  }

  // Normalizasyon
  riskScore = Math.min(100, riskScore);

  return {
    riskScore,
    riskLevel: riskScore > 80 ? 'CRITICAL' : riskScore > 50 ? 'HIGH' : 'LOW',
    anomalies
  };
}

app.post('/analyze', (req, res) => {
  const transactionData = req.body;
  
  // Model inference
  const result = detectAnomaly(transactionData);

  res.json({
    transactionId: transactionData.id,
    timestamp: new Date().toISOString(),
    model: 'IsolationForest_v2.4',
    ...result
  });
});

app.listen(PORT, () => {
  console.log(`Fraud ML Engine running on port ${PORT}`);
});
