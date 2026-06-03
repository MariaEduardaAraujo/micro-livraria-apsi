const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const packageDefinition = protoLoader.loadSync(
    __dirname + '/../../proto/shipping.proto', {
    keepCase: true,
    longs: String,
    enums: String,
    arrays: true,
});

const host = process.env.SHIPPING_HOST || '127.0.0.1';
const ShippingService = grpc.loadPackageDefinition(packageDefinition).ShippingService;
const client = new ShippingService(`${host}:3001`, grpc.credentials.createInsecure());

module.exports = client;
