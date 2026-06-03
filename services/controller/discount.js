const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const packageDefinition = protoLoader.loadSync(
    __dirname + '/../../proto/discount.proto', {
    keepCase: true,
    longs: String,
    enums: String,
    arrays: true,
});

const host = process.env.DISCOUNT_HOST || '127.0.0.1';
const DiscountService = grpc.loadPackageDefinition(packageDefinition).DiscountService;
const client = new DiscountService(`${host}:3003`, grpc.credentials.createInsecure());

module.exports = client;
