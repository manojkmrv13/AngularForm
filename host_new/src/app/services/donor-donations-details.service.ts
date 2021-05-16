import { Injectable } from '@angular/core';
import { DonorDonationsDetails } from '../classes/donor-donations-details';
import { HttpClient } from '@angular/common/http';
import { Globalvar } from '../classes/globalvar';

@Injectable()
export class DonorDonationsDetailsService {

  constructor( private http : HttpClient) { }

  GetDonorDonationsDetails_AllDonated (DonorID){
    return this.http.get<DonorDonationsDetails[]>(Globalvar.ApiUrl + "/GetDonorDonationsDetails?DonorId="+ DonorID +"&StatusInformation=")
  }

  GetDonorDonationsDetails_InProcess (DonorID){
    return this.http.get<DonorDonationsDetails[]>(Globalvar.ApiUrl + "/GetDonorDonationsDetails?DonorId="+ DonorID +"&StatusInformation=In%20Process")
  }

  GetDonorDonationsDetails_Completed (DonorID){
    return this.http.get<DonorDonationsDetails[]>(Globalvar.ApiUrl + "/GetDonorDonationsDetails?DonorId="+ DonorID +"&StatusInformation=Donation%20Completed")
  }

}
