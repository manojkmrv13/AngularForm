export class NeedSector {
    constructor(
        public SECTORID: number,
        public ENTRYDATE: Date,
        public SECTOR: string,
        public ABBREVIATION: string,
        public URL: string,
        public DESCRIPTION: string,
        public HIDE_SECTOR: number,
        public STATUS: string,
        public ERROR: string,
        public ICONFILEPATH?: File,
        public ICON?: string,
        public IMAGEFILEPATH?: File,
        public IMAGE?: string,
        public CREATEDBY?: number
    ) { 
        
    }
}
