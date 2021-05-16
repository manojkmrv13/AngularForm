import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Globalvar } from '../classes/globalvar';
import { ImpactedLives } from '../classes/impacted-lives';

@Injectable()
export class ImpactedLivesService {
  constructor( private http: HttpClient) { }  
  ImpactedLivesService(){
    return this.http.get<ImpactedLives[]>(Globalvar.ApiUrl +"/GetNeedImpactedLives?ImpactedId=&NeedId=&Status=1");
  }
  ImpactedLivesServiceBy(IMPACTEDID){
    return this.http.get<ImpactedLives[]>(Globalvar.ApiUrl +"/GetNeedImpactedLives?ImpactedId="+ IMPACTEDID +"&NeedId=&Status=1");
  }
  ImpactedLiveGallery(needId){
    return this.http.get<ImpactedLives[]>(Globalvar.ApiUrl + "/GetNeedDocuments?DocumentId=&NeedId="+ needId +"&ApprovedStatus=1&IsDefault=")
  }                                                       
}
