import { Injectable } from '@angular/core';
import { PledgeSupport } from '../classes/pledge-support';
import { HttpClient } from '@angular/common/http';
import { Globalvar } from '../classes/globalvar';

@Injectable()
export class PlaedgeSupportService {

  constructor( private Http: HttpClient) { }

  GetPledgeSupport(){
    return this.Http.get<PledgeSupport[]>(Globalvar.ApiUrl + "/GetPledgeSupport?PledgeId=&PledgeTitle=&ApprovedStatus=Approved")
  }
}
