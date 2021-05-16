import { Component, OnInit, NgZone, Inject, PLATFORM_ID } from '@angular/core';
import { GetFundRaiseNeedMappingDetailsService } from '../../services/get-fund-raise-need-mapping-details.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Globalvar } from '../../classes/globalvar';
import { DeleteFundRaiseNeedMappingIdService } from '../../services/delete-fund-raise-need-mapping-id.service';
import { NgForm } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { isPlatformBrowser } from '@angular/common';
import { DeleteFundRaiseNeedMapping } from '../../services/delete-fund-raise-need-mapping.service';
declare var $: any;

@Component({
  selector: 'app-fundraising',
  templateUrl: './fundraising.component.html',
  styleUrls: ['./fundraising.component.css']
})
export class FundraisingComponent implements OnInit {
  // for popup
  public ResultID;
  public FUND_RAISE_DATA = [];
  public data=[];
  closeResult: string;  
  constructor(
    private http: HttpClient,
    private router: Router,
    private _ngZone: NgZone,
    private FundRiseS: GetFundRaiseNeedMappingDetailsService,
    private DeleteFundRaiseNeedMappingId: DeleteFundRaiseNeedMappingIdService,
    private DeleteFundRaise: DeleteFundRaiseNeedMapping,
    private modalService: NgbModal,
    @Inject(PLATFORM_ID) platformId: string
  ) { 
    window['hoshDataGoogleRef'] = { component: this, zone: _ngZone };

    this.isBrowser = isPlatformBrowser(platformId);
  }
  public isBrowser: boolean;

  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true });
  }
  open(content) {
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
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

  public GmailData = [];
  InviteFrom(Root) {
    var thisO = this
    //console.log("aaa", Root)
    localStorage.setItem('InviteFrom', '' + Root);    
    if (Root == 'Gmail') {
      window.open("/oauth/oauth.aspx", "Ratting", "width=550,height=500,0,status=0,");
      this.router.navigate(['my-fundraisers/invite-friends']);    
    }else{
      this.router.navigate(['my-fundraisers/invite-friends']);
    }
  }


  // getGoogleList(strdata){
  //   this.GmailData = JSON.parse(strdata);
  //   console.log("GmailData", this.GmailData)
  //   if(this.GmailData.length > 0){
  //     this.router.navigate(['my-fundraisers/invite-friends']);
  //   }
  // }

  CalculateDays(END_DATE) {
    var end_Date = Globalvar.convertToDate(new Date(END_DATE));
    var current_Date = new Date().toISOString().split('T')[0];
    var fBDate = new Date(end_Date.replace(/-/g, ","));
    var fEDate = new Date(current_Date.replace(/-/g, ","));
    var oneDay = 24 * 60 * 60 * 1000;
    var diffDays = Math.round(Math.abs((fBDate.getTime() - fEDate.getTime()) / (oneDay)));
    return diffDays;

  };
  CalculateRemaingAmt(NEED_AMOUNT, ADMINISTRATION_CHARGES) {
    return (NEED_AMOUNT - ADMINISTRATION_CHARGES);
  };

  CalculatePercentage(NEED_AMOUNT, ADMINISTRATION_CHARGES) {
    if (NEED_AMOUNT == 0 || NEED_AMOUNT == undefined) {
      return 0.0;
    } else {
      return Math.round((100 - (((NEED_AMOUNT - ADMINISTRATION_CHARGES) / NEED_AMOUNT) * 100)));
    }
  };

  public DONORID;
  public POSTID;
  GetFundraiseDetails(ResultID) {
    //console.log(ResultID)
    this.FundRiseS.GetFundRaiseNeedMappingDetailsService(ResultID).subscribe((fundRaiseData) => {
      if (fundRaiseData.length >= 0) {
        this.FUND_RAISE_DATA = fundRaiseData;
      }
      //console.log("FUND_RAISE_DATA")
      console.log(fundRaiseData)
      this.POSTID=this.FUND_RAISE_DATA[0].NEEDID;
      console.log(this.POSTID+"postiddis");
      this.commaSeparater();
    });
  }

  DeleteNeedMapingID(NeedMapingID) {
    //console.log(NeedMapingID)
    this.DeleteFundRaiseNeedMappingId.DeleteFundRaiseNeedMappingIdService(NeedMapingID).subscribe((NewResult) => {
      this.GetFundraiseDetails(this.ResultID)
    })
  }

  RemoveAllFundraise() {
    this.DeleteFundRaise.DeleteFundRaiseNeedMapping(this.ResultID).subscribe((NResult) => {
      this.GetFundraiseDetails(this.ResultID)
    })
  }

  getCookie() {
    //this.ResultID = Globalvar.readCookie('ResultID') ? Globalvar.readCookie('ResultID') : 0;
    this.ResultID = localStorage.getItem('ResultID')

    this.GetFundraiseDetails(this.ResultID);
  }
  saveFundriseData(details: NgForm, content) {
    if (this.DONORID) {
      if (details.valid) {
        var body = {
          'FUNDRAISEID': this.ResultID,
          'DONORID': 1,
          'FUNDRAISE_NAME': '',
          'PARENT_COMMENTID': '0',
          'FUNDRAISE_AMOUNT': details.value.TotalFundraisingAmount,
          'DESCRIPTION': details.value.message,
        };
        // 
        this.http.post(Globalvar.ApiUrl + "/PostFundRaise", body).subscribe((data) => {
          //console.log("body");
          //console.log(data);
          //console.log(this.ResultID)
         // this.open(content)
         this.router.navigate(['my-fundraisers/invite-friends/'+this.POSTID]);
        //  this.router.navigate(['my-fundraisers/invite-friends']);
        });
      }
    } else {
      //alert('Please Login')
      document.getElementById("signupBtn").click()
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
    }, 200)

  }

  ngOnInit() {

      
    Globalvar.donorIdChanged.subscribe(
      (id: number) => {
        this.DONORID = id;
      }
    );
    this.DONORID = Globalvar.getDonorId()
    this.getCookie()

    this.commaSeparater();
    $(document).on('keydown', '.typeNumberOnly', function (e) { -1 !== $.inArray(e.keyCode, [46, 8, 9, 27, 13]) || /65|67|86|88/.test(e.keyCode) && (!0 === e.ctrlKey || !0 === e.metaKey) || 35 <= e.keyCode && 40 >= e.keyCode || (e.shiftKey || 48 > e.keyCode || 57 < e.keyCode) && (96 > e.keyCode || 105 < e.keyCode) && e.preventDefault() });
  }

  addFundraisingNeeds() {

    this.router.navigate(['/donate']);

  }

}
