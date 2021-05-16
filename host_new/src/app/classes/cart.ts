export class Cart {
    constructor(
        public NEEDID: number,
        public NEED_AMOUNT: number,
        public ADMINISTRATION_CHARGES: number,
        public TOTAL_NEED_AMOUNT: number,
        public NEEDTYPEID: number,
        public TOTAL_DONATION_AMOUNT: number,
        public TOTAL_DONORS: number,
        public BEGIN_DATE: Date,
        public END_DATE: Date,
        public PROJECT_BEGIN_DATE: Date,
        public PROJECT_END_DATE: Date,
        public FLAG: number,
        public NEEDS_CHILD: any,
        public NO_OF_DAYS_REQUIRED: number,
        public DONATION_AMOUNT: number,
        public FUNDRAISEID: number,
        public FUNDRAISE_AMOUNT: number,
        public DONORID: number,
        public NEED_GROUP_FLAG :number,
        public GROUP_NEED_ID : number,
        public GROUP_NEED_NAME: string,
        public ERROR: string, 
        public AMOUNT: number,
        public QUANTITY : number,
        public ACTUAL_AMOUNT : number
    ) { }
}
