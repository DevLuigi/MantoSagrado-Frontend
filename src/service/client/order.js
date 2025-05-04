import ServiceBase from '../config/serviceBase.js';

export default class orderApi extends ServiceBase {
    constructor() {
        super('/order');
    }

    async listAllByClient(body) {
        return await super.post("/list-all-by-client", body);
    }

    async listByIdAndClient(orderId, clientId) {
        return await super.post(`/${orderId}/client/${clientId}`);
    }

    async register(body) {
        return await super.post('', body);
    }

    async listAllByOrder(body) {
        return await super.post("/items/list-all-by-order", body);
    }

    async registerOrderItems(body) {
        return await super.post('/items', body);
    }

}