// microservices/order-service/src/server.ts
import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import path from 'path';

const PROTO_PATH = path.join(__dirname, '../../protos/order.proto');

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const orderProto = grpc.loadPackageDefinition(packageDefinition).order as any;

// Mock Order DB
const MOCK_ORDERS: any[] = [];

// RPC Implementasyonları
const createOrder = (call: any, callback: any) => {
  const orderData = call.request;
  
  // Burada Product Service'e gRPC çağrısı yapıp stok kontrolü yapılmalı
  // Prisma.order.create(...) işlemi burada olacak

  const newOrder = {
    id: `ORD-${Math.floor(Math.random() * 10000)}`,
    userId: orderData.userId,
    items: orderData.items,
    totalAmount: orderData.items.reduce((acc: number, item: any) => acc + (item.price * item.quantity), 0),
    status: 'PENDING',
    createdAt: new Date().toISOString(),
  };

  MOCK_ORDERS.push(newOrder);
  console.log('New Order Created:', newOrder.id);

  callback(null, newOrder);
};

const getOrderById = (call: any, callback: any) => {
  const order = MOCK_ORDERS.find((o) => o.id === call.request.id);
  if (order) {
    callback(null, order);
  } else {
    callback({ code: grpc.status.NOT_FOUND, details: 'Order not found' });
  }
};

const listOrdersByUser = (call: any, callback: any) => {
  const orders = MOCK_ORDERS.filter((o) => o.userId === call.request.userId);
  callback(null, { orders });
};

// Sunucu Başlatma
const main = () => {
  const server = new grpc.Server();
  
  server.addService(orderProto.OrderService.service, {
    CreateOrder: createOrder,
    GetOrderById: getOrderById,
    ListOrdersByUser: listOrdersByUser,
  });

  const PORT = '0.0.0.0:50052'; // Farklı port
  server.bindAsync(PORT, grpc.ServerCredentials.createInsecure(), (err, port) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(`Order Service running at ${PORT}`);
  });
};

main();
