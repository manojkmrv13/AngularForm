import { Injectable } from '@angular/core';
import { DonorDonations } from '../classes/donor-donations';
import { HttpClient } from '@angular/common/http';
import { Globalvar } from '../classes/globalvar';

@Injectable()
export class DonorDonationsService {

  constructor(  private Http : HttpClient ) { }

  GetDonorDonations(donorID){
    return this.Http.get<DonorDonations[]>(Globalvar.ApiUrl + "/GetDonorDonations?NeedId=&DonorId=" + Globalvar.getDonorId(), Globalvar.prepareHeader());
     
  }
}
