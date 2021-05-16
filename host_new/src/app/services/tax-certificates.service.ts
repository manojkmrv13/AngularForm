import { Injectable } from '@angular/core';
import { TaxCertificates } from '../classes/tax-certificates';
import { HttpClient } from '@angular/common/http';
import { Globalvar } from '../classes/globalvar';

@Injectable()
export class TaxCertificatesService {

  constructor(private http: HttpClient) { }
  GetNeedPayments(DonorId, BeginDate, EndDate) {
    return this.http.get<TaxCertificates[]>(Globalvar.ApiUrl + "/GetNeedPayments?PayId=&NeedId=&OrderId=&IDMSId=&DonorId=" + DonorId + "&BeginDate=" + BeginDate + "&EndDate=" + EndDate + "&ADPId=&PaymentStatus=Success&SectorId=")
  }

  GetTaxCertificates(DonorId, BeginDate, EndDate) {
    return this.http.get<TaxCertificates[]>(Globalvar.ApiUrl + '/GetTaxCertificates?DonorId=' + DonorId + '&BeginDate=' + BeginDate + '&EndDate=' + EndDate)
  }
}
