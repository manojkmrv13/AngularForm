import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Needs } from '../classes/needs';
import { Globalvar } from '../classes/globalvar'

@Injectable()
export class needsService {
  constructor(private http: HttpClient) { }

  getNeed(NeedId) {
    return this.http.get<Needs[]>(Globalvar.ApiUrl + "/GetNeeds?NeedId=" + NeedId );
  }

  getNeeds(NeedId, NeedName, PMOId, ADPId, ProjectId, CountryId, StateId, DistrictId, CityId, NeedTypeId, SectorId, Severity, Priority,
    Category, IsDraft, IsPublished, ADPRegion, ADPStateId, ADPDistrictId, NeedAmountFrom, NeedAmountTo, BeginDate, EndDate, StatusInformation, NeedGenId,
    DesignationId, Tags, PercentageCompletedFrom, PercentageCompletedTo, AdditionalFilter, PageNo, PageSize, ShowInHomePage) {
    return this.http.get<Needs[]>(Globalvar.ApiUrl + "/GetNeeds?NeedId=" + NeedId + "&NeedName=" + NeedName + "&PMOId=" + PMOId + "&ADPId=" + ADPId + "&ProjectId=" + ProjectId +
      "&CountryId=" + CountryId + "&StateId=" + StateId + "&DistrictId=" + DistrictId + "&CityId=" + CityId + "&NeedTypeId=" + NeedTypeId +
      "&SectorId=" + SectorId + "&Severity=" + Severity + "&Priority=" + Priority + "&Category=" + Category + "&IsDraft=" + IsDraft +
      "&IsPublished=1&ADPRegion=" + ADPRegion + "&ADPStateId=" + ADPStateId + "&ADPDistrictId=" + ADPDistrictId + "&NeedAmountFrom=" + NeedAmountFrom + "&NeedAmountTo=" + NeedAmountTo +
      "&BeginDate=" + BeginDate + "&EndDate=" + EndDate + "&StatusInformation=Approved&NeedGenId=" + NeedGenId +
      "&DesignationId=" + DesignationId + "&Tags=" + Tags + "&PercentageCompletedFrom=" + PercentageCompletedFrom +
      "&PercentageCompletedTo=" + PercentageCompletedTo + "&AdditionalFilter=" + AdditionalFilter + "&PageNo=" + PageNo + "&PageSize=" +
      PageSize + "&ShowInHomePage=" + ShowInHomePage + "&IsMegaMenu=");
  }

  getCompletedNeeds(NeedId, NeedName, PMOId, ADPId, ProjectId, CountryId, StateId, DistrictId, CityId, NeedTypeId, SectorId, Severity, Priority,
    Category, IsDraft, IsPublished, ADPRegion, ADPStateId, ADPDistrictId, NeedAmountFrom, NeedAmountTo, BeginDate, EndDate, StatusInformation, NeedGenId,
    DesignationId, Tags, PercentageCompletedFrom, PercentageCompletedTo, AdditionalFilter, PageNo, PageSize, ShowInHomePage) {
    return this.http.get<Needs[]>(Globalvar.ApiUrl + "/GetNeeds?NeedId=" + NeedId + "&NeedName=" + NeedName + "&PMOId=" + PMOId + "&ADPId=" + ADPId + "&ProjectId=" + ProjectId +
      "&CountryId=" + CountryId + "&StateId=" + StateId + "&DistrictId=" + DistrictId + "&CityId=" + CityId + "&NeedTypeId=" + NeedTypeId +
      "&SectorId=" + SectorId + "&Severity=" + Severity + "&Priority=" + Priority + "&Category=" + Category + "&IsDraft=" + IsDraft +
      "&IsPublished= "+ IsPublished +" &ADPRegion=" + ADPRegion + "&ADPStateId=" + ADPStateId + "&ADPDistrictId=" + ADPDistrictId + "&NeedAmountFrom=" + NeedAmountFrom + "&NeedAmountTo=" + NeedAmountTo +
      "&BeginDate=" + BeginDate + "&EndDate=" + EndDate + "&StatusInformation=" + StatusInformation + "&NeedGenId=" + NeedGenId +
      "&DesignationId=" + DesignationId + "&Tags=" + Tags + "&PercentageCompletedFrom=" + PercentageCompletedFrom +
      "&PercentageCompletedTo=" + PercentageCompletedTo + "&AdditionalFilter=" + AdditionalFilter + "&PageNo=" + PageNo + "&PageSize=" +
      PageSize + "&ShowInHomePage=" + ShowInHomePage + "&IsMegaMenu=");
  }

