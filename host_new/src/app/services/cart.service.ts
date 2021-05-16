import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cart } from '../classes/Cart';
import { Globalvar } from '../classes/globalvar';

@Injectable()
export class CartService {

  constructor(private Http: HttpClient) { }
  CartService(CartDonorID) {
    return this.Http.get<Cart[]>(Globalvar.ApiUrl + "/GetDonorCart?CartId=&NeedId=&DonorId=" + CartDonorID,Globalvar.prepareHeader());
  }
}
