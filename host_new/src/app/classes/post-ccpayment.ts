export class PostCcpayment {
    constructor(
        public TID: string,
        public MERCHANT_ID: string,
        public ORDER_ID: string,
        public AMOUNT: number,
        public CURRENCY: string,
        public REDIRECT_URL: string,
        public CANCEL_URL: string,
        public BILLING_NAME: string,
        public BILLING_ADDRESS: string,
        public BILLING_CITY: string,
        public BILLING_STATE: string,
        public BILLING_ZIP: string,
        public BILLING_COUNTRY: string,
        public BILLING_TEL: string,
        public BILLING_EMAIL: string,
        public DELIVERY_NAME: string,
        public DELIVERY_ADDRESS: string,
        public DELIVERY_CITY: string,
        public DELIVERY_STATE: string,
        public DELIVERY_ZIP: string,
        public DELIVERY_COUNTRY: string,
        public DELIVERY_TEL: string,
        public MERCHANT_PARAM1: string,
        public MERCHANT_PARAM2: string,
        public MERCHANT_PARAM3: string,
        public MERCHANT_PARAM4: string,
        public MERCHANT_PARAM5: string,
        public PROMO_CODE: string,
        public CUSTOMER_IDENTIFIER: string
    ) {

    }
}
