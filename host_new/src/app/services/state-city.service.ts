import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Globalvar } from '../classes/globalvar';
import { StateCity } from '../classes/state-city';



@Injectable()
export class StateCityService {

  constructor( private Http:HttpClient) { }
  GetState(){
    return this.Http.get<StateCity[]>(Globalvar.ApiUrl + "/GetState?CountryId=1&StateId=&Region=")
  }
  GetCity(StateId){
    return this.Http.get(Globalvar.ApiUrl + "/GetCity?CountryId=1&StateId="+ StateId +"&DistrictId=&CityId=" )
  }
  // GetBlogCategory(){
  //   return this.Http.get<BlogCategory[]>(Globalvar.ApiUrl + "/GetBlogsCategory?CategoryId=");
  // }
  // GetBlogs(BlogId, CategoryId, MonthName, Year){
  //   return this.Http.get<BlogData[]>(Globalvar.ApiUrl + "/GetBlogs?BlogId="+ BlogId +"&Title=&CategoryId="+ CategoryId +"&MonthName="+ MonthName +"&Year=" + Year)
  // }

  // GetBlogsMonthYear(){
  //   return this.Http.get<BlogData[]>(Globalvar.ApiUrl + "/GetBlogsMonthYear?CategoryId=")
  // }

  // GetBlogComments(BlogId){
  //   return this.Http.get<BlogComments[]>(Globalvar.ApiUrl + "/GetBlogsComments?CommentId=&BlogId="+ BlogId +"&ParentCommentId=&Status=1&ApprovedBy=1&DonorId=&UserId=")
  // }

}
