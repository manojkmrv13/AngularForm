import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Globalvar } from '../../classes/globalvar';
import { Donorprofile } from '../../classes/donorprofile';
import { DonorprofileService } from '../../services/donorprofile.service';
import { CartService } from '../../services/cart.service';
import { PostCcpaymentService } from '../../services/post-ccpayment.service';
import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CartDeleteNeedIdService } from '../../services/cart-delete-need-id.service';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core'
import { MY_FORMATS } from '../../account/tax-certificates/tax-certificates.component';
import { NgxSpinnerService } from 'ngx-spinner';

declare var $: any;
let options: NgbModalOptions = {
  size: 'lg'
};

@Component({
  selector: 'app-paymentmode',
  templateUrl: './paymentmode.component.html',
  styleUrls: ['./paymentmode.component.css'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
  ]
})
export class PaymentmodeComponent implements OnInit {
  @ViewChild('form', {static: false}) form: ElementRef;
  @ViewChild('formAxis', {static: false}) formAxis: ElementRef;
  @ViewChild('formHDFC', {static: false}) formHDFC: ElementRef;

  MERCHANTID = "";
  ACCESSCODE = "";
  ENCRYPTION_KEY = "";
  public showPaymentBtn = false
  public encRequest: String = '';
  //public accessCode: String;
  public CCA_REQUEST_URL: String = Globalvar.CCA_REQUEST_URL;
  public oweburl: String = Globalvar.WebUrl + "oauth/CS_EMA_3Party_DO.aspx";
  public rweburl: String = Globalvar.WebUrl + "oauth/CS_EMA_3Party_DR.aspx";

  //public HDFC_REQUEST_URL: String = Globalvar.WebUrl + "oauth/SendPerformREQuest.aspx";
  public HDFC_REQUEST_URL: String = Globalvar.WebUrl + "oauth/SendPerformREQuestFT.aspx";

  public AXIS_REQUEST_URL: String = Globalvar.AXIS_REQUEST_URL;

  public vpc_AccessCode: String;
  public vpc_MerchTxnRef: String;
  public vpc_OrderInfo: String;
  public vpc_Amount: String;
  public IDMSId: any;

  public hdfc_track_id: String;
  public hdfc_udf1: String;
  public hdfc_vpc_Amount: String;

  public CartDonorID;
  public ApiUserId;
  public NeedForCart = [];

  public dnr: Donorprofile[];

  public BillingName: string;
  public BillingAddress: string;
  public BillingCity: string;
  public BillingState: string;
  public BillingCountry: string;
  public BillingZip: string;
  public BillingTel: string;
  public BillingEmail: string;
  public TotalAmt;

  constructor(
    private CartS: CartService,
    private dnrs: DonorprofileService,
    private ccpay: PostCcpaymentService,
    private modalService: NgbModal,
    private Http: HttpClient,
    private spinner: NgxSpinnerService,
    private DeleteCart: CartDeleteNeedIdService,
    private router: Router) { }

  RadioButtonControl() {
    $("input[type='radio']").each(function () {
      if ($(this).prop("checked") == true) {
        $(this).parents(".radioBtnBox").addClass("active")
      } else {
        $(this).parents(".radioBtnBox").removeClass("active")
      }
    })
  }

  commaSeparater() {
    setTimeout(function () {
      $('.typeNumberOnly').each(function (index, element) {
        $(this).on("keyup", function (event) {

          var selection = window.getSelection().toString();
          if (selection !== '') {
            return;
          }
          if ($.inArray(event.keyCode, [38, 40, 37, 39]) !== -1) {
            return;
          }
          var $this = $(this);
          var input = $this.val();
          var input = input.replace(/[\D\s\._\-]+/g, "");
          input = input ? parseInt(input, 10) : 0;
          $this.val(function () {
            return (input === 0) ? "" : input.toLocaleString("en-US");
          });
        });
      });

      $('.typeNumberOnly').each(function (index, element) {
        var $this = $(this);
        var input = $this.val();
        var input = input.replace(/[\D\s\._\-]+/g, "");
        input = input ? parseInt(input, 10) : 0;
        $this.val(function () {
          return (input === 0) ? "" : input.toLocaleString("en-US");
        });
      });
    }, 10)

  }

