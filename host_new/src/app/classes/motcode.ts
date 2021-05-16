export class MotCode {
    constructor(
       public MOTCODEID: number,
       public ENTRYDATE: Date,
       public MOTCODE: string,
       public MOTCODE_NAME: string,
       public DESCRIPTION: string,
       public CREATEDBY: number,
       public CMS_USERNAME: string,
       public CMS_USERROLE: string,
       public ERROR: string
    ){}
}