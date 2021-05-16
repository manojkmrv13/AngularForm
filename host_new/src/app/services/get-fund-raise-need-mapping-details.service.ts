import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GetFundRise } from '../classes/get-fund-rise';
import { Globalvar } from '../classes/globalvar';

@Injectable()
export class GetFundRaiseNeedMappingDetailsService {  
  constructor(private Http: HttpClient) { }
  GetFundRaiseNeedMappingDetailsService(FundRaiseId) {
    return this.Http.get<GetFundRise[]>(Globalvar.ApiUrl + "/GetFundRaiseNeedMappingDetails?DonorId=&FundRaiseId=" + FundRaiseId);
  }
  GetMyNetworkDetails(DonorId){
    return this.Http.get<GetFundRise[]>(Globalvar.ApiUrl + "/GetDonorMyworldFundraise?DonorId="+ DonorId +"&FundRaiseId=");
  }
  GetFundraiseData(DonorId){
    return this.Http.get<GetFundRise[]>(Globalvar.ApiUrl + "/GetFundRaiseDetails?DonorId="+ DonorId +"&FundRaiseId=");
  }
  GetFundraiseIDDetails(DonorId, fundraiseID){
    return this.Http.get<GetFundRise[]>(Globalvar.ApiUrl + "/GetDonorMyworldFundraise?DonorId="+ DonorId +"&FundRaiseId="+fundraiseID);
  }
  GetFundRaiseInvitesDetails(DonorId, fundraiseID){
    return this.Http.get<GetFundRise[]>(Globalvar.ApiUrl + "GetFundRaiseInvitesDetails?DonorId=" + DonorId + "&FundRaiseId="+ fundraiseID);
  }
  GetPeopleDonated(fundraiseID){
    return this.Http.get<GetFundRise[]>(Globalvar.ApiUrl + "GetDonorDonatedFundraise?FundraiseId=" + fundraiseID);
  }
}
