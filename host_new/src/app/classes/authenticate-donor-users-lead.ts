export class AuthenticateDonorUsersLead {
  constructor(
    public DONORID: number,
    public ENTRYDATE: Date,
    public USERNAME: string,
    public EMAILID: string,
    public PASSWORD: string,
    public MOBILE: number,
    public PROFILE_IMAGE: string,
    public PROFILE_IMAGE_FILEPATH: string,
    public DESCRIPTION: string,
    public COUNTRYID: number,
    public COUNTRY_NAME: string,
    public API_USERID: number,
    public IPADDRESS: string,
    public USERAGENT: string,
    public STATUS: number,
    public ISPRIVATE: number,
    public CREATEDBY: number,
    public DOB: Date,
    public ERROR: string,
  ) { }
}
export class menu {
  constructor(
    public id: number,
    public MenuName: string,
    public URL: string,
    public MetaTitle: string,
    public MetaDescription: string,
    public MetaKeyword: string,
    public ShowInHeader: string,
    public ShowInFooter: string,
    public extrafield1: string,
    public extrafield2: string,
    public extrafield3: string,
    public extrafield4: string,
    public child_menu: string
  ) { }
}