  GetEncRequest(orderid) {

    this.MERCHANTID = Globalvar.CCA_MERCHANTID;
    this.ACCESSCODE = Globalvar.CCA_ACCESSCODE;
    this.ENCRYPTION_KEY = Globalvar.CCA_ENCRYPTION_KEY;
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    var NRI_STATUS = localStorage.getItem('NRI_STATUS');
    if (currentUser != null) {
      NRI_STATUS = currentUser[0].NRI_STATUS;
      if (NRI_STATUS == "2") {
        this.ACCESSCODE = Globalvar.CCA_ACCESSCODE_NRI;
        this.MERCHANTID = Globalvar.CCA_MERCHANTID_NRI;
        this.ENCRYPTION_KEY = Globalvar.CCA_ENCRYPTION_KEY_NRI;
      }
    }

    //this.accessCode = Globalvar.CCA_ACCESSCODE;
    //this.CartDonorID = parseFloat(Globalvar.readCookie('CartDonorID'));
    this.CartDonorID;
    //this.GetCartNeedItem(this.CartDonorID);
    this.TotalAmt = 0.0;
    this.CartS.CartService(this.CartDonorID).subscribe((CartNeedData) => {
      CartNeedData.forEach(element => {
        this.TotalAmt = this.TotalAmt + element.AMOUNT;
        //console.log("this.TotalAmt: " + this.TotalAmt);
      });

      //var orderid = parseFloat(Globalvar.readCookie('orderid'));
      //console.log("orderid: " + orderid);

      this.dnrs.GetDonorProfile("", this.CartDonorID).subscribe((dnr) => {
        //console.log("dnr: ", dnr);
        if (dnr.length > 0) {
          if (dnr[0].DONORID > 0) {
            this.dnr = dnr;
            // console.log("this.dnr:", this.dnr);
            if (this.dnr.length > 0) {
              this.BillingName = this.dnr[0].FIRSTNAME + ' ' + this.dnr[0].LASTNAME;
              this.BillingAddress = this.dnr[0].ADDRESS_LINE_1 + ', ' + this.dnr[0].ADDRESS_LINE_2 + ', ' + this.dnr[0].ADDRESS_LINE_3;
              this.BillingCity = this.dnr[0].CITY;
              this.BillingState = this.dnr[0].STATE;
              this.BillingZip = this.dnr[0].PINCODE;
              this.BillingCountry = this.dnr[0].COUNTRY;
              this.BillingTel = this.dnr[0].TELEPHONE;
              this.BillingEmail = this.dnr[0].EMAILID;
              var body = {
                'TID': new Date().getTime(),
                'MERCHANT_ID': this.MERCHANTID,
                'ORDER_ID': orderid,
                'AMOUNT': this.TotalAmt,
                'CURRENCY': "INR",
                'REDIRECT_URL': Globalvar.WebUrl + "oauth/ccavResponseHandler.aspx",
                'CANCEL_URL': Globalvar.WebUrl + "oauth/ccavResponseHandler.aspx",
                'BILLING_NAME': this.BillingName,
                'BILLING_ADDRESS': this.BillingAddress,
                'BILLING_CITY': this.BillingCity,
                'BILLING_STATE': this.BillingState,
                'BILLING_ZIP': this.BillingZip,
                'BILLING_COUNTRY': this.BillingCountry,
                'BILLING_TEL': this.BillingTel,
                'BILLING_EMAIL': this.BillingEmail,
                'DELIVERY_NAME': this.BillingName,
                'DELIVERY_ADDRESS': this.BillingAddress,
                'DELIVERY_CITY': this.BillingCity,
                'DELIVERY_STATE': this.BillingState,
                'DELIVERY_ZIP': this.BillingZip,
                'DELIVERY_COUNTRY': this.BillingCountry,
                'DELIVERY_TEL': this.BillingTel,
                'MERCHANT_PARAM1': "website",
                'MERCHANT_PARAM2': "",
                'MERCHANT_PARAM3': "",
                'MERCHANT_PARAM4': "",
                'MERCHANT_PARAM5': "",
                'PROMO_CODE': "",
                'CUSTOMER_IDENTIFIER': ""
              };

              //console.log(body);
              this.ccpay.GetEncryptedRequest(body).subscribe(data => {

                this.encRequest = String(data);

                // console.log("encRequest1:" + this.encRequest);

                if (this.encRequest != "") {
                  setTimeout(() => {
                    this.form.nativeElement.submit();
                  }, 2000);
                }
                // console.log("encRequest2:" + this.encRequest);
              }, error => {
                //console.log(error)
              });
            }
          }
        }
      });
    });
  }

