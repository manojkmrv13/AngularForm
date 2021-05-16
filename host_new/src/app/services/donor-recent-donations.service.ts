import { Injectable } from '@angular/core';
import { DonorRecentDonations } from '../classes/donor-recent-donations';
import { HttpClient } from '@angular/common/http';
import { Globalvar } from '../classes/globalvar';

@Injectable()
export class DonorRecentDonationsService {

  constructor( private Http : HttpClient) { }

  DonorRecentDonations(donorID){
    return this.Http.get<DonorRecentDonations[]>(Globalvar.ApiUrl + "/GetDonorRecentDonations?NeedId=&DonorId=" + donorID);
  }
}
