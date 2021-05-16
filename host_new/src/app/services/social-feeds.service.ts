import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SocialFeeds } from '../classes/social-feeds';
import { Globalvar } from '../classes/globalvar';

@Injectable()
export class SocialFeedsService {

  constructor( private http: HttpClient ) { }
  SocialFeedsService(){
    return this.http.get<SocialFeeds[]>(Globalvar.ApiUrl + "/GetSocialFeeds?FeedId=&NoOfFeeds=8");
  }
}
