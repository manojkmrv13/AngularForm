import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Partners } from '../classes/partners';
import { Globalvar } from '../classes/globalvar';

@Injectable()
export class PartnersService {

  constructor(private http: HttpClient) { }

  GetPartners(GetPId) {
    return this.http.get<Partners[]>(Globalvar.ApiUrl + "/GetNeedPartnersMapping?NeedId=" + GetPId + "&PartnerId=");
  }

}

