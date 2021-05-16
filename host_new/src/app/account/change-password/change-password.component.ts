import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Globalvar } from '../../classes/globalvar';
import { DonorprofileService } from '../../services/donorprofile.service';
import { HttpClient } from '@angular/common/http';
declare var $: any;
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  constructor(
    public router: Router,
    private donorprofileDetails: DonorprofileService,
    private http: HttpClient,
  ) { }

  
  public ERROR_NEW_PASSWORD = false;
  NewPassword(Current, confirm, event) { 
    //console.log(Current, event.target.value)    
    if (Current && event.target.value) {
      if (Current !== event.target.value) {
        this.ERROR_NEW_PASSWORD = false;
      } else {
        this.ERROR_NEW_PASSWORD = true;
      }
      //console.log(this.ERROR_NEW_PASSWORD)
    }else{
      this.ERROR_NEW_PASSWORD = false;
    }
    if (confirm && event.target.value) {
      if (confirm == event.target.value) {
        this.ERROR_CONFIRM_PASSWORD = false;
      } else {
        this.ERROR_CONFIRM_PASSWORD = true;
      }
      //console.log(this.ERROR_CONFIRM_PASSWORD)
    }
  }

  public ERROR_CONFIRM_PASSWORD = false;  
  ConfirmPassword(val, event) {  
    //console.log(val, event.target.value)  
    if (val && event.target.value) {
      if (val == event.target.value) {
        this.ERROR_CONFIRM_PASSWORD = false;
      } else {
        this.ERROR_CONFIRM_PASSWORD = true;
      }
      //console.log(this.ERROR_CONFIRM_PASSWORD)
    }else{
      this.ERROR_CONFIRM_PASSWORD = false;
    }
  }
  
  public DonorID;
  public CURRENT_PASSWORD;
  public NEW_PASSWORD;
  public CONFIRM_PASSWORD;

  // public CP_TITLE = '0';
  // public CP_EMAILID;
  // public CP_PASSWORD;
  // public CP_FIRSTNAME;
  // public CP_LASTNAME;
  // public CP_MOBILE;
  // public CP_ADDRESS_LINE_1;
  // public CP_ADDRESS_LINE_2;
  // public CP_ADDRESS_LINE_3;
  // public CP_POSTALCODE;
  // public CP_API_USERID;
  public CP_PROFILE_TITLE;
  public CP_PROFILE_NAME;
  public CP_PROFILE_LASTNAME;
  public CP_PROFILE_GENDER;
  public CP_PROFILE_DOB;
  public CP_PROFILE_MOBILE_NO;
  public CP_PROFILE_EMAIL_ID;
  public CP_PROFILE_ADDRESS_L1;
  public CP_PROFILE_ADDRESS_L2;
  public CP_PROFILE_ADDRESS_L3;  
  public CP_PROFILE_POSTOL_CODE;
  public CP_PROFILE_PASSWORD;
  public CP_PROFILE_NATIONALITY;
  public CP_PROFILE_COUNTRY;
  public CP_PROFILE_STATE;
  public CP_PROFILE_CITY;


  public currentPassword;

  ChangePassword(form) {
    var thisO = this
    //console.log(form)
    if (form.valid && this.currentPassword !== form.value.CP_New_Password && form.value.CP_New_Password == form.value.CP_Confirm_Password) {
      var body = {        
        'TITLE': this.CP_PROFILE_TITLE,
        'EMAILID': this.CP_PROFILE_EMAIL_ID,
        'PASSWORD': form.value.CP_New_Password,
        'FIRSTNAME': this.CP_PROFILE_NAME,
        'LASTNAME': this.CP_PROFILE_LASTNAME,
        'MOBILE': this.CP_PROFILE_MOBILE_NO,
        'ADDRESS_LINE_1': this.CP_PROFILE_ADDRESS_L1,
        'ADDRESS_LINE_2': this.CP_PROFILE_ADDRESS_L2,
        'ADDRESS_LINE_3': this.CP_PROFILE_ADDRESS_L3,
        'POSTALCODE': this.CP_PROFILE_POSTOL_CODE,
        'CITY': this.CP_PROFILE_CITY,
        'STATE': this.CP_PROFILE_STATE,
        'COUNTRY': this.CP_PROFILE_COUNTRY,
        'NATIONALITY': this.CP_PROFILE_NATIONALITY,
        'API_USERID': Globalvar.getApiUserId()
      }
      //console.log("Body", body)
      this.http.post(Globalvar.ApiUrl + "/PostDonorUsersClientAPI", body).subscribe((data) => {
        alert('Password changed successfully.')
        this.router.navigate(['account/my-profile']);
      });
    }
    //console.log("Change Password Form", form)
  }

  GetPassword() {
    this.donorprofileDetails.GetDonorUsersLead().subscribe((donorDetails) => {
      this.currentPassword = donorDetails[0].PASSWORD
      // this.CP_TITLE = donorDetails[0].TITLE
      // this.CP_EMAILID = donorDetails[0].EMAILID
      // this.CP_FIRSTNAME = donorDetails[0].FIRSTNAME
      // this.CP_LASTNAME = donorDetails[0].LASTNAME
      // this.CP_MOBILE = donorDetails[0].MOBILE
      // this.CP_ADDRESS_LINE_1 = donorDetails[0].ADDRESS_LINE_1
      // this.CP_ADDRESS_LINE_2 = donorDetails[0].ADDRESS_LINE_2
      // this.CP_ADDRESS_LINE_3 = donorDetails[0].ADDRESS_LINE_3
      // this.CP_POSTALCODE = donorDetails[0].PINCODE
      this.CP_PROFILE_TITLE = donorDetails[0].TITLE
      this.CP_PROFILE_NAME = donorDetails[0].FIRSTNAME
      this.CP_PROFILE_LASTNAME = donorDetails[0].LASTNAME
      this.CP_PROFILE_GENDER = donorDetails[0].GENDER
      this.CP_PROFILE_DOB = donorDetails[0].DATEOFBIRTH
      this.CP_PROFILE_MOBILE_NO = donorDetails[0].MOBILE
      this.CP_PROFILE_EMAIL_ID = donorDetails[0].EMAILID
      this.CP_PROFILE_ADDRESS_L1 = donorDetails[0].ADDRESS_LINE_1
      this.CP_PROFILE_ADDRESS_L2 = donorDetails[0].ADDRESS_LINE_2
      this.CP_PROFILE_ADDRESS_L3 = donorDetails[0].ADDRESS_LINE_3
      this.CP_PROFILE_POSTOL_CODE = donorDetails[0].PINCODE
      this.CP_PROFILE_PASSWORD = donorDetails[0].PASSWORD
      this.CP_PROFILE_NATIONALITY = donorDetails[0].NATIONALITY 
      this.CP_PROFILE_COUNTRY = donorDetails[0].COUNTRY
      this.CP_PROFILE_STATE = donorDetails[0].STATE
      this.CP_PROFILE_CITY = donorDetails[0].CITY
    })
  }

  

  public ChildSponsership
  ngOnInit() {    
    this.DonorID = Globalvar.getDonorId()
    this.GetPassword()
    //console.log("this.DonorID", this.DonorID)
    this.ChildSponsership = localStorage.getItem('ChildSponsership')
    Globalvar.donorIdChanged.subscribe(
      (id: number) => {
        this.DonorID = id;             
      }
    );
  }

}
