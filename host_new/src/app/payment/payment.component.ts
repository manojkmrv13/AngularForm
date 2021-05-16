import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PostCcpaymentService } from '../services/post-ccpayment.service';
import { CartService } from '../services/cart.service';
import { CartDeleteNeedIdService } from '../services/cart-delete-need-id.service';
import { Globalvar } from '../classes/globalvar';
import { Router } from '@angular/router';
import { DonorprofileService } from '../services/donorprofile.service';
import { Donorprofile } from '../classes/donorprofile';
import { HttpClient } from '@angular/common/http';

declare var $: any;
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  public NeedForCart = [];
  public NoOFCarts;
  public CartDonorID;
  public CartNeedDataList = [];
  public CartNeedDataList1 = [];
  public GroupNeedName = [];
  public GroupNeedID = [];
  public NewNeedList = [];
  public grpData = [];
  public dnr: Donorprofile[];

  public BillingName: string;
  public BillingAddress: string;
  public BillingCity: string;
  public BillingState: string;
  public BillingCountry: string;
  public BillingZip: string;
  public BillingTel: string;
  public BillingEmail: string;


  constructor(
    private CartS: CartService,
    private DeleteCart: CartDeleteNeedIdService,
    public router: Router,
    private ccpay: PostCcpaymentService,
    private dnrs: DonorprofileService,
    private http: HttpClient,
  ) { }

  public CheckItem
  SubmitDataRedirect(btnName) {
    var thisO = this
    this.CheckItem = 0
    var valueElement = 0
    if ($(".DonateAmountControl").length > 0) {
      $(".DonateAmountControl").each(function () {
        var thisVal = $(this).val()
        thisVal.replace(/\,/g, '');
        if (thisVal) { valueElement++ } else { alert('Please Enter My Contribution'); }
      })
      if ($(".DonateAmountControl").length == valueElement) {
        $(".DonateAmountControl").each(function () {
          var thisID = $(this).attr("id").replace(/\D/g, '');
          var thisVal = $(this).val()
          thisVal = thisVal.replace(/\,/g, '');
          thisO.postNeedForCart(thisID, thisVal, btnName)
        })
      }
    } else {
      this.router.navigate(['/donate']);
    }
  }

  postNeedForCart(ADDNeedID, thisVal, btnName) {
    var _quantity = parseInt($("#Quantity" + ADDNeedID).find("option:selected").text()) > 0 ? parseInt($("#Quantity" + ADDNeedID).find("option:selected").text()) : '';// for Select Quantity
    var _paymentFrequency = $("#payFrequency" + ADDNeedID).length == 1 ? $("#payFrequency" + ADDNeedID).find("option:selected").html().replace(/(\r\n\t|\n|\r\t)/gm, "").replace(/\s/g, "") : '';
    var _actual_amount = $("#actualA" + ADDNeedID).val();

    var cartItem = {
      'NEEDID': parseInt(ADDNeedID),
      'DONORID': this.CartDonorID,
      'QUANTITY': _quantity,
      'CART_PAYMENT_FREQUENCY': _paymentFrequency,
      'AMOUNT': parseFloat(thisVal),
      'ACTUAL_AMOUNT': parseFloat(_actual_amount)
    };

    //console.log("cartItem", cartItem)

    this.http.post(Globalvar.ApiUrl + "/PostDonorCart", cartItem).subscribe((cartData) => {
      this.CheckItem++
      if ($(".DonateAmountControl").length == this.CheckItem) {
        if (btnName == 'Proceed') {
          this.router.navigate(['/payment/details']);
        } else if (btnName == 'AddMoreNeeds') {
          var previousUrl = localStorage.getItem('PreviousUrl')
          if (previousUrl.match('/donate/') && !previousUrl.match('/donate/details')) {
            var newUrl = previousUrl.split('/donate')
            var url = '/donate' + newUrl[1]
            //console.log("== ", url)
            this.router.navigate(['' + url]);
          } else {
            //console.log("previousUrl false")
            this.router.navigate(['/donate']);
          }
          //this.router.navigate(['/donate']);
        }
      }
    });
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
    }, 200)

  }
  ngOnInit() {
    this.commaSeparater();
    Globalvar.donorIdChanged.subscribe(
      (id: number) => {
        this.CartDonorID = id;
        this.GetCartNeedItem(this.CartDonorID);
      }
    );
    this.CartDonorID = Globalvar.getDonorId()
    if (this.CartDonorID > 0) {
      this.GetCartNeedItem(this.CartDonorID);
    } else {
      //alert('Please Login')
      document.getElementById("signupBtn").click()
    }



    $(document).on('keydown', '.typeNumberOnly', function (e) { -1 !== $.inArray(e.keyCode, [46, 8, 9, 27, 13]) || /65|67|86|88/.test(e.keyCode) && (!0 === e.ctrlKey || !0 === e.metaKey) || 35 <= e.keyCode && 40 >= e.keyCode || (e.shiftKey || 48 > e.keyCode || 57 < e.keyCode) && (96 > e.keyCode || 105 < e.keyCode) && e.preventDefault() });
  }

  DeleteCartNeed(DltNeedID) {
    this.DeleteCart.CartDeleteService(this.CartDonorID, DltNeedID).subscribe((CartNeedD) => {
      this.GetCartNeedItem(this.CartDonorID);
    });
  }

  RemoveAllCarts() {
    this.DeleteCart.DeleteDonorCartDonorId(this.CartDonorID).subscribe((CartNeedD) => {
      this.GetCartNeedItem(this.CartDonorID);
    })
  }

  GetCartNeedItem(CartDonID) {
    this.CartNeedDataList = [];
    this.GroupNeedName = [];
    this.GroupNeedID = [];
    this.NeedForCart = [];

    this.TotalAmt = 0;
    this.CartS.CartService(CartDonID).subscribe((CartNeedData) => {

      //console.log("CartNeedData", CartNeedData)
      this.NoOFCarts = CartNeedData.length
      localStorage.setItem('CartItems', this.NoOFCarts);

      if (CartNeedData.length > 0) {
        this.NeedForCart = CartNeedData;
        //console.log("NeedForCart:", this.NeedForCart);

      }

      CartNeedData.forEach(element => {
        if (element.NEED_GROUP_FLAG == 1) {
          this.GroupNeedName.push(element.GROUP_NEED_NAME)
          this.GroupNeedID.push(element.GROUP_NEED_ID)
        } else {
          this.CartNeedDataList.push(element)
          this.TotalAmt = this.TotalAmt + element.AMOUNT
        }
      });

      this.GroupNeedID = Array.from(new Set(this.GroupNeedID));
      this.GroupNeedName = Array.from(new Set(this.GroupNeedName));

      var i;
      this.NewNeedList = []
      for (i = 0; i < this.GroupNeedID.length; i++) {
        this.NewNeedList.push({
          GROUP_NEED_NAME: this.GroupNeedName[i],
          GROUP_NEED_ID: this.GroupNeedID[i]
        })
      }
      //console.log("NewNeedList  ", this.NewNeedList)


      this.NewNeedList.forEach(element => {
        this.grpData = []
        CartNeedData.forEach(element1 => {
          if (element1.NEED_GROUP_FLAG == 1) {
            if (element.GROUP_NEED_NAME == element1.GROUP_NEED_NAME) {
              this.grpData.push(element1)
              this.TotalAmt = this.TotalAmt + element1.AMOUNT
            }
          }
        })
        this.CartNeedDataList.push({
          GROUP_NEED_NAME: element.GROUP_NEED_NAME,
          GROUP_NEED_ID: element.GROUP_NEED_ID,
          NEEDS_CHILD: this.grpData
        })
      });
      //console.log("CartNeedDataList", this.CartNeedDataList)
      //console.log("TOTAL AMOUND", this.TotalAmt)

      this.CartNeedDataList.forEach(element => {
        element.NEEDS_CHILD.forEach(element1 => {
          setTimeout(function () {
            $("#payFrequency" + element1.NEEDID).val(element1.ACTUAL_AMOUNT)
            $("#actualA" + element1.NEEDID).val(element1.ACTUAL_AMOUNT)
            $("#Quantity" + element1.NEEDID).val(element1.ACTUAL_AMOUNT)
          }, 10)
        });
        setTimeout(function () {
          $("#actualA" + element.NEEDID).val(element.ACTUAL_AMOUNT)
          $("#Quantity" + element.NEEDID).val(element.ACTUAL_AMOUNT)
        }, 10)
      });
      this.commaSeparater()
    })

  }



  CalculateRemaingAmt(NEED_AMOUNT, ADMINISTRATION_CHARGES) {
    return (NEED_AMOUNT - ADMINISTRATION_CHARGES).toFixed(0);
  };

  giftAmountCalc(giftAmount, targetCtrl, e) {
    var thisVN = (giftAmount * e.target.value).toString()
    var thisVWithComa: any = thisVN.replace(/[\D\s\._\-]+/g, "");
    thisVWithComa = thisVWithComa ? parseInt(thisVWithComa, 10) : 0;
    thisVWithComa = (thisVWithComa === 0) ? "" : thisVWithComa.toLocaleString("en-US");
    $("#donateA" + targetCtrl).val(thisVWithComa)
    $("#actualA" + targetCtrl).val(e.target.value)
    this.totalDonation();
  }

  customeSelectControl(DA, nID, e) {
    var dAmount = DA, thisV = e.target.value, targetID = nID, thisVWithComa
    thisVWithComa = thisV.replace(/[\D\s\._\-]+/g, "");
    thisVWithComa = thisVWithComa ? parseInt(thisVWithComa, 10) : 0;
    thisVWithComa = (thisVWithComa === 0) ? "" : thisVWithComa.toLocaleString("en-US");
    $("#donateA" + targetID).val(thisVWithComa)
    $("#actualA" + targetID).val(thisV)
    this.totalDonation();
  }

  addMoreCart() {
    this.router.navigate(['/payment']);
  }


  public amount;
  public TotalAmt;
  donationAmount(reminingAmount, minimumAmount, e) {
    if(e.target.value !== '' && e.target.value !== undefined){
    //console.log("reminingA", reminingAmount, "minimumA", reminingAmount)
    var reminingA = Math.round(reminingAmount), minimumA = Math.round(minimumAmount)
    var thisObj = e.target.id
    var thisValue = e.target.value

    thisValue = Math.round(thisValue.replace(/\,/g, ''));
    //console.log("reminingA", reminingA, "minimumA", minimumA, "this amount", thisValue)

    if (reminingA < minimumA) {
      if (thisValue > reminingA) {
        alert(' Contribution amount should be less than equal to ' + reminingA)
        $("#" + thisObj).val(this.ReplaceWithComa(reminingA))
        //$("#" + thisObj).val('')
      } else {
        this.amount = thisValue
      }
    } else {
      if (reminingA >= thisValue && minimumA <= thisValue) {
        this.amount = thisValue
      } else {
        if (thisValue > reminingA) {
          alert(' Contribution amount should be less than equal to ' + reminingA)
          //$("#" + thisObj).val(this.ReplaceWithComa(reminingA))
          $("#" + thisObj).val('')
        } else if (thisValue < minimumA) {
          alert(' Contribution amount should be greater than equal to ' + minimumA)
          //$("#" + thisObj).val(this.ReplaceWithComa(reminingA))
          $("#" + thisObj).val('')
        }
      }
    }
    this.totalDonation();
  }
  }

  ReplaceWithComa(value) {
    var thisVWithComa, value = value.toString()
    thisVWithComa = value.replace(/[\D\s\._\-]+/g, "");
    thisVWithComa = thisVWithComa ? parseInt(thisVWithComa, 10) : 0;
    return thisVWithComa = (thisVWithComa === 0) ? "" : thisVWithComa.toLocaleString("en-US");
  }

  donationAmountForGift(minimumA, e) {
    if(e.target.value !== '' && e.target.value !== undefined){
    var thisObj = e.target.id
    if (e.target.value == undefined) {
      alert('Please Select Gift Quantity')
    } else {
      if (minimumA > e.target.value) {
        alert(' Contribution amount should be greater than ' + minimumA)
        $("#" + thisObj).val(this.ReplaceWithComa(minimumA))
      }
    }
    this.totalDonation();
  }
  }

  totalDonation() {
    var TotalDonationA = 0;
    //console.log("value = ", $(".DonateAmountControl").val(), "length = ", $(".DonateAmountControl").length)
    $(".DonateAmountControl").each(function () {
      var DVal = $(this).val();
      var eValD = DVal.replace(/\,/g, '');
      eValD = parseInt(eValD, 10);

      if (parseInt(eValD) > 0) {
        TotalDonationA = TotalDonationA + parseInt(eValD);
        // $(".TotalDAmoumt").text(TotalDonationA)
      }
    })
    this.TotalAmt = TotalDonationA;
    //console.log("TotalAmt = ", this.TotalAmt);
  }
}
