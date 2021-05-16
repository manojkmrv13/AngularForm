import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HomePageBanner} from '../classes/home-page-banner';
import { Globalvar } from '../classes/globalvar';

@Injectable()
export class HomePageBannerService {
  public getCartCount:any;
  public getUsername:any = "";
  constructor(private http:HttpClient) { }
  HomePageBannerService(){
    return this.http.get<HomePageBanner[]>(Globalvar.ApiUrl +"/GetHomePageBanner?BannerId=")
  }
}
