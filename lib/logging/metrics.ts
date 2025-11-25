// lib/logging/metrics.ts
import client from 'prom-client';

// Default metrikleri topla (CPU, Memory vb.)
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics({ prefix: 'archetype_' });

// Custom Metrikler
export const httpRequestDurationMicroseconds = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status_code'],
  buckets: [0.1, 0.5, 1, 2, 5],
});

export const totalOrdersCounter = new client.Counter({
  name: 'archetype_orders_total',
  help: 'Total number of orders processed',
  labelNames: ['currency'],
});

export const activeUsersGauge = new client.Gauge({
  name: 'archetype_active_users',
  help: 'Number of currently active users',
});

export const fraudDetectionCounter = new client.Counter({
  name: 'archetype_fraud_detections_total',
  help: 'Total fraud attempts detected',
  labelNames: ['risk_level'],
});

// Metrics Endpoint Handler için register
export const register = client.register;