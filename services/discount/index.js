const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const packageDefinition = protoLoader.loadSync(
    __dirname + '/../../proto/discount.proto', {
    keepCase: true,
    longs: String,
    enums: String,
    arrays: true,
});

const discountProto = grpc.loadPackageDefinition(packageDefinition);

const server = new grpc.Server();

// implementa os métodos do DiscountService
server.addService(discountProto.DiscountService.service, {
    GetDiscountRate: (_, callback) => {
        const discountValue = Math.random() * 10 + 1; // Random value from R$1 to R$10

        callback(null, {
            value: discountValue,
        });
    },
});

server.bindAsync('0.0.0.0:3003', grpc.ServerCredentials.createInsecure(), () => {
    console.log('Discount Service running at http://127.0.0.1:3003');
    server.start();
});