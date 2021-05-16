import { Injectable } from '@angular/core';
import { AuthenticateDonorUsersLead, menu } from '../classes/authenticate-donor-users-lead';
import { HttpClient } from '@angular/common/http';
import { Globalvar } from '../classes/globalvar';

@Injectable()
export class AuthenticateDonorUsersLeadService {
  constructor(private Http: HttpClient) { }
  GetAuthenticateDonorUsersLead(EmailId, Password){
    return this.Http.get<AuthenticateDonorUsersLead[]>(Globalvar.ApiUrl + "/Login?EmailId="+ EmailId +"&Password="+ encodeURIComponent(Password))
  }
  GetForgotPassword(EmailId){
    return this.Http.get(Globalvar.ApiUrl + "/DonorForgotPassword?EmailId="+ EmailId)
  }
  GetMenu(){
    return this.Http.get<menu[]>("/assets/data/sitemap.json")

  
  }
  GetWebUrls(){
    return this.Http.get<menu[]>("/assets/data/webUrl.json")
  }
  postStatus(body){ 
    return this.Http.post(Globalvar.ApiUrl + '/CheckStatus', body);
  }
}
