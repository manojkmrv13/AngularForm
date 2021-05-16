import { PaymentGatewayInputs } from '../classes/payment-gateway-inputs';

export class PaymentGatewayInputsHidden extends PaymentGatewayInputs<string> {
    controlType = 'hidden';
    type: string;

    constructor(options: {} = {}) {
        super(options);
        this.type = options['type'] || '';
    }
}
