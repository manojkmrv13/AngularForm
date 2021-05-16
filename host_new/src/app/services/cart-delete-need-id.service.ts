import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CartDelete } from '../classes/cart-delete';
import { Globalvar } from '../classes/globalvar';

@Injectable()
export class CartDeleteNeedIdService {

  constructor(private Http: HttpClient) { }
  CartDeleteService(CartDonorID, CartNeedID) {
    return this.Http.get<CartDelete[]>(Globalvar.ApiUrl + "/DeleteDonorCartNeedId?DonorId=" + CartDonorID + "&NeedId=" + CartNeedID);
  }

  DeleteDonorCartDonorId(DonorId) {
    return this.Http.get<CartDelete[]>(Globalvar.ApiUrl + "/DeleteDonorCartDonorId?DonorId=" + DonorId);
  }
}
