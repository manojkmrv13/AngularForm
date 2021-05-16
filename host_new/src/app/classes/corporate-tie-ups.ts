export class CorporateTieUps {
    constructor(
      public PARTNERID : number,
      public ENTRYDATE : Date,
      public PARTNER_NAME : string,
      public PARTNER_LOGO: string,
      public PARTNER_LOGO_FILEPATH: string,
      public PARTNER_TYPE: string,
      public PARTNER_DESCRIPTION: string,
      public STATUS: string,
      public CREATEDBY: number,
      public CMS_USERNAME: string,
      public CMS_USERROLE: string,
      public ERROR: string
    ){}
}
