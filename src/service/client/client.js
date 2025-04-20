import ServiceBase from '../config/serviceBase.js';

export default class clientApi extends ServiceBase {
    constructor() {
        super('/client');
    }

    async listAll() {
        return await super.get();
    }

    async listById(id) {
        return await super.get(`/${id}`);
    }

    async register(body) {
        return await super.post('', body);
    }

    async login(body) {
        return await super.post('/login', body);
    }

    async update(id, body) {
        return await super.put(`/${id}`, body);
    }
    
}