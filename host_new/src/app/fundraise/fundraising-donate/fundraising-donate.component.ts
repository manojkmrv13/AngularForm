import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { GetFundRaiseNeedMappingDetailsService } from '../../services/get-fund-raise-need-mapping-details.service';
import { Globalvar } from '../../classes/globalvar';
declare var $: any;
@Component({
  selector: 'app-fundraising-donate',
  templateUrl: './fundraising-donate.component.html',
  styleUrls: ['./fundraising-donate.component.css']
})
export class FundraisingDonateComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private FundRiseS: GetFundRaiseNeedMappingDetailsService
  ) { }
  public FundraiseDonateNeed = [];
  public FundraisingResultID: any;
  public TotalDonationA: number;
  public SelectedItem = [];

  fundraiseNeeds(id) {
    this.FundRiseS.GetFundRaiseNeedMappingDetailsService(id).subscribe((DonnerDetail) => {
      //if(this.CartDonorID){
      this.FundraiseDonateNeed = DonnerDetail;
      //console.log("FundraiseDonateNeed = ", this.FundraiseDonateNeed)
      this.totalDonation()
      this.commaSeparater()
      //}else{
      //  var activeRoute = this.router.url
      //  var newUrl = activeRoute.replace('/donate','')        
      //this.router.navigate([''+ newUrl]);
      //}

    })
  }

  CalculateDays(END_DATE) {
    var end_Date = this.convertToDate(new Date(END_DATE));
    var current_Date = new Date().toISOString().split('T')[0];
    var fBDate = new Date(end_Date.replace(/-/g, ","));
    var fEDate = new Date(current_Date.replace(/-/g, ","));
    var oneDay = 24 * 60 * 60 * 1000;
    var diffDays = Math.round(Math.abs((fBDate.getTime() - fEDate.getTime()) / (oneDay)));
    return diffDays;
  };

  convertToDate(str) {
    var mnths = {
      Jan: "01", Feb: "02", Mar: "03", Apr: "04", May: "05", Jun: "06",
      Jul: "07", Aug: "08", Sep: "09", Oct: "10", Nov: "11", Dec: "12"
    },
      date = String(str).split(' ');
    return [date[3], mnths[date[1]], date[2]].join("-");
  }

  CalculatePercentage(NEED_AMOUNT, ADMINISTRATION_CHARGES) {
    if (NEED_AMOUNT == 0 || NEED_AMOUNT == undefined) {
      return 0.00;
    } else {
      return Math.round((100 - (((NEED_AMOUNT - ADMINISTRATION_CHARGES) / NEED_AMOUNT) * 100)));
    }
  };



  public amount;
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
    this.totalDonation()
  }
  }

  public TotalAmt;
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
    $("#defaultA" + targetCtrl).val(e.target.value);

  }

  customeSelectControl(DA, nID, e) {
    var dAmount = DA, thisV = e.target.value, targetID = nID, thisVWithComa
    thisVWithComa = thisV.replace(/[\D\s\._\-]+/g, "");
    thisVWithComa = thisVWithComa ? parseInt(thisVWithComa, 10) : 0;
    thisVWithComa = (thisVWithComa === 0) ? "" : thisVWithComa.toLocaleString("en-US");
    $("#donateA" + targetID).val(thisVWithComa)
    $("#actualA" + targetID).val(thisV)
    this.totalDonation()
    this.commaSeparater()
  }


  public cartI: number
  public DonateAmountIDBeforeLogin = false
  postCartItem() {
    if (this.CartDonorID) {
      this.cartI = 0
      var SelectedNeedItem = []
      $("[id^='donateA']").each(function () {
        var thisO = $(this).val();
        thisO = thisO.replace(/[\D\s\._\-]+/g, "");
        if (thisO > 0) {
          var needID = $(this).attr("id").toString().replace(/\D/g, '');
          SelectedNeedItem.push(parseInt(needID))
        }
      })

      this.SelectedItem = SelectedNeedItem
      if (this.SelectedItem.length > 0) {
        SelectedNeedItem.forEach(element => {
          this.postNeedForCart(element)
        });
        //console.log("selectedItem =", this.SelectedItem)
      } else {
        if (!this.DonateAmountIDBeforeLogin) {
          alert('Please enter contribution amount.')
        } else {
          this.DonateAmountIDBeforeLogin = false
        }
      }


    } else {
      this.DonateAmountIDBeforeLogin = true
      document.getElementById("signupBtn").click()
    }

  }





  public CartDonorID;
  postNeedForCart(ADDNeedID) {
    var amountWithoutComma = $("#donateA" + ADDNeedID).val()
    var amount = amountWithoutComma.replace(/[\D\s\._\-]+/g, "");
    var _quantity = parseInt($("#Quantity" + ADDNeedID).find("option:selected").text()) > 0 ? parseInt($("#Quantity" + ADDNeedID).find("option:selected").text()) : '';// for Select Quantity
    var _paymentFrequency = $("#payFrequency" + ADDNeedID).length == 1 ? $("#payFrequency" + ADDNeedID).find("option:selected").html().replace(/(\r\n\t|\n|\r\t)/gm, "").replace(/\s/g, "") : '';
    var _actual_amount = $("#actualA" + ADDNeedID).val();


    //console.log("----", $("#actualA" + ADDNeedID).val())
    //console.log("_paymentFrequency =", _paymentFrequency, "amount =", amount)
    var cartItem = {
      'NEEDID': parseInt(ADDNeedID),
      'DONORID': this.CartDonorID,
      'QUANTITY': _quantity,
      'CART_PAYMENT_FREQUENCY': _paymentFrequency,
      'AMOUNT': parseFloat(amount),
      'ACTUAL_AMOUNT': parseFloat(_actual_amount)
    };
    //console.log("cartItem } ", cartItem)
    this.http.post(Globalvar.ApiUrl + "/PostDonorCart", cartItem).subscribe((cartData) => {
      this.cartI = this.cartI + 1
      if (this.SelectedItem.length == this.cartI) {
        //this.router.navigate(['/payment']);
        this.PostFundRaiseInvites('Login')
        let fundraisepayment = setInterval(() => {
          if (localStorage.getItem('FUNDRAISEID_FOR_PAYMENT')) {
            this.router.navigate(['/payment']);
            clearTimeout(fundraisepayment)
          }
        }, 100);
      }
    });
  }

  public APIUSERID;
  public LOGIN_EMAILID;
  public FundRaiseDonor;
  PostFundRaiseInvites(key) {
    if (window.location.href.indexOf("my-fundraisers/") > -1) {
      this.FundRaiseDonor = localStorage.getItem('FundRaiseDonor')
      if (!this.FundRaiseDonor) {
        var fundraisInterval = setInterval(() => {
          if (this.APIUSERID) {
            clearInterval(fundraisInterval)
            this.FundRaiseDonor = 1;
            localStorage.setItem('FundRaiseDonor', '' + this.FundRaiseDonor)
            var path = window.location.pathname
            path = path.substring(0, path.lastIndexOf("/"))
            var id = path.match(/\d+/g).map(Number);
            //console.log("kk", this.APIUSERID)
            var body = {
              'FUNDRAISEID': '' + id,
              'INVITED_EMAILID': this.LOGIN_EMAILID,
              'REGISTERED_OR_LOGGEDIN': key,
              'API_USERID': this.APIUSERID,
            }
            //console.log("PostFundRaiseInvitesApiUserId body", body)
            this.http.post(Globalvar.ApiUrl + "/PostFundRaiseInvitesApiUserId", body).subscribe((data) => {
              //console.log("PostFundRaiseInvitesApiUserId result", data)
              //localStorage.removeItem('FUNDRAISEID_FOR_PAYMENT');

              localStorage.setItem('FUNDRAISEID_FOR_PAYMENT', "" + id);

            })
          }
        })

      }
    }
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
  public FundraiserName;
  public UserName;
  ngOnInit() {
    Globalvar.donorIdChanged.subscribe(
      (id: number) => {
        this.CartDonorID = id;
        setTimeout(() => {
          this.UserName = localStorage.getItem('USER_NAME')
        }, 500);
        if (this.DonateAmountIDBeforeLogin) {
          this.postCartItem()
        }


      }
    );

    var url = (this.router.url).split('/');
    if (url[3] !== undefined) {
      this.FundraiserName = url[3].replace(/-/g, ' ')
    }
    this.UserName = localStorage.getItem('USER_NAME')
    this.CartDonorID = Globalvar.getDonorId()
    this.APIUSERID = localStorage.getItem('APIUSERID');
    this.LOGIN_EMAILID = localStorage.getItem('USER_EMAILID');
    this.route.paramMap.subscribe(
      params => {
        this.FundraisingResultID = +params.get('id');
        this.fundraiseNeeds(this.FundraisingResultID)
      }
    )
    //this.FundraisingResultID = parseFloat(Globalvar.readCookie('ResultID'))    
    //console.log("ID = " + this.FundraisingResultID)
    $(document).on('keydown', '.typeNumberOnly', function (e) { -1 !== $.inArray(e.keyCode, [46, 8, 9, 27, 13]) || /65|67|86|88/.test(e.keyCode) && (!0 === e.ctrlKey || !0 === e.metaKey) || 35 <= e.keyCode && 40 >= e.keyCode || (e.shiftKey || 48 > e.keyCode || 57 < e.keyCode) && (96 > e.keyCode || 105 < e.keyCode) && e.preventDefault() });
  }
}
