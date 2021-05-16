import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { GetFundRaiseNeedMappingDetailsService } from '../../services/get-fund-raise-need-mapping-details.service';
import { Globalvar } from '../../classes/globalvar';
declare var $: any;

@Component({
  selector: 'app-fundraising-login',
  templateUrl: './fundraising-login.component.html',
  styleUrls: ['./fundraising-login.component.css']
})
export class FundraisingLoginComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private FundRiseS: GetFundRaiseNeedMappingDetailsService,

  ) { }

  public FUNDRAISE_DETAIL = []
  GetFundraiseDetail(fundraiseID) {
    this.FundRiseS.GetFundraiseIDDetails('', fundraiseID).subscribe((Data) => {
      this.FUNDRAISE_DETAIL = Data
      //console.log("FUNDRAISE_DETAIL = " + this.FUNDRAISE_DETAIL)
    })
  }

  OpenModel(id) {
    //console.log(id)
    if (id == 'signIn') {
      document.getElementById("signupBtn").click();
    } else if(id == 'signupBtn') {
      document.getElementById("signIn").click();
     
    }

  }
 public INVITED_EMAILID;

  public DONORID;
  public FundraisingResultID: any;
  public DONOR_USERNAME;
  public DONOR_MOBILE;
  public DONOR_EMAILID;
  public FUNDRAISE_NAME;

  GetDonorDetail(id) {
    this.FundRiseS.GetFundRaiseNeedMappingDetailsService(id).subscribe((DonnerDetail) => {

      this.DONOR_USERNAME = DonnerDetail[0].DONOR_USERNAME;
      this.FUNDRAISE_NAME = DonnerDetail[0].FUNDRAISE_NAME;
      this.DONOR_EMAILID = DonnerDetail[0].DONOR_EMAILID;
      this.DONOR_MOBILE = DonnerDetail[0].DONOR_MOBILE;
      //console.log("ID = " + this.FundraisingResultID)
    })
  }
  fundraiseDonate() {
    //console.log("this.router.url", this.router.url)
    this.router.navigate([this.router.url + '/donate']);
  }
  ngOnInit() {
    this.DONORID = Globalvar.getDonorId()
    //console.log(this.route)
    this.route.paramMap.subscribe(
      params => {
        this.FundraisingResultID = params.get('id');
        //console.log("this.FundraisingResultID", this.FundraisingResultID)
        //document.cookie = "FundraisingResultID=" + this.FundraisingResultID;
        this.GetFundraiseDetail(this.FundraisingResultID)
        this.GetDonorDetail(this.FundraisingResultID);
      }
    )
    Globalvar.donorIdChanged.subscribe(
      (id: number) => {
        this.DONORID = id;
      }
    );

    // this.INVITED_EMAILID = document.getElementById("INVITEDEMAILID") ? document.getElementById("INVITEDEMAILID").innerHTML : 'F no'
    // alert(this.INVITED_EMAILID)
  }


}