  ProceedToPaymentHDFC() {
    this.spinner.show();
    var date = new Date();
    var components = [
      date.getFullYear(),
      date.getMonth() + 1,
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
      date.getSeconds(),
      date.getMilliseconds()
    ];
    // var orderid = components.join("");
    var currdate = (date.getMonth() + 1).toString() + "/" + date.getDate().toString() + "/" + date.getFullYear().toString();

    // this.hdfc_track_id = orderid;
    this.hdfc_vpc_Amount = String(this.OP_Amount);

    if (this.NeedForCart.length > 0) {

      var strItemDetails = "";
      this.NeedForCart.forEach((elembody, index, element) => {
        var CartFrequency = 1;
        switch (elembody.CART_PAYMENT_FREQUENCY) {
          case "Monthly":
            CartFrequency = 1;
            break;
          case "Quarterly":
            CartFrequency = 3;
            break;
          case "Half-Yearly":
            CartFrequency = 6;
            break;
          case "Yearly":
            CartFrequency = 12;
            break;
          default:
            CartFrequency = 1;
            break;
        }

        strItemDetails = strItemDetails + "{";
        strItemDetails = strItemDetails + "\"ProductID\": 0,";
        strItemDetails = strItemDetails + "\"NeedID\": " + elembody.DESIGNATIONID + ",";
        strItemDetails = strItemDetails + "\"GiftMessage\": \"\",";
        strItemDetails = strItemDetails + "\"Quantity\": " + (elembody.QUANTITY === 0 ? 1 : elembody.QUANTITY) + ",";
        strItemDetails = strItemDetails + "\"Amount\": " + String(elembody.AMOUNT) + ",";
        strItemDetails = strItemDetails + "\"PledgeType\": 4,";
        strItemDetails = strItemDetails + "\"frequency\": " + CartFrequency + ",";
        strItemDetails = strItemDetails + "\"ProjectId\": \"\"";
        if (index === (element.length - 1))
          strItemDetails = strItemDetails + "}";
        else
          strItemDetails = strItemDetails + "},";
      });

      // console.log("strItemDetails:" + strItemDetails);

      var formdatas = new FormData();
      formdatas.append("data", "{\"order\": {\"LeadId\": " + this.ApiUserId + ", " +
        "\"TotalAmount\": " + String(this.OP_Amount) + ", " +
        "\"Status\": \"1\", " +
        "\"Device\": \"" + localStorage.getItem('Device') + "\", " +
        "\"MotoCode\": " + this.MotCode + ", " +
        "\"PaymentGateway\": \"HDFC\", " +
        "\"TransactionDate\": \"" + currdate + "\", " +
        "\"ChequeNo\": \"\"}," +
        "\"itemDetails\": [" +
        strItemDetails +
        "]}"
      );

      // console.log("formdatas:", formdatas);

      var settings = {
        "async": false,
        "crossDomain": true,
        "url": Globalvar.ApiUrl + "PostPaymentToClient",
        //"url": "http://localhost:53550/wvi/PostPaymentToClient",
        "method": "POST",
        // "headers": {
        //   "cache-control": "no-cache"
        // },
        "processData": false,
        "contentType": false,
        "mimeType": "multipart/form-data",
        "data": formdatas
      }

      $.ajax(settings).done(function (response) {
        //console.log(response);
        var t = response;
        t = JSON.parse(t.slice(1, -1));
        // alert(t['STATUSES']);

        var x = JSON.stringify(t['STATUSES']);
        x = JSON.parse(x.slice(1, -1));
        // alert(x['status1'].toString().split("|")[1].toString());

        this.status1 = x['status1'].toString().split("|")[1].toString();
        //console.log("PostPaymentToClient:: " + this.status1);

        localStorage.setItem('IDMS_ID', '' + this.status1);
      });

      var HDFC_Payment = setInterval(() => {
        if (localStorage.getItem('IDMS_ID') !== "0" && localStorage.getItem('IDMS_ID') !== "" && localStorage.getItem('IDMS_ID') !== undefined) {
          clearInterval(HDFC_Payment)
          this.hdfc_track_id = localStorage.getItem('IDMS_ID');
          this.hdfc_udf1 = 'website';
          this.NeedForCart.forEach((elemCart, index, element) => {
            var body1 = {
              // 'ORDER_ID': orderid,
              'ORDER_ID': localStorage.getItem('IDMS_ID'),
              'IDMS_ID': localStorage.getItem('IDMS_ID'),
              'DONORID': this.CartDonorID,
              'NEEDID': elemCart.NEEDID,
              'AMOUNT': elemCart.AMOUNT,
              'ACTUAL_AMOUNT': elemCart.ACTUAL_AMOUNT,
              'PAYMENT_NEED_QUANTITY': elemCart.QUANTITY,
              'PAYMENTSTATUS': 'Initiated',
              'TYPEOFPAYMENT': 'Online',
              'SOCIALHOURSDONATION': '',
              'ASSETSDESCRIPTION': '',
              'IPADDRESS': '',
              'USERAGENT': '',
              'CREATEDBY': '',
              'MOTCODE': this.MotCode,
              'PAYMENT_GATEWAY': 'HDFC',
              'DEVICE': localStorage.getItem('Device')
            };
            //console.log("body1", body1)

            this.ccpay.PostNeedPayment(body1).subscribe((data1) => {

              // if (iCnt == this.NeedForCart.length) {
              if (index === (element.length - 1)) {
                localStorage.removeItem('IDMS_ID');
                //this.spinner.hide();
                setTimeout(() => {
                  this.formHDFC.nativeElement.submit();
                }, 2000);

              }
            });
          });
        }
        //console.log("HDFC Payment", localStorage.getItem('IDMS_ID'));
      }, 100)


      // setTimeout(() => {

      //   console.log("PostNeedPayment:: " + localStorage.getItem('IDMS_ID'));
      //   if (localStorage.getItem('IDMS_ID') !== "0" && localStorage.getItem('IDMS_ID') !== "" && localStorage.getItem('IDMS_ID') !== undefined) {
      //     this.hdfc_track_id = localStorage.getItem('IDMS_ID');

      //     this.NeedForCart.forEach((elemCart, index, element) => {
      //       var body1 = {
      //         // 'ORDER_ID': orderid,
      //         'ORDER_ID': localStorage.getItem('IDMS_ID'),
      //         'IDMS_ID': localStorage.getItem('IDMS_ID'),
      //         'DONORID': this.CartDonorID,
      //         'NEEDID': elemCart.NEEDID,
      //         'AMOUNT': elemCart.AMOUNT,
      //         'ACTUAL_AMOUNT': elemCart.ACTUAL_AMOUNT,
      //         'PAYMENT_NEED_QUANTITY': elemCart.QUANTITY,
      //         'PAYMENTSTATUS': 'Initiated',
      //         'TYPEOFPAYMENT': 'Online',
      //         'SOCIALHOURSDONATION': '',
      //         'ASSETSDESCRIPTION': '',
      //         'IPADDRESS': '',
      //         'USERAGENT': '',
      //         'CREATEDBY': '',
      //         'MOTCODE': this.MotCode,
      //         'PAYMENT_GATEWAY': 'HDFC',
      //         'DEVICE': localStorage.getItem('Device')
      //       };
      //       console.log("body1", body1)

      //       this.ccpay.PostNeedPayment(body1).subscribe((data1) => {

      //         // if (iCnt == this.NeedForCart.length) {
      //         if (index === (element.length - 1)) {
      //           localStorage.removeItem('IDMS_ID');
      //           //this.spinner.hide();
      //           setTimeout(() => {
      //             this.formHDFC.nativeElement.submit();
      //           }, 2000);

      //         }
      //       });
      //     });
      //   }
      // }, 2000);
    }

  }

