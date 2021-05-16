import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CartDeleteNeedIdService } from '../../services/cart-delete-need-id.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PostCcpaymentService } from '../../services/post-ccpayment.service';
import { Globalvar } from '../../classes/globalvar';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-finalpayment',
  templateUrl: './finalpayment.component.html',
  styleUrls: ['./finalpayment.component.css']
})
export class FinalpaymentComponent implements OnInit {
  // export class FinalpaymentComponent implements AfterViewInit {

  public CartDonorID;
  public respPay: PaymentResponse[];
  public orderid: string;
  public TransactionStatus: string;
  public TrackingId: string;
  // public ENTRYDATE: Date;
  // public DONOR_EMAILID: string;
  // public DONOR_MOBILE: string;
  // public AMOUNT: string;
  public PAYMENT_MODE: string;
  public checklandingpagecontent: string;
  public isORDER_STATUS: boolean;
  public checklandingpagestatus: boolean;
  public TransactionDetails = [];

  constructor(
    private CartS: CartService,
    private DeleteCart: CartDeleteNeedIdService,
    private router: Router,
    private http: HttpClient,
    private ccpay: PostCcpaymentService,
    private _route: ActivatedRoute) { }


  public FUNDRAISEID;
  public PAYID = [];
  public DESCRIPTION;
  public TRYAGAIN = false

  GetPaymentResponse(OrderId) {
    this.isORDER_STATUS = false;
    // this.CartDonorID = parseFloat(Globalvar.readCookie('CartDonorID'));
    this.CartDonorID;

    this.ccpay.GetNeedPaymentsResponse("", OrderId).subscribe((payresp) => {
      if (payresp.length > 0) {
        this.TransactionDetails = payresp;
        this.PAYMENT_MODE = payresp[0].PAYMENT_MODE
        //console.log("TransactionDetails", payresp)

        if (payresp[0].ORDER_STATUS !== 'Success' && payresp[0].PAYMENT_MODE !== 'Cheque' && payresp[0].PAYMENT_MODE !== 'DD') {
          this.TRYAGAIN = true
        }
        // check onlne 
        if (payresp[0].ORDER_STATUS === "Success") {
          this.isORDER_STATUS = true;
          this.fundraisePost(OrderId)
          localStorage.removeItem("cartItems");
          //console.log("== ONLINE ==")        
        } else if (payresp[0].TYPEOFPAYMENT === 'Offline') {
          this.fundraisePost(OrderId)
          localStorage.removeItem("cartItems");
          //console.log("== Offline ==")        
        }
      }
      else { 
        
        this.TRYAGAIN = true;
      }
    });
  }

  public NoOFCarts;
  fundraisePost(OrderId) {
    this.PAYID = this.TransactionDetails[0].PAY_ID
    //console.log("TransactionDetails", this.PAYID)
    if (this.FUNDRAISEID) {
      var count = 0
      this.PAYID.forEach(element => {
        var body = {
          'FUNDRAISEID': this.FUNDRAISEID,
          'PAYID': element,
          'DESCRIPTION': ''
        }
        this.http.post(Globalvar.ApiUrl + "/PostFundRaisePayId", body).subscribe((data) => {
          count++
          //console.log("PostFundRaisePayId", body, data)
          if (this.PAYID.length == count) {
            var body2 = {
              'FUNDRAISEID': this.FUNDRAISEID,
              'ORDER_ID': OrderId
            }
            this.http.post(Globalvar.ApiUrl + "/PostFundRaiseDonationReceived", body2).subscribe((data2) => {
              //console.log("PostFundRaiseDonationReceived", body2, data2)
              localStorage.removeItem('FUNDRAISEID_FOR_PAYMENT');
            })
          }
        })
      });
    }
    this.DeleteCart.DeleteDonorCartDonorId(this.CartDonorID).subscribe((CartNeedD) => {
      //console.log("Cart Empty!!!");
      this.CartS.CartService(this.CartDonorID).subscribe((CartNeedData) => {
        this.NoOFCarts = CartNeedData.length;
        localStorage.setItem('CartItems', this.NoOFCarts);
      })
    });

  }
  public PaymentFailed = false;

  ngOnInit() {

    Globalvar.donorIdChanged.subscribe(
      (id: number) => {
        this.CartDonorID = id;
      }
    );
    this.CartDonorID = Globalvar.getDonorId();

    this.FUNDRAISEID = localStorage.getItem('FUNDRAISEID_FOR_PAYMENT');

    this.orderid = this._route.snapshot.params.orderid

    //console.log("this.orderid", this._route.snapshot.params.orderid)
    if (this.orderid !== "" && this.orderid !== undefined && this.CartDonorID > 0) {
      this.GetPaymentResponse(this.orderid);
      this.checklandingpagecontent = localStorage.getItem("goto")
      if(this.checklandingpagecontent == "LandingPage"){
        this.checklandingpagestatus = true;
      }
      else{
        this.checklandingpagestatus = false;
      }
      //console.log("true")
    } else {
      //this.router.navigate(['/']);
      this.PaymentFailed = true;
      if(this.checklandingpagecontent == "LandingPage"){
        this.checklandingpagestatus = true;
      }
      else{
        this.checklandingpagestatus = false;
      }
      //console.log("false")
    }

  }

  public printDiv = function (divName) {
    var printContents = document.getElementById(divName).innerHTML;
    var popupWin = window.open('', '_blank', 'width=800,height=800');
    popupWin.document.open();
    popupWin.document.write('<html><head><link rel="stylesheet" type="text/css" href="style.css" /></head><body onload="window.print()">' + printContents + '</body></html>');
    popupWin.document.close();
  }

}
