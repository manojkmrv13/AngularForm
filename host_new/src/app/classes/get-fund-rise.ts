export class GetFundRise {
    constructor(
        public MAPPINGID: number,
        public ENTRYDATE: Date,
        public NEEDID: number,
        public NEED_NAME: string,
        public NEED_AMOUNT: string,
        public ADMINISTRATION_CHARGES: string,
        public PROJECTID: number,
        public BEGIN_DATE : Date,
        public END_DATE : Date,
        public PROJECT_BEGIN_DATE : Date,
        public PROJECT_END_DATE : Date,
        public FLAG : number,
        public NO_OF_DAYS_REQUIRED : number,
        public DONATION_AMOUNT : number,
        public FUNDRAISEID : number,
        public FUNDRAISE_NAME : string,
        public FUNDRAISE_AMOUNT : number,
        public AMOUNT_DONATED : number,
        public DONORID : number,
        public DONOR_USERNAME : string,
        public DONOR_EMAILID : string,
        public DONOR_MOBILE : number,
        public DONOR_APIUSERID : any,
        public ERROR : any,
        public TOTAL_INVITED : number,
        public TOTAL_JOINED : number,
        public TOTAL_REMAINING : number
    ) { 
        
    }
}
