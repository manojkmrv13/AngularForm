export class Achievements {
    constructor(
        public ACHIEVEMENTID : number,
        public ENTRYDATE : Date,
        public NEEDSECTORID : number,
        public SECTOR : string,
        public ABBREVIATION : string,
        public SECTOR_ICON : string,
        public SECTOR_ICONFILEPATH : string,
        public SECTOR_IMAGE : string,
        public SECTOR_IMAGEFILEPATH : string,
        public URL : string,
        public ACHIEVEMENTTITLE : string,
        public DESCRIPTION : string,
        public SHORT_DESCRIPTION : string,
        public ACHIEVEMENT_ICON : string,
        public ACHIEVEMENT_ICONFILEPATH : string,
        public ACHIEVEMENT_IMAGE : string,
        public ACHIEVEMENT_IMAGEFILEPATH : string,
        public STATUS : string,
        public CREATEDBY : number,
        public ERROR : string,
    ){}
}
