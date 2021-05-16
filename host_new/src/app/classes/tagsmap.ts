export class Tagsmap {   
    constructor( 
        public MAPPINGID: string,
        public ENTRYDATE: Date,
        public NEEDID: number,
        public NEED_NAME: string,
        public TAGID: number,
        public TAGS: string,
        public STATUS: string,
        public CREATEDBY: number,
        public CREATED_BY_USERNAME: string,
        public CREATED_BY_USERROLE: string,
        public ERROR: string
    ){}
}
