import { Component, OnInit, HostListener, ElementRef, NgZone } from '@angular/core';
import { GetFundRaiseNeedMappingDetailsService } from '../../services/get-fund-raise-need-mapping-details.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Globalvar } from '../../classes/globalvar';
import { DeleteFundRaiseNeedMappingIdService } from '../../services/delete-fund-raise-need-mapping-id.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

declare var $: any;

@Component({
  selector: 'app-my-fundraising-activity',
  templateUrl: './my-fundraising-activity.component.html',
  styleUrls: ['./my-fundraising-activity.component.css']
})

@HostListener('change', ['$event'])
export class MyFundraisingActivityComponent implements OnInit {
  closeResult: string;
  constructor(
    private http: HttpClient,
    private router: Router,
    private FundRiseS: GetFundRaiseNeedMappingDetailsService,
    private DeleteFundRaiseNeedMappingId: DeleteFundRaiseNeedMappingIdService,
    private spinner: NgxSpinnerService,
    private modalService: NgbModal,
    private _ngZone: NgZone
  ) {
    window['hoshDataRef'] = { component: this, zone: _ngZone };
  }

  public DonorID
  public FundraiseData = [];
  GetFundraiseData(DonorID) {
    this.FundRiseS.GetFundraiseData(DonorID).subscribe((fundRaiseData) => {
      //this.FundraiseData = fundRaiseData

      fundRaiseData.forEach(element => {
        if (element.TOTAL_INVITED !== 0 && element.FUNDRAISE_AMOUNT !== 0) {
          this.FundraiseData.push(element)
        }
      });

      for (var i = 0; i < this.FundraiseData.length; i++) {
        this.FundraiseData[i].INDEX_ITEM = i + 1;
      }
      this.FundraiseData.reverse()
      //console.log("FundraiseData", this.FundraiseData)
      this.SetSlickSlider(this.FundraiseData.length)
    })
  }

  public FundraiseIDDetail = [];
  GetSingalFundraiseIDDetail(donorID, funtraiseID) {
    this.FundRiseS.GetFundraiseIDDetails(donorID, funtraiseID).subscribe((FundraiseIDDetail) => {
      this.FundraiseIDDetail = FundraiseIDDetail
      //console.log("fundraiseRaiseID_Data", FundraiseIDDetail)
      $(".TotalInvited, .PeopleDonated").removeClass('active')
    })
  }
  
  public FundraiseInvitesDetails = [];
  GetInvitesDetails(donorID, funtraiseID) {
    this.FundRiseS.GetFundRaiseInvitesDetails(donorID, funtraiseID).subscribe((InvitesDetails) => {
      this.FundraiseInvitesDetails = InvitesDetails
      //console.log("FundraiseInvitesDetails", InvitesDetails)
    })
  }

  public PeopleDonatedData = [];
  public DonatedAmount
  peopleDonated(funtraiseID) {
    this.PeopleDonatedData = [];
    this.DonatedAmount = 0;
    this.FundRiseS.GetPeopleDonated(funtraiseID).subscribe((Donated) => {
      if (Donated.length > 0) {
        this.PeopleDonatedData = Donated
        var amount = 0;
        for (var i = 0; i < Donated.length; i++) {
          amount = amount + Donated[i].AMOUNT_DONATED
        }
        this.DonatedAmount = amount
      }
      //console.log("---", this.DonatedAmount)
      //console.log("this.PeopleDonatedData", this.PeopleDonatedData);
    })
  }

  public pclp;
  ProgressPErcentage(DONATION_AMOUNT, NEED_AMOUNT) {
    if(DONATION_AMOUNT >= NEED_AMOUNT){
      this.pclp = 100
    }else{
      this.pclp = ((DONATION_AMOUNT / NEED_AMOUNT) * 100).toFixed(0);
    }
    
    //console.log(DONATION_AMOUNT + " = " + NEED_AMOUNT)
    //console.log(this.pclp)
    if (this.pclp == 'NaN') {
      this.pclp = 0;
      return this.pclp;
    } else if (this.pclp == 'Infinity') {
      this.pclp = 0;
      return this.pclp;
    } else {
      return this.pclp;
    }
   
  };

  AddClass(pclp) {
    if (this.pclp <= "10") {
      return 'countBar color1';
    } else if (this.pclp <= "15") {
      return 'countBar color2';
    } else {
      return 'countBar';
    }
  }


  public fundraiseRaiseMapingData = []
  GetFundraiseMapingNeedData(fundraiseID) {
    this.FundRiseS.GetFundRaiseNeedMappingDetailsService(fundraiseID).subscribe((NeedMapingData) => {
      this.fundraiseRaiseMapingData = NeedMapingData
      //console.log("fundraiseRaise Maping Data", NeedMapingData)
    })
  }

  CalculatePercentage(NEED_AMOUNT, ADMINISTRATION_CHARGES) {
    if (NEED_AMOUNT == 0 || NEED_AMOUNT == undefined) {
      return 0;
    } else {
      return Math.round((100 - (((NEED_AMOUNT - ADMINISTRATION_CHARGES) / NEED_AMOUNT) * 100)));
    }
  };


