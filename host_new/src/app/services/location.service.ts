import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Location } from '../classes/location';
import { Globalvar } from '../classes/globalvar';

@Injectable()
export class LocationService {

  constructor(private http: HttpClient) { }

  GetLocation(RegionId) {
    return this.http.get<Location[]>(Globalvar.ApiUrl + "/GetADPState?CountryId=&StateId=&Region=" + RegionId);
  }

}
