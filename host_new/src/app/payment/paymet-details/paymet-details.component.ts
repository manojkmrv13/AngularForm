import { Component, OnInit } from '@angular/core';
import { Globalvar } from '../../classes/globalvar';
import { DonorprofileService } from '../../services/donorprofile.service';
import { Donorprofile } from '../../classes/donorprofile';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-paymet-details',
  templateUrl: './paymet-details.component.html',
  styleUrls: ['./paymet-details.component.css']
})
export class PaymetDetailsComponent implements OnInit {

  public DonorID_APIUSERID;
  public DonorID;
  public dnr: Donorprofile[];

  public BillingName: string;
  public BillingTel: any;
  public BillingEmail: string;
  public BillingCountry: string;
  public BillingState: string;
  public BillingCity: string;
  public BillingZip: string;
  public BillingAddress: string;
  public TotalDonationAmount: number;

  constructor(
    private dnrs: DonorprofileService,
    private CartS: CartService,
    private router: Router
  ) { }

  public motcode;
  public ngMoteCode = '';
  ProceedToPayment(code) {
    //console.log("MotCode", this.QueryParmMotcode)
    if (this.TotalDonationAmount > 0) {
      if(!this.motcode){
        sessionStorage.setItem('MotCode', this.ngMoteCode)
      }
      this.router.navigate(['/payment/mode']);
    }else{
      this.router.navigate(['/donate']);
    }
  }


  getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split("=");
      if (pair[0] == variable) { return pair[1]; }
    }
    return (false);
  }

  public moteCodeList = []
  GetMotCode() {
    this.dnrs.GetMotCode().subscribe((data) => {
      this.moteCodeList = data
    })
  }

  GetDonorDetails() {
    this.TotalDonationAmount = 0;
    this.CartS.CartService(this.DonorID).subscribe((CartNeedData) => {
      CartNeedData.forEach(element => {
        this.TotalDonationAmount = this.TotalDonationAmount + element.AMOUNT;
      });
    });
    this.dnrs.GetDonorUsersLead().subscribe((dnr) => {
      if (dnr.length > 0) {

        this.dnr = dnr;
        if (this.dnr.length > 0) {
          this.BillingName = this.dnr[0].FIRSTNAME + ' ' + this.dnr[0].LASTNAME;
          this.BillingAddress = this.dnr[0].ADDRESS_LINE_1 + ', ' + this.dnr[0].ADDRESS_LINE_2 + ', ' + this.dnr[0].ADDRESS_LINE_3;
          this.BillingCity = this.dnr[0].CITY;
          this.BillingState = this.dnr[0].STATE;
          this.BillingZip = this.dnr[0].PINCODE;
          this.BillingCountry = this.dnr[0].COUNTRY;
          this.BillingTel = this.dnr[0].MOBILE;
          this.BillingEmail = this.dnr[0].EMAILID;
          //console.log("MSG", this.BillingName, this.BillingEmail)
        }
      }
    });
  }


  ngOnInit() {
    Globalvar.donorIdChanged.subscribe(
      (id: number) => {
        this.DonorID = id;
        this.GetDonorDetails()
      }
    );

    let QueryParmMotcode = this.getQueryVariable('motcode');
    if( QueryParmMotcode ){
      sessionStorage.setItem('MotCode', '' + QueryParmMotcode) 
    }
    this.motcode = sessionStorage.getItem('MotCode');
    this.GetMotCode()

    this.DonorID_APIUSERID = Globalvar.getApiUserId() //localStorage.getItem('APIUSERID')
    this.DonorID = Globalvar.getDonorId() //localStorage.getItem('DONORID')
    if (this.DonorID > 0) {
      this.GetDonorDetails()
    } else {
      //alert('Please Login')
      document.getElementById("signupBtn").click()
    }
    //this.GetCartNeedItem(this.CartDonorID);
  }
  
}
