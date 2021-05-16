import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Campaigners } from '../classes/campaigners';
import { Globalvar } from '../classes/globalvar'

@Injectable()
export class CampaignersService {

  constructor(private http: HttpClient) { }

  GetCampaigners(cNeedID) {
    return this.http.get<Campaigners[]>(Globalvar.ApiUrl + "/GetNeedCampaigners?NeedId=" + cNeedID);
  }

}
