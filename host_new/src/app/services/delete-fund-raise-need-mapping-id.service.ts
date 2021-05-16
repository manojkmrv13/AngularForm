import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DeleteFundRaiseNeedMappingId } from '../classes/delete-fund-raise-need-mapping-id';
import { Globalvar } from '../classes/globalvar';

@Injectable()
export class DeleteFundRaiseNeedMappingIdService {

  constructor(private Http: HttpClient) {}
  DeleteFundRaiseNeedMappingIdService(NeedMapingID) {
    return this.Http.get<DeleteFundRaiseNeedMappingId[]>(Globalvar.ApiUrl + "/DeleteFundRaiseNeedMappingId?MappingId=" + NeedMapingID);
  }

}
