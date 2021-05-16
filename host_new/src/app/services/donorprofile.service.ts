import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Donorprofile } from '../classes/donorprofile';
import { Globalvar } from '../classes/globalvar';
import { MotCode } from '../classes/motcode';

@Injectable()
export class DonorprofileService {

  constructor(private http: HttpClient) { }

  GetDonorProfile(ProfileId, DonorId) {
    return this.http.get<Donorprofile[]>(Globalvar.ApiUrl + '/GetDonorProfile?ProfileId=&DonorId=' + Globalvar.getDonorId(), Globalvar.prepareHeader());
  }
  GetDonorProfileDetails(DonorId) {
    return this.http.get<Donorprofile[]>(Globalvar.ApiUrl + '/GetDonorProfile?ProfileId=&DonorId=' + Globalvar.getDonorId(), Globalvar.prepareHeader());
  }
  GetDonorUsersLead() { 
    return this.http.get<Donorprofile[]>(Globalvar.ApiUrl + '/GetDonorUsersLead?ApiUserId=' + Globalvar.getApiUserId(), Globalvar.prepareHeader());
  }

  GetMotCode(){
    return this.http.get<MotCode[]>(Globalvar.ApiUrl + '/GetMotcodes?motivationID=&motivationcode=');
  }
}
