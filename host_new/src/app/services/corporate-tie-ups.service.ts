import { Injectable } from '@angular/core';
import { CorporateTieUps } from '../classes/corporate-tie-ups';
import { HttpClient } from '@angular/common/http';
import { Globalvar } from '../classes/globalvar';

@Injectable()
export class CorporateTieUpsService {

  constructor( public Http:HttpClient) { }

  GetCorporateTieUps(){
    return this.Http.get<CorporateTieUps[]>(Globalvar.ApiUrl + "/GetPartners?PartnerId=");
  }
  
}
