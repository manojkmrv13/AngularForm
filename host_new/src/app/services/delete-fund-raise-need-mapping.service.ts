import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DeleteFundRaiseNeed } from '../classes/delete-fund-raise-need-mapping';
import { Globalvar } from '../classes/globalvar';

@Injectable()
export class DeleteFundRaiseNeedMapping {
  constructor(private Http: HttpClient) { }

  DeleteFundRaiseNeedMapping(FundRaiseId) {
    return this.Http.get<DeleteFundRaiseNeed[]>(Globalvar.ApiUrl + "/DeleteFundRaiseNeedMapping?NeedId=&FundRaiseId=" + FundRaiseId);
  }

}
