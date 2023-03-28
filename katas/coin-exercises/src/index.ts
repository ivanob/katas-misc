import { Server, Request, ResponseToolkit } from "@hapi/hapi";
import { cryptoPriceController } from './controllers/crypto-price-controller'

const API_VERSION = 'v1'
const API_PORT = 3000
const API_URL = 'localhost'

const init = async () => {
    const server: Server = new Server({
        port: API_PORT,
        host: API_URL
    });
    server.route({
        method: 'GET',
        path: `/${API_VERSION}/`,
        handler: async (request: Request, h: ResponseToolkit) => {
            return cryptoPriceController(request);
        }
    });
    await server.start();
    console.log(`Server running on ${server.info.uri}/${API_VERSION}`);
};
process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});
init();