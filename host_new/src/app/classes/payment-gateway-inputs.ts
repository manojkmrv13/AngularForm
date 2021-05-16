export class PaymentGatewayInputs<T> {
    value: T;
    key: string;
    label: string;
    controlType: string;

    constructor(options: {
        value?: T,
        key?: string,
        label?: string,
        controlType?: string
      } = {}) {
      this.value = options.value;
      this.key = options.key || '';
      this.label = options.label || '';
      this.controlType = options.controlType || '';
    }
}
