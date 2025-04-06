import ServiceBase from '../config/serviceBase.js';

export default class shippingCostApi extends ServiceBase {
    constructor() {
        super('/shippingCost');
    }

    async shippingCostCalc(body) {
        return await super.post('', body);
    }
}