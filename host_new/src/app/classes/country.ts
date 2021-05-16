export class Country {
    constructor(
        public COUNTRYID: number,
        public ENTRYDATE: Date,
        public COUNTRY_NAME: string,
        public DESCRIPTION: string,
        public STATUS: string,
        public ERROR: string,
        public CREATEDBY?: number
    ) { 
        
    }
}