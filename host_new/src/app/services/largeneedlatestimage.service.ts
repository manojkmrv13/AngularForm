import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Largeneedlatestimage } from '../classes/largeneedlatestimage';
import { Globalvar } from '../classes/globalvar';

@Injectable()
export class LargeneedlatestimageService {

  constructor(private http: HttpClient) { }

  GetLNeedLImage(LINeedId) {
    return this.http.get<Largeneedlatestimage[]>(Globalvar.ApiUrl + "/GetNeedLatestImage?NeedId=" + LINeedId);
  }

}


