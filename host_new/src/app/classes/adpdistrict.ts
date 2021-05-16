export class Adpdistrict {
    constructor(
        public DISTRICTID: number,
        public ENTRYDATE: Date,
        public DISTRICT_NAME: string,
        public STATEID: number,
        public STATE_NAME: string,
        public REGION: string,
        public COUNTRYID: number,
        public COUNTRY_NAME: string,
        public DESCRIPTION: string,
        public STATUS: string,
        public ERROR: string,
        public CREATEDBY?: number
    ) { 
        
    }
}
