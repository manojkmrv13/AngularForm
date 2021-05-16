import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SStories } from '../classes/s-stories';
import { Globalvar } from '../classes/globalvar';

@Injectable()
export class SStoriesService {

  constructor(private http: HttpClient) { }

  GetSStoriesId(SSId) {
    return this.http.get<SStories[]>(Globalvar.ApiUrl + "/GetStories?StoryId=&NeedId=" + SSId + "&StoryType=Beneficiary Speak&ApprovedStatus=Approved&UserId=&SectorId="); 
  }
  GetSuccessStory(sectorId) {
    return this.http.get<SStories[]>(Globalvar.ApiUrl + "/GetStories?StoryId=&NeedId=&StoryType=Donors Speak&ApprovedStatus=Approved&UserId=&SectorId="+ sectorId);
  }
}
