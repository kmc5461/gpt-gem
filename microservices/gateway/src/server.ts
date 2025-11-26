// microservices/gateway/src/server.ts
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import path from 'path';

const app = express();
app.use(cors());
app.use(bodyParser.json());

// --- gRPC Client Setup ---

// Product Client
const PRODUCT_PROTO_PATH = path.join(__dirname, '../../protos/product.proto');
const productPackageDefinition = protoLoader.loadSync(PRODUCT_PROTO_PATH, {
  keepCase: true, longs: String, enums: String, defaults: true, oneofs: true
});
const productProto = grpc.loadPackageDefinition(productPackageDefinition).product as any;
const productClient = new productProto.ProductService(
  'localhost:50051', // Product Service URL
  grpc.credentials.createInsecure()
);

// Order Client
const ORDER_PROTO_PATH = path.join(__dirname, '../../protos/order.proto');
const orderPackageDefinition = protoLoader.loadSync(ORDER_PROTO_PATH, {
  keepCase: true, longs: String, enums: String, defaults: true, oneofs: true
});
const orderProto = grpc.loadPackageDefinition(orderPackageDefinition).order as any;
const orderClient = new orderProto.OrderService(
  'localhost:50052', // Order Service URL
  grpc.credentials.createInsecure()
);

// --- API Routes (REST -> gRPC Proxy) ---

// 1. Products Routes
app.get('/api/products', (req, res) => {
  productClient.ListProducts({}, (err: any, response: any) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(response.products);
  });
});

app.get('/api/products/:id', (req, res) => {
  productClient.GetProductById({ id: req.params.id }, (err: any, response: any) => {
    if (err) return res.status(404).json({ error: 'Product not found' });
    res.json(response);
  });
});

// 2. Orders Routes
app.post('/api/orders', (req, res) => {
  // req.body should match CreateOrderRequest structure
  orderClient.CreateOrder(req.body, (err: any, response: any) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json(response);
  });
});

app.get('/api/orders/:id', (req, res) => {
  orderClient.GetOrderById({ id: req.params.id }, (err: any, response: any) => {
    if (err) return res.status(404).json({ error: 'Order not found' });
    res.json(response);
  });
});

app.get('/api/users/:userId/orders', (req, res) => {
  orderClient.ListOrdersByUser({ userId: req.params.userId }, (err: any, response: any) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(response.orders);
  });
});

// Start Gateway
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`API Gateway running at http://localhost:${PORT}`);
  console.log('Proxies: Products -> 50051, Orders -> 50052');
});
