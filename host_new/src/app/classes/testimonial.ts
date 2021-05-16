export class Testimonial {
    constructor(
        public STORYID: number,
        public ENTRYDATE: string,
        public NEEDID: number,
        public NEED_NAME: string,
        public STORY: string,        
        public STORY_TYPE: string,
        public SUPPORTING_DOCUMENT_TYPE_1: string,
        public SUPPORTING_DOCUMENT_NAME_1: string,
        public SUPPORTING_DOCUMENT_NAME_1_FILEPATH: string,
        public SUPPORTING_DOCUMENT_URL_1: string,
        public SUPPORTING_DOCUMENT_TYPE_2: string,
        public SUPPORTING_DOCUMENT_NAME_2: string,
        public SUPPORTING_DOCUMENT_NAME_2_FILEPATH: string,
        public SUPPORTING_DOCUMENT_URL_2: string,
        public SUPPORTING_DOCUMENT_TYPE_3: string,
        public SUPPORTING_DOCUMENT_NAME_3: string,
        public SUPPORTING_DOCUMENT_NAME_3_FILEPATH: string,
        public SUPPORTING_DOCUMENT_URL_3: string,
        public APPROVED_BY: number,
        public APPROVED_BY_USERNAME: string,
        public APPROVED_BY_EMAILID: string,
        public APPROVED_BY_USERROLE: string,
        public APPROVED_DATE: string,
        public APPROVED_STATUS: string,
        public STATUS: string,
        public USERID: number,
        public CREATED_BY_USERNAME: string,
        public CREATED_BY_EMAILID: string,
        public CREATED_BY_USERROLE: string,
        public ERROR: string
    ) { 
        
    }
}