  public MotCode;
  ProceedToPaymentAxis() {
    this.spinner.show();
    var date = new Date();
    var components = [
      date.getFullYear(),
      date.getMonth() + 1,
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
      date.getSeconds(),
      date.getMilliseconds()
    ];
    // var orderid = components.join("");
    var currdate = (date.getMonth() + 1).toString() + "/" + date.getDate().toString() + "/" + date.getFullYear().toString();

    this.vpc_AccessCode = Globalvar.AXIS_ACCESSCODE;
    // this.vpc_MerchTxnRef = orderid;
    // this.vpc_OrderInfo = orderid;
    this.vpc_Amount = String(this.OP_Amount);

    // var iCnt = 0;
    if (this.NeedForCart.length > 0) {

      var strItemDetails = "";
      this.NeedForCart.forEach((elembody, index, element) => {
        var CartFrequency = 1;
        switch (elembody.CART_PAYMENT_FREQUENCY) {
          case "Monthly":
            CartFrequency = 1;
            break;
          case "Quarterly":
            CartFrequency = 3;
            break;
          case "Half-Yearly":
            CartFrequency = 6;
            break;
          case "Yearly":
            CartFrequency = 12;
            break;
          default:
            CartFrequency = 1;
            break;
        }

        strItemDetails = strItemDetails + "{";
        strItemDetails = strItemDetails + "\"ProductID\": 0,";
        strItemDetails = strItemDetails + "\"NeedID\": " + elembody.DESIGNATIONID + ",";
        strItemDetails = strItemDetails + "\"GiftMessage\": \"\",";
        strItemDetails = strItemDetails + "\"Quantity\": " + (elembody.QUANTITY === 0 ? 1 : elembody.QUANTITY) + ",";
        strItemDetails = strItemDetails + "\"Amount\": " + String(elembody.AMOUNT) + ",";
        strItemDetails = strItemDetails + "\"PledgeType\": 4,";
        strItemDetails = strItemDetails + "\"frequency\": " + CartFrequency + ",";
        strItemDetails = strItemDetails + "\"ProjectId\": \"\"";
        if (index === (element.length - 1))
          strItemDetails = strItemDetails + "}";
        else
          strItemDetails = strItemDetails + "},";
      });

      // console.log("strItemDetails:" + strItemDetails);

      var formdatas = new FormData();
      formdatas.append("data", "{\"order\": {\"LeadId\": " + this.ApiUserId + ", " +
        "\"TotalAmount\": " + String(this.OP_Amount) + ", " +
        "\"Status\": \"1\", " +
        "\"Device\": \"" + localStorage.getItem('Device') + "\", " +
        "\"MotoCode\": " + this.MotCode + ", " +
        "\"PaymentGateway\": \"AXIS\", " +
        "\"TransactionDate\": \"" + currdate + "\", " +
        "\"ChequeNo\": \"\"}," +
        "\"itemDetails\": [" +
        strItemDetails +
        "]}"
      );

      // console.log("formdatas:", formdatas);

      var settings = {
        "async": false,
        "crossDomain": true,
        "url": Globalvar.ApiUrl + "PostPaymentToClient",
        //"url": "http://localhost:53550/wvi/PostPaymentToClient",
        "method": "POST",
        // "headers": {
        //   "cache-control": "no-cache"
        // },
        "processData": false,
        "contentType": false,
        "mimeType": "multipart/form-data",
        "data": formdatas
      }

      $.ajax(settings).done(function (response) {
        //console.log(response);
        var t = response;
        t = JSON.parse(t.slice(1, -1));
        // alert(t['STATUSES']);

        var x = JSON.stringify(t['STATUSES']);
        x = JSON.parse(x.slice(1, -1));
        // alert(x['status1'].toString().split("|")[1].toString());

        this.status1 = x['status1'].toString().split("|")[1].toString();
        //console.log("PostPaymentToClient:: " + this.status1);

        localStorage.setItem('IDMS_ID', '' + this.status1);
      });


      var AXIS_Payment = setInterval(() => {
        //console.log("PostNeedPayment:: " + localStorage.getItem('IDMS_ID'));
        if (localStorage.getItem('IDMS_ID') !== "0" && localStorage.getItem('IDMS_ID') !== "" && localStorage.getItem('IDMS_ID') !== undefined) {
          clearInterval(AXIS_Payment)
          this.vpc_MerchTxnRef = localStorage.getItem('IDMS_ID');
          this.vpc_OrderInfo = localStorage.getItem('IDMS_ID');

          this.NeedForCart.forEach((elemCart, index, element) => {
            var body1 = {
              // 'ORDER_ID': orderid,
              'ORDER_ID': localStorage.getItem('IDMS_ID'),
              'IDMS_ID': localStorage.getItem('IDMS_ID'),
              'DONORID': this.CartDonorID,
              'NEEDID': elemCart.NEEDID,
              'AMOUNT': elemCart.AMOUNT,
              'ACTUAL_AMOUNT': elemCart.ACTUAL_AMOUNT,
              'PAYMENT_NEED_QUANTITY': elemCart.QUANTITY,
              'PAYMENTSTATUS': 'Initiated',
              'TYPEOFPAYMENT': 'Online',
              'SOCIALHOURSDONATION': '',
              'ASSETSDESCRIPTION': '',
              'IPADDRESS': '',
              'USERAGENT': '',
              'CREATEDBY': '',
              'MOTCODE': this.MotCode,
              'PAYMENT_GATEWAY': 'AXIS',
              'DEVICE': localStorage.getItem('Device')
            };
            //console.log("body1", body1)

            this.ccpay.PostNeedPayment(body1).subscribe((data1) => {

              // if (iCnt == this.NeedForCart.length) {
              if (index === (element.length - 1)) {
                localStorage.removeItem('IDMS_ID');
                //this.spinner.hide();
                setTimeout(() => {
                  this.formAxis.nativeElement.submit();
                }, 2000);
              }
            });
          });
        }
      }, 100);
    }
  }

