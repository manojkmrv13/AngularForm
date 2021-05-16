export class Needcomment {
    constructor(
        public COMMENTID: number,
        public NEEDID: number,
        public NEED_NAME: string,
        public ENTRYDATE: string,
        public COMMENTS: string,
        public PARENT_COMMENTID: number,
        public PARENT_COMMENTS: string,
        public IPADDRESS: string,
        public USERAGENT: string,
        public ISPUBLISHED: number,
        public STATUS: string,
        public DONORID: number,
        public DONOR_USERNAME: string,
        public DONOR_EMAILID: string,
        public DONOR_PROFILE_IMAGE: string,
        public DONOR_PROFILE_IMAGE_FILEPATH: string,
        public USERID: number,
        public CMS_USERNAME: string,
        public CMS_EMAILID: string,
        public CMS_USERROLE: string,
        public ERROR: string
    ){

    }
}
