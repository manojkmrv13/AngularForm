export class Needtype {
    constructor(
        public NEEDTYPEID: number,
        public ENTRYDATE: Date,
        public NEEDTYPE: string,
        public ABBREVIATION: string,        
        public DESCRIPTION: string,
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
