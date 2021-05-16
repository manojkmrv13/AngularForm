export class DonorNotifications {
    constructor(
       public NOTIFICATIONID: number,
       public ENTRYDATE: Date,
       public NOTIFICATION_TEXT: string,
       public DONORID: number,
       public DONOR_USERNAME: string,
       public DONOR_EMAILID: string,
       public IS_READ: number,
       public ERROR: string
    ){}
}
