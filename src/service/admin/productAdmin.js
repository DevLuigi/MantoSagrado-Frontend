import ServiceBase from '../config/serviceBase.js';

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

    async listAllImagesByProduct(productId) {
        return await super.get(`/${productId}/image`);
    }

    async uploadImage(id, isMain, file) {
        return await super.postImage(`/${id}/image/isMain/${isMain}`, file);
    }

    async deleteAllImagesByProduct(productId) {
        return await super.delete(`/${productId}/image`);
    }
}