  SendReminder() {
    this.spinner.show();
    var body = {
      'DONORID': this.DonorID,
      'FUNDRAISEID': parseInt($('.Tab.slick-current').find(".FUNDRAISEID").text())
    }
    //console.log("body", body)
    this.http.post(Globalvar.ApiUrl + "/PostFundRaiseInvitesReminder", body).subscribe((data) => {
      //console.log("data", data)
      if (data[0].STATUSES[0].ResultId == 1) {
        this.spinner.hide();
        setTimeout(() => {
          alert("Reminder sent successfully")
        }, 300)
      }
    })

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

  InviteMoreFriends(InviteFriends) {
    var InviteFriendsResuldID = parseInt($('.Tab.slick-current').find(".FUNDRAISEID").text())
    localStorage.setItem('InviteMoreFriendsResuldID', '' + InviteFriendsResuldID)
    this.open(InviteFriends)
  }

  InviteFrom(Root) {
    //console.log("aaa", Root)
    localStorage.setItem('InviteFrom', '' + Root);
    this.router.navigate(['my-fundraisers/invite-friends']);
    if (Root == 'Gmail') {
      window.open("/oauth/oauth.aspx", "Ratting", "width=550,height=500,0,status=0,");
    }
  }

  public fundraiseAmount;
  SetSlickSlider(items) {
    var thisO = this
    setTimeout(() => {
      $('.sliderFundraising').slick({
        centerMode: true,
        infinite: true,
        centerPadding: '10px',
        slidesToShow: 3,
        slidesToScroll: 1,
        focusOnSelect: true,       
        adaptiveHeight: true,
        responsive: [
          {
            breakpoint: 991,
            settings: {
              centerMode: false,
              arrows: true,
              slidesToShow: 2
            }
          },
          {
            breakpoint: 768,
            settings: {
              centerMode: false,
              arrows: true,
              slidesToShow: 1
            }
          }
        ]
      });

      

      var fundraiseRaiseIDOnload = parseInt($('.Tab.slick-current').find(".FUNDRAISEID").text())
      this.fundraiseAmount = parseInt($('.Tab.slick-current').find(".FUNDRAISE_AMOUNT").text())
      //console.log(fundraiseRaiseIDOnload)
      window['hoshDataRef'].zone.run(() => { window['hoshDataRef'].component.GetFundraiseMapingNeedData(fundraiseRaiseIDOnload); });
      window['hoshDataRef'].zone.run(() => { window['hoshDataRef'].component.GetSingalFundraiseIDDetail(thisO.DonorID, fundraiseRaiseIDOnload); });
      window['hoshDataRef'].zone.run(() => { window['hoshDataRef'].component.GetInvitesDetails(thisO.DonorID, fundraiseRaiseIDOnload); });
      window['hoshDataRef'].zone.run(() => { window['hoshDataRef'].component.peopleDonated(fundraiseRaiseIDOnload); });

      this.SetProgressBarFundraiseAmount();
      
      $('.sliderFundraising').on('afterChange', (event, slick, currentSlide) => {
        var fundraiseRaiseID = parseInt($('.Tab[data-slick-index=' + currentSlide + ']').find(".FUNDRAISEID").text())
        this.fundraiseAmount = parseInt($('.Tab[data-slick-index=' + currentSlide + ']').find(".FUNDRAISE_AMOUNT").text())
        window['hoshDataRef'].zone.run(() => { window['hoshDataRef'].component.GetFundraiseMapingNeedData(fundraiseRaiseID); });
        window['hoshDataRef'].zone.run(() => { window['hoshDataRef'].component.GetSingalFundraiseIDDetail(thisO.DonorID, fundraiseRaiseID); });
        window['hoshDataRef'].zone.run(() => { window['hoshDataRef'].component.GetInvitesDetails(thisO.DonorID, fundraiseRaiseID); });
        window['hoshDataRef'].zone.run(() => { window['hoshDataRef'].component.peopleDonated(fundraiseRaiseID); }); 
        this.SetProgressBarFundraiseAmount();        
      });
      
      
     
    }, 400)
  }

  SetProgressBarFundraiseAmount(){
    var progressBar = setInterval(() =>{
      if(this.DonatedAmount !== undefined && this.fundraiseAmount !== undefined){
        this.ProgressPErcentage(this.DonatedAmount, this.fundraiseAmount)
        clearInterval(progressBar)
      }
      //console.log("KKKK", this.DonatedAmount, this.fundraiseAmount)
    },100)
  }

  totalInvitedBtn(target) {
    $("." + target).toggleClass('active').siblings().removeClass('active')
    $(".PeopleDonated.active").removeClass('active')
    $(".TotalInvited").toggleClass('active')
  }
  PeopleDonatedBtn(target) {
    $("." + target).toggleClass('active').siblings().removeClass('active')
    $(".TotalInvited.active").removeClass('active')
    $(".PeopleDonated").toggleClass('active')
  }

  // public TotalInvited = false;
  // public PeopleDonated = false;
  // InvitedDonated(target){
  //   // $("."+target).toggleClass('active').siblings('.data').removeClass('active')
  //   // if($("."+target).hassClass('active')){
  //   //   $(this).toggleClass('active').siblings().removeClass('active')
  //   // }
  // }

  public ChildSponsership
  ngOnInit() {
    this.DonorID = Globalvar.getDonorId()
    this.GetFundraiseData(this.DonorID)

    this.ChildSponsership = localStorage.getItem('ChildSponsership')

  }
}
