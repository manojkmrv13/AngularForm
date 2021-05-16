import { Injectable } from '@angular/core';
import { DonorNotifications } from '../classes/donor-notifications';
import { HttpClient } from '@angular/common/http';
import { Globalvar } from '../classes/globalvar';

@Injectable()
export class DonorNotificationsService {

  constructor( private http : HttpClient) { }

  GetDonorNotifications(donorID){
    return this.http.get<DonorNotifications[]>(Globalvar.ApiUrl + "/GetDonorNotifications?NotificationId=&DonorId="+ donorID +"&IsRead=");
  }

}
