import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LneedLisiting } from '../classes/lneed-lisiting';
import { Globalvar } from '../classes/globalvar';

@Injectable()
export class LneedLisitingService {

  constructor(private http: HttpClient) { }

  GetLNeedList(lNeedId) {
    return this.http.get<LneedLisiting[]>(Globalvar.ApiUrl + "/GetNeedsGroupMapping?MappingId=&NeedId=&GroupId=" + lNeedId);
  }

}
