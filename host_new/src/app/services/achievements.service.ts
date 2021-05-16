import { Injectable } from '@angular/core';
import { Globalvar } from '../classes/globalvar';
import { HttpClient } from '@angular/common/http';
import { Achievements } from '../classes/achievements';

@Injectable()
export class AchievementsService {

  constructor(private http:HttpClient) { }

  AchievementsService() {
    return this.http.get<Achievements[]>(Globalvar.ApiUrl +"/GetNeedSectorAchievements?AchievementId=&NeedSectorId=");
  }

}
