import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SimilarNeeds } from '../classes/similar-needs';
import { Globalvar } from '../classes/globalvar';

@Injectable()
export class SimilarNeedsService {

  constructor(private http: HttpClient) { }

  GetSimilarNeeds(SNeedId) {
    return this.http.get<SimilarNeeds[]>(Globalvar.ApiUrl + "/GetNeeds?NeedId=&NeedName=&PMOId=&ADPId=&ProjectId=&CountryId=" +
      "&StateId=&DistrictId=&CityId=&NeedTypeId=&SectorId=&Severity=&Priority=&Category=&IsDraft=&IsPublished=&ADPRegion=" +
      "&ADPStateId=&ADPDistrictId=&NeedAmountFrom=&NeedAmountTo=&BeginDate=&EndDate=&StatusInformation=&NeedGenId=&DesignationId=" +
      "&Tags=" + SNeedId + "&PercentageCompletedFrom=&PercentageCompletedTo=&AdditionalFilter=&PageNo=&PageSize=&ShowInHomePage=" +
      "&IsMegaMenu=");
  }

  GetSimilarNeedsMyWorld(NeedID){
    return this.http.get<SimilarNeeds[]>(Globalvar.ApiUrl + "/GetSimilarNeedsByNeedId?NeedId=" +NeedID)
  }

}
