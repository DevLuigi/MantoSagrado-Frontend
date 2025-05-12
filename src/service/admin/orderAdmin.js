import ServiceBase from '../config/serviceBase.js';

export default class OrderAdmin extends ServiceBase {
    constructor() {
        super('/order');
    }

    async listAll() {
        return await super.get();
    }

    async updateStatusOrder(id, body) {
        return await super.put(`/${id}`, body);
    }
}