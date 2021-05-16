import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Globalvar } from '../classes/globalvar';
import { HomepageFactsFigures } from '../classes/homepage-facts-figures';

@Injectable()
export class HomepageFactsFiguresService {

  constructor(private http:HttpClient) { }

  HomepageFactsFiguresService(){
    return this.http.get<HomepageFactsFigures[]>(Globalvar.ApiUrl +"/GetHomepageFactsFigures");
  }
}
