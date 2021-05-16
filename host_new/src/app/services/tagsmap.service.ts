import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tagsmap } from '../classes/tagsmap';
import { Globalvar } from '../classes/globalvar';

@Injectable()
export class TagsmapService {


  constructor(private http: HttpClient) { }

  GetNeedTagId(NId) {
    return this.http.get<Tagsmap[]>(Globalvar.ApiUrl + "/GetNeedTagsMapping?TagId=&NeedId=" + NId);
  }


}
