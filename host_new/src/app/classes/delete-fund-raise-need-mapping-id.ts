export class DeleteFundRaiseNeedMappingId {
    constructor(
        public MAPPINGID : number,
        public ENTRYDATE:  Date,
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
        public NO_OF_DAYS_REQUIRED: number,
        public DONATION_AMOUNT: number,
        public FUNDRAISEID: number,
        public FUNDRAISE_AMOUNT: number,
        public DONORID: number,
        public ERROR: string, 
    ) { }
}