  ProceedToPayment() {
    this.spinner.show();
    var date = new Date();
    var components = [
      date.getFullYear(),
      date.getMonth() + 1,
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
      date.getSeconds(),
      date.getMilliseconds()
    ];
    // var orderid = components.join("");
    var currdate = (date.getMonth() + 1).toString() + "/" + date.getDate().toString() + "/" + date.getFullYear().toString();
    //document.cookie = "orderid=" + orderid;

    // var iCnt = 0;
    if (this.NeedForCart.length > 0) {

      var strItemDetails = "";
      this.NeedForCart.forEach((elembody, index, element) => {
        var CartFrequency = 1;
        switch (elembody.CART_PAYMENT_FREQUENCY) {
          case "Monthly":
            CartFrequency = 1;
            break;
          case "Quarterly":
            CartFrequency = 3;
            break;
          case "Half-Yearly":
            CartFrequency = 6;
            break;
          case "Yearly":
            CartFrequency = 12;
            break;
          default:
            CartFrequency = 1;
            break;
        }

        strItemDetails = strItemDetails + "{";
        strItemDetails = strItemDetails + "\"ProductID\": 0,";
        strItemDetails = strItemDetails + "\"NeedID\": " + elembody.DESIGNATIONID + ",";
        strItemDetails = strItemDetails + "\"GiftMessage\": \"\",";
        strItemDetails = strItemDetails + "\"Quantity\": " + (elembody.QUANTITY === 0 ? 1 : elembody.QUANTITY) + ",";
        strItemDetails = strItemDetails + "\"Amount\": " + String(elembody.AMOUNT) + ",";
        strItemDetails = strItemDetails + "\"PledgeType\": 4,";
        strItemDetails = strItemDetails + "\"frequency\": " + CartFrequency + ",";
        strItemDetails = strItemDetails + "\"ProjectId\": \"\"";
        if (index === (element.length - 1))
          strItemDetails = strItemDetails + "}";
        else
          strItemDetails = strItemDetails + "},";
      });

      // console.log("strItemDetails:" + strItemDetails);

      var formdatas = new FormData();
      formdatas.append("data", "{\"order\": {\"LeadId\": " + this.ApiUserId + ", " +
        "\"TotalAmount\": " + String(this.OP_Amount) + ", " +
        "\"Status\": \"1\", " +
        "\"Device\": \"" + localStorage.getItem('Device') + "\", " +
        "\"MotoCode\": " + this.MotCode + ", " +
        "\"PaymentGateway\": \"CCA\", " +
        "\"TransactionDate\": \"" + currdate + "\", " +
        "\"ChequeNo\": \"\"}," +
        "\"itemDetails\": [" +
        strItemDetails +
        "]}"
      );

      // console.log("formdatas:", formdatas);

      var settings = {
        "async": false,
        "crossDomain": true,
        "url": Globalvar.ApiUrl + "PostPaymentToClient",
        //"url": "http://localhost:53550/wvi/PostPaymentToClient",
        "method": "POST",
        // "headers": {
        //   "cache-control": "no-cache"
        // },
        "processData": false,
        "contentType": false,
        "mimeType": "multipart/form-data",
        "data": formdatas
      }


      $.ajax(settings).done(function (response) {
        //console.log(response);
        var t = response;
        t = JSON.parse(t.slice(1, -1));
        // alert(t['STATUSES']);

        var x = JSON.stringify(t['STATUSES']);
        x = JSON.parse(x.slice(1, -1));
        // alert(x['status1'].toString().split("|")[1].toString());

        this.status1 = x['status1'].toString().split("|")[1].toString();
        //console.log("PostPaymentToClient:: " + this.status1);

        localStorage.setItem('IDMS_ID', '' + this.status1);
      });



      var ccPayment = setInterval(() => {
        if (localStorage.getItem('IDMS_ID') !== "0" && localStorage.getItem('IDMS_ID') !== "" && localStorage.getItem('IDMS_ID') !== undefined) {
          clearInterval(ccPayment);
          this.NeedForCart.forEach((elemCart, index, element) => {
            var body1 = {
              // 'ORDER_ID': orderid,
              'ORDER_ID': localStorage.getItem('IDMS_ID'),
              'IDMS_ID': localStorage.getItem('IDMS_ID'),
              'DONORID': this.CartDonorID,
              'NEEDID': elemCart.NEEDID,
              'AMOUNT': elemCart.AMOUNT,
              'ACTUAL_AMOUNT': elemCart.ACTUAL_AMOUNT,
              'PAYMENT_NEED_QUANTITY': elemCart.QUANTITY,
              'PAYMENTSTATUS': 'Initiated',
              'TYPEOFPAYMENT': 'Online',
              'SOCIALHOURSDONATION': '',
              'ASSETSDESCRIPTION': '',
              'IPADDRESS': '',
              'USERAGENT': '',
              'CREATEDBY': '',
              'MOTCODE': this.MotCode,
              'PAYMENT_GATEWAY': 'CCA',
              'DEVICE': localStorage.getItem('Device')
            };
            //console.log("body1", body1)
            this.ccpay.PostNeedPayment(body1).subscribe((data1) => {

              //console.log("index: " + index.toString());
              //console.log("element.length: " + element.length.toString());

              // if (iCnt == this.NeedForCart.length) {
              if (index === (this.NeedForCart.length - 1)) {
                //console.log("Inside index: " + index.toString());
                //console.log("Inside element.length: " + element.length.toString());

                //this.spinner.hide();
                setTimeout(() => {
                  // this.GetEncRequest(orderid);
                  this.GetEncRequest(localStorage.getItem('IDMS_ID'));
                  localStorage.removeItem('IDMS_ID');
                }, 500);
              }


            });
          });
        }
        //console.log("IDMS ID", localStorage.getItem('IDMS_ID'))
      })
    }
  }

