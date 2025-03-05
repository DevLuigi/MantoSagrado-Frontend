import ServiceBase from '../serviceBase.js';

export default class ProductApi extends ServiceBase {
    constructor() {
        super('/product');
    }

    async listAll() {
        return await super.get();
    }

    async register(body) {
        return await super.post('', body);
    }

    async update(id, body) {
        return await super.put(`/${id}`, body);
    }

    async handleStatus(id) {
        return await super.patch(`/${id}/status`);
    }
}