export class SocialFeeds {
    constructor(
        public FEEDID : number,
        public ENTRYDATE : Date,
        public PLATFORM : string,
        public FEED_IMAGE : string,
        public FEED_TEXT : string,
        public FEED_DATE : Date,
        public FEED_BY_NAME : string,
        public FEED_BY_PHOTO : string,
        public FEED_BY_ID : number,
        public STATUS : string,
        public CREATEDBY : string,
        public ERROR : string,
    ){}
}
