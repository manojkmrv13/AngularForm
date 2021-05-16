import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Smalldocument } from '../classes/smalldocument';
import { Globalvar } from '../classes/globalvar';

@Injectable()
export class SmalldocumentService {

  constructor(private http: HttpClient) { }

  GetSmallDocuments(SINeedId) {
    return this.http.get<Smalldocument[]>(Globalvar.ApiUrl + "/GetNeedDocuments?DocumentId=&NeedId=" + SINeedId + "&ApprovedStatus=1&isdefault=");
  }

}
