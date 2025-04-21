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
    
    async listAllAddresses(id) {
        return await super.get(`/${id}/address`);
    }

    async searchCep(cep) {
        return await super.get(`https://viacep.com.br/ws/${cep}/json/`);
    }

    async createAddress(clientId, body) {
        return await super.post(`/${clientId}/address`, body);
    }

    async updateDefaultAddress(clientId, addressId) {
        return await super.put(`${clientId}/address/${addressId}`);
    }

    async deleteClient(clientId) {
        return await super.delete(`/${clientId}`);
    }
}