import { Injectable } from '@angular/core';
import { Globalvar } from '../classes/globalvar';
import { HttpClient } from '@angular/common/http';
import { Paymentresponse } from '../classes/paymentresponse';

@Injectable()
export class PostCcpaymentService {

  constructor(private http: HttpClient) { }

  GetNeedPaymentsResponse(ResponseId, OrderId) {
    return this.http.get<Paymentresponse[]>(Globalvar.ApiUrl + "/GetNeedPaymentsResponse?ResponseId=" + ResponseId + "&OrderId=" + OrderId);
  }

  GetEncryptedRequest(vardata: any) {
    return this.http.post(Globalvar.ApiUrl + '/GetEncryptedRequest', vardata);
  }

  PostNeedPayment(vardata: any) {
    return this.http.post(Globalvar.ApiUrl + '/PostNeedPayment', vardata);
  }

  PostNeedPaymentResponse(vardata: any) {
    return this.http.post(Globalvar.ApiUrl + '/PostNeedPaymentResponse', vardata);
  }
}