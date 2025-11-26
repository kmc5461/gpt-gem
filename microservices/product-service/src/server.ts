// microservices/product-service/src/server.ts
import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import path from 'path';

// Proto dosyasının yolu
const PROTO_PATH = path.join(__dirname, '../../protos/product.proto');

// Proto yükleme ayarları
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const productProto = grpc.loadPackageDefinition(packageDefinition).product as any;

// Mock Data (Gerçek senaryoda Prisma ile DB'den çekilecek)
const MOCK_PRODUCTS = [
  { id: '1', name: 'Noir Hoodie', price: 120, stock: 50 },
  { id: '2', name: 'Trench Coat', price: 450, stock: 10 },
  { id: '3', name: 'Combat Boots', price: 280, stock: 25 },
];

// RPC Implementasyonları
const getProductById = (call: any, callback: any) => {
  const product = MOCK_PRODUCTS.find((p) => p.id === call.request.id);
  
  if (product) {
    callback(null, product);
  } else {
    callback({
      code: grpc.status.NOT_FOUND,
      details: 'Product not found',
    });
  }
};

const listProducts = (call: any, callback: any) => {
  // Burada pagination, filtering vb. eklenebilir
  callback(null, { products: MOCK_PRODUCTS });
};

// Sunucu Başlatma
const main = () => {
  const server = new grpc.Server();
  
  server.addService(productProto.ProductService.service, {
    GetProductById: getProductById,
    ListProducts: listProducts,
  });

  const PORT = '0.0.0.0:50051';
  server.bindAsync(PORT, grpc.ServerCredentials.createInsecure(), (err, port) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(`Product Service running at ${PORT}`);
    // server.start(); // gRPC yeni versiyonlarında bindAsync sonrası otomatik start olmayabilir, duruma göre gerekebilir.
  });
};

main();
