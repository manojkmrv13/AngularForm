export class DonorRecentDonations {
    constructor(
      public DONATED_AMOUNT: number,
      public ENTRYDATE: Date,
      public NEEDID: number,
      public NEED_NAME: string,
      public NEED_DESCRIPTION: string,
      public NEED_SHORT_DESCRIPTION: string,
      public NEED_THUMBNAIL_IMAGE: string,
      public NEED_THUMBNAIL_IMAGE_FILEPATH: string,
      public NEED_THUMBNAIL_IMAGE_2: string,
      public NEED_THUMBNAIL_IMAGE_2_FILEPATH: string,
      public NEED_THUMBNAIL_IMAGE_3: string,
      public NEED_THUMBNAIL_IMAGE_3_FILEPATH: string,
      public NEED_THUMBNAIL_IMAGE_4: string,
      public NEED_THUMBNAIL_IMAGE_4_FILEPATH: string,
      public NEEDTYPEID: number,
      public NEEDTYPE: string,
      public SECTORID: number,
      public SECTOR: string,
      public SECTOR_ICON: string,
      public SECTOR_ICON_FILEPATH: string,
      public NEED_AMOUNT:number,
      public ADMINISTRATION_CHARGES: number,
      public TOTAL_NEED_AMOUNT: number,
      public ERROR: string
    ){}
}