  private formSubmitAttempt: boolean;

  closeResult: string;
  public OP_Name;
  public OP_Email;
  public OP_Mobile;
  public OP_BankName;
  public OP_Branch;
  public OP_DD_Cheque;
  public OP_DD_Cheque_Number;
  public OP_DD_Cheque_Date;
  public OP_Amount;

  // DONOR DETAILS 
  public totalCartAmount;

  GetDonorDetails() {
    this.dnrs.GetDonorUsersLead().subscribe((details) => {
      //console.log("Donor Details", details)
      this.OP_Name = details[0].FIRSTNAME
      this.OP_Email = details[0].EMAILID
      this.OP_Mobile = details[0].MOBILE
      this.OP_Amount = this.totalCartAmount
    })
  }

  public OfflinePaymentSuccess = false

  ProceedToOfflinePayment(ngForm) {
    //console.log("_ngForm", ngForm)
    if (ngForm.valid) {
      this.spinner.show();
      var date = new Date();
      var components = [
        date.getFullYear(),
        date.getMonth() + 1,
        date.getDate(),
        date.getHours(),
        date.getMinutes(),
        date.getSeconds(),
        date.getMilliseconds()
      ];
      // var orderid = components.join("");
      var currdate = (date.getMonth() + 1).toString() + "/" + date.getDate().toString() + "/" + date.getFullYear().toString();
      //document.cookie = "orderid=" + orderid;


      // var iCnt = 0;
      if (this.NeedForCart.length > 0) {

        var strItemDetails = "";
        this.NeedForCart.forEach((elembody, index, element) => {
          var CartFrequency = 1;
          switch (elembody.CART_PAYMENT_FREQUENCY) {
            case "Monthly":
              CartFrequency = 1;
              break;
            case "Quarterly":
              CartFrequency = 3;
              break;
            case "Half-Yearly":
              CartFrequency = 6;
              break;
            case "Yearly":
              CartFrequency = 12;
              break;
            default:
              CartFrequency = 1;
              break;
          }

          strItemDetails = strItemDetails + "{";
          strItemDetails = strItemDetails + "\"ProductID\": 0,";
          strItemDetails = strItemDetails + "\"NeedID\": " + elembody.DESIGNATIONID + ",";
          strItemDetails = strItemDetails + "\"GiftMessage\": \"\",";
          strItemDetails = strItemDetails + "\"Quantity\": " + (elembody.QUANTITY === 0 ? 1 : elembody.QUANTITY) + ",";
          strItemDetails = strItemDetails + "\"Amount\": " + String(elembody.AMOUNT) + ",";
          strItemDetails = strItemDetails + "\"PledgeType\": 4,";
          strItemDetails = strItemDetails + "\"frequency\": " + CartFrequency + ",";
          strItemDetails = strItemDetails + "\"ProjectId\": \"\"";
          if (index === (element.length - 1))
            strItemDetails = strItemDetails + "}";
          else
            strItemDetails = strItemDetails + "},";
        });

        var formdatas = new FormData();
        formdatas.append("data", "{\"order\": {\"LeadId\": " + this.ApiUserId + ", " +
          "\"TotalAmount\": " + String(this.OP_Amount) + ", " +
          "\"Status\": \"2\", " +
          "\"Device\": \"" + localStorage.getItem('Device') + "\", " +
          "\"MotoCode\": " + this.MotCode + ", " +
          "\"PaymentGateway\": \"DD\", " +
          "\"TransactionDate\": \"" + currdate + "\", " +
          "\"ChequeNo\": \"" + ngForm.value.DD_Cheque + "\"}," +
          "\"itemDetails\": [" +
          strItemDetails +
          "]}"
        );

        var settings = {
          "async": false,
          "crossDomain": true,
          "url": Globalvar.ApiUrl + "PostPaymentToClient",
          //"url": "http://localhost:53550/wvi/PostPaymentToClient",
          "method": "POST",
          // "headers": {
          //   "cache-control": "no-cache"
          // },
          "processData": false,
          "contentType": false,
          "mimeType": "multipart/form-data",
          "data": formdatas
        }

        $.ajax(settings).done(function (response) {
          //console.log(response);
          var t = response;
          t = JSON.parse(t.slice(1, -1));
          // alert(t['STATUSES']);

          var x = JSON.stringify(t['STATUSES']);
          x = JSON.parse(x.slice(1, -1));
          // alert(x['status1'].toString().split("|")[1].toString());

          this.status1 = x['status1'].toString().split("|")[1].toString();
          //console.log("PostPaymentToClient:: " + this.status1);

          localStorage.setItem('IDMS_ID', '' + this.status1);
        });

        //console.log("strItemDetails:" + strItemDetails);

        //console.log("formdatas:", formdatas);

        //var thisO = this
        var DD_Payment = setInterval(() => {
          if (localStorage.getItem('IDMS_ID') !== "0" && localStorage.getItem('IDMS_ID') !== "" && localStorage.getItem('IDMS_ID') !== undefined) {

            clearInterval(DD_Payment)
            var TotalCartsAmounts = 0;
            this.NeedForCart.forEach((elemCart, index, element) => {
              //console.log("_ngForm2", ngForm)
              var body1 = {
                // 'ORDER_ID': orderid,
                'ORDER_ID': localStorage.getItem('IDMS_ID'),
                'IDMS_ID': localStorage.getItem('IDMS_ID'),
                'DONORID': this.CartDonorID,
                'NEEDID': elemCart.NEEDID,
                'AMOUNT': elemCart.AMOUNT,
                'ACTUAL_AMOUNT': elemCart.ACTUAL_AMOUNT,
                'PAYMENT_NEED_QUANTITY': elemCart.QUANTITY,
                'PAYMENTSTATUS': 'Initiated',
                'MODEOFPAYMENT': ngForm.value.DD,
                'TYPEOFPAYMENT': 'Offline',
                'IDENTIFICATIONNO': ngForm.value.DD_Cheque,
                'CHEQUECARDDATE': ngForm.value.TXT_DD_Cheque_Date,
                'BANKNAME': ngForm.value.BankName,
                'ACCOUNTNUMBER': '',
                'CHEQUECARDNAME': '',
                'EXPIRYMONTHYEAR': '',
                'SOCIALHOURSDONATION': '',
                'ASSETSDESCRIPTION': '',
                'IPADDRESS': '',
                'USERAGENT': '',
                'CREATEDBY': '',
                'MOTCODE': this.MotCode,
                'PAYMENT_GATEWAY': ngForm.value.DD,
                'DEVICE': localStorage.getItem('Device')
              };
              TotalCartsAmounts = TotalCartsAmounts + elemCart.AMOUNT
              //console.log("body1", body1);
              //console.log("ngForm1", ngForm.value)
              var PAYMENT_MODE = '' + ngForm.value.DD
              this.ccpay.PostNeedPayment(body1).subscribe((data1) => {

                // if (iCnt == this.NeedForCart.length) {
                if (index === (element.length - 1)) {

                  //console.log("PaymentOffline Data", data1)
                  // this.DeleteCartNeed(elemCart.NEEDID);

                  this.DeleteCart.DeleteDonorCartDonorId(this.CartDonorID).subscribe((CartNeedD) => {
                    //console.log("Cart Empty", CartNeedD);
                    this.GetCartNeedItem(this.CartDonorID);
                    //console.log("ngForm", ngForm)
                    var bodyRes = {
                      // 'ORDER_ID': orderid,
                      // 'TRACKING_ID': orderid,
                      'ORDER_ID': localStorage.getItem('IDMS_ID'),
                      'TRACKING_ID': localStorage.getItem('IDMS_ID'),
                      'ORDER_STATUS': 'Initiated',
                      'PAYMENT_MODE': PAYMENT_MODE,
                      'CURRENCY': 'INR',
                      'AMOUNT': TotalCartsAmounts
                    };
                    //console.log("bodyRes= ", bodyRes)
                    this.ccpay.PostNeedPaymentResponse(bodyRes).subscribe((dataRes) => {
                      this.OP_BankName = '';
                      this.OP_Branch = '';
                      this.OP_DD_Cheque = '';
                      this.OP_DD_Cheque_Number = '';
                      this.OP_DD_Cheque_Date = '';
                      this.OP_Amount = '';
                      this.router.navigate(['/payment/final/' + localStorage.getItem('IDMS_ID')]);
                      document.getElementById("CloseModelOfflinePayment").click();
                      this.OfflinePaymentSuccess = true
                      this.spinner.hide();
                      localStorage.removeItem('IDMS_ID');
                    });
                  });
                }
              });
            });
          }
          //console.log("IDMS ID", localStorage.getItem('IDMS_ID'))
        }, 100)
      }
    }
  }

