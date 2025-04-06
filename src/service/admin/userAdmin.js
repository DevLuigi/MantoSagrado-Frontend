import ServiceBase from '../config/serviceBase.js';

export default class userAdminApi extends ServiceBase {
    constructor() {
        super('/user/admin');
    }

    async listAll() {
        return await super.get();
    }

    async login(body){
        return await super.post('/login', body);
    }

    async register(body) {
        return await super.post('', body);
    }

    async update(id, body) {
        return await super.put(`/${id}`, body);
    }

    async handleStatus(id) {
        return await super.put(`/${id}/status`);
    }
}