  getNeedsHomePage() {
    return this.http.get<Needs[]>(Globalvar.ApiUrl + "/GetNeedsShowInHomepage?NeedId=&NeedName=" +
      "&PMOId=&ADPId=&ProjectId=&CountryId=&StateId=&DistrictId=&CityId=&NeedTypeId=&SectorId=&Severity=&Priority=&Category=&IsDraft=" +
      "&IsPublished=1&ADPRegion=&ADPStateId=&ADPDistrictId=&NeedAmountFrom=&NeedAmountTo=&BeginDate=&EndDate=&StatusInformation=Approved&NeedGenId=" +
      "&DesignationId=&Tags=&PercentageCompletedFrom=&PercentageCompletedTo=&AdditionalFilter=&PageNo=&PageSize=&ShowInHomePage=1&IsMegaMenu=");
  }

  getNeedsMegaMenu() {
    return this.http.get<Needs[]>(Globalvar.ApiUrl + "/GetNeedsIsMegaMenu?NeedId=&NeedName=&PMOId=&ADPId=&ProjectId=&CountryId=" +
      "&StateId=&DistrictId=&CityId=&NeedTypeId=&SectorId=&Severity=&Priority=&Category=&IsDraft=&IsPublished=1&ADPRegion=" +
      "&ADPStateId=&ADPDistrictId=&NeedAmountFrom=&NeedAmountTo=&BeginDate=&EndDate=&StatusInformation=Approved&NeedGenId=&DesignationId=" +
      "&Tags=&PercentageCompletedFrom=&PercentageCompletedTo=&AdditionalFilter=&PageNo=&PageSize=&ShowInHomePage=&IsMegaMenu=1");
  }

  GetComplitetNeeds(NeedTypeId, SectorId, StatusInformation, PageNo) {
    return this.http.get<Needs[]>(Globalvar.ApiUrl + "/GetNeeds?NeedId=&NeedName=&PMOId=&ADPId=&ProjectId=&CountryId=&StateId=&DistrictId=&CityId=&NeedTypeId=" + NeedTypeId + "&SectorId=" + SectorId + "&Severity=&Priority=&Category=&IsDraft=&IsPublished=1&ADPRegion=&ADPStateId=&ADPDistrictId=&NeedAmountFrom=&NeedAmountTo=&BeginDate=&EndDate=&StatusInformation="+ StatusInformation +"&NeedGenId=&DesignationId=&Tags=&PercentageCompletedFrom=&PercentageCompletedTo=&AdditionalFilter=&PageNo="+ PageNo +"&PageSize=6&ShowInHomePage=&IsMegaMenu=");
  }
  
  GetUrgentNeeds(Priority) {
    return this.http.get<Needs[]>(Globalvar.ApiUrl + "/GetNeeds?NeedId=&NeedName=&PMOId=&ADPId=&ProjectId=&CountryId=&StateId=&DistrictId=&CityId=&NeedTypeId=&SectorId=&Severity=&Priority=" + Priority + "&Category=&IsDraft=&IsPublished=1&ADPRegion=&ADPStateId=&ADPDistrictId=&NeedAmountFrom=&NeedAmountTo=&BeginDate=&EndDate=&StatusInformation=Approved&NeedGenId=&DesignationId=&Tags=&PercentageCompletedFrom=&PercentageCompletedTo=&AdditionalFilter=&PageNo=&PageSize=&ShowInHomePage=&IsMegaMenu=");
  }

  GetDonorDonationsPendingTestimonialsDetails(DonorId){
    return this.http.get<Needs[]>(Globalvar.ApiUrl + "/GetDonorDonationsPendingTestimonialsDetails?DonorId="+DonorId);
  }

  GetSearchData(key){
    return this.http.get<Needs[]>(Globalvar.ApiUrl + '/GetNeedsSearch?SearchText=' + key)
  }  

  GetLandingPageNeeds(){
    return this.http.get<Needs[]>(Globalvar.ApiUrl + "/GetNeeds?ShowInLandingPage=1&IsPublished=1");
  }

}