  DeleteCartNeed(DltNeedID) {
    this.DeleteCart.CartDeleteService(this.CartDonorID, DltNeedID).subscribe((CartNeedD) => {
      this.GetCartNeedItem(this.CartDonorID);

    });
  }


  open(content) {
    this.modalService.open(content, { size: 'lg', backdropClass: 'light-blue-backdrop', windowClass: 'dark-modal CWUSWapper' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    this.commaSeparater()
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }


  ngOnInit() {
    this.MotCode = sessionStorage.getItem('MotCode');
    Globalvar.donorIdChanged.subscribe(
      (id: number) => {
        this.CartDonorID = id;
        this.GetCartNeedItem(this.CartDonorID);
      }
    );

    this.commaSeparater();
    this.OfflinePaymentSuccess = false;

    this.CartDonorID = Globalvar.getDonorId();
    this.ApiUserId = Globalvar.getApiUserId()
    if (this.CartDonorID > 0) {
      this.GetCartNeedItem(this.CartDonorID);
    }

  }

  public NoOFCarts
  GetCartNeedItem(CartDonID) {
    this.NeedForCart = [];
    this.CartS.CartService(CartDonID).subscribe((CartNeedData) => {
      // //console.log("CartNeedData", CartNeedData)
      this.NoOFCarts = CartNeedData.length
      //localStorage.setItem('CartItems', this.NoOFCarts);
      if (CartNeedData.length > 0) {
        this.NeedForCart = CartNeedData;
        //console.log("NeedForCart:", this.NeedForCart);
      }
      var totalCartAmount = 0
      CartNeedData.forEach(element => {
        totalCartAmount = totalCartAmount + element.AMOUNT
      });
      this.totalCartAmount = totalCartAmount;
      localStorage.setItem('CartItems', this.NoOFCarts)
      this.GetDonorDetails()
    })
  }

}