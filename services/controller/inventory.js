const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const packageDefinition = protoLoader.loadSync(
    __dirname + '/../../proto/inventory.proto', {
    keepCase: true,
    longs: String,
    enums: String,
    arrays: true,
});

const host = process.env.INVENTORY_HOST || '127.0.0.1';
const InventoryService = grpc.loadPackageDefinition(packageDefinition).InventoryService;
const client = new InventoryService(`${host}:3002`, grpc.credentials.createInsecure());

module.exports = client;
