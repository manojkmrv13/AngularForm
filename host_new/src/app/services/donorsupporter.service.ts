import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Donorsupporter } from './../classes/donorsupporter';
import { Globalvar } from '../classes/globalvar';

@Injectable()
export class DonorsupporterService {

  constructor(private http: HttpClient) { }

  GetDonorSupporter(DSNedId) {
    return this.http.get<Donorsupporter[]>(Globalvar.ApiUrl + "/GetNeedDonorSidePanel?NeedId=" + DSNedId);
  }

}
