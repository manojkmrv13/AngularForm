import { Component, OnInit } from '@angular/core';
import { DonorprofileService } from '../../services/donorprofile.service';
import { DonorDonationsService } from '../../services/donor-donations.service';
import { DonorRecentDonationsService } from '../../services/donor-recent-donations.service';
import { NguCarouselConfig, NguCarouselStore } from '@ngu/carousel';
import { GetFundRaiseNeedMappingDetailsService } from '../../services/get-fund-raise-need-mapping-details.service';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core'
import { StateCityService } from '../../services/state-city.service';
import { Globalvar } from '../../classes/globalvar';
import { Title } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
declare var $: any;

export const MY_FORMATS = {
  parse: {
    dateInput: 'DD-MM-YYYY',
  },
  display: {
    dateInput: 'DD-MM-YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'DD-MM-YYYY',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-my-world',
  templateUrl: './my-world.component.html',
  styleUrls: ['./my-world.component.css'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
  ]
})
export class MyWorldComponent implements OnInit {
  defaultImage = '../assets/images/image_not_available.jpg';
  public FundraisingWorksCarousel: NguCarouselConfig = {
    grid: { xs: 1, sm: 2, md: 3, lg: 3, all: 0 },
    slide: 1,
    speed: 400,
    interval: {
      timing: 3000,
      initialDelay: 1000
    },
    point: {
      visible: true
    },
    load: 2,
    loop: true,
    touch: true
  };

  constructor(
    private donorprofileDetails: DonorprofileService,
    private DDonations: DonorDonationsService,
    private RecentDonations: DonorRecentDonationsService,
    private FundraiseNetworkDetails: GetFundRaiseNeedMappingDetailsService,
    private StateCity: StateCityService,
    private http: HttpClient,
    private router: Router
  ) { }

  public ChildSponsership;
  public DonorID;
  public DonorDetails = [];

  public PROFILE_TITLE;
  public PROFILE_NAME;
  public PROFILE_LASTNAME;
  public PROFILE_GENDER;
  public PROFILE_DOB;
  public PROFILE_MOBILE_NO;
  public PROFILE_EMAIL_ID;
  public PROFILE_ADDRESS_L1;
  public PROFILE_ADDRESS_L2;
  public PROFILE_ADDRESS_L3;  
  public PROFILE_POSTOL_CODE;
  public PROFILE_PASSWORD;
  public PROFILE_NATIONALITY;
  public PROFILE_COUNTRY;
  public PROFILE_STATE;
  public PROFILE_CITY;

  GetDnorProfileDetails() {
    this.donorprofileDetails.GetDonorUsersLead().subscribe((donorDetails) => {
      this.DonorDetails = donorDetails
      console.log("DonorDetails =", donorDetails)
      this.PROFILE_TITLE = donorDetails[0].TITLE
      this.PROFILE_NAME = donorDetails[0].FIRSTNAME
      this.PROFILE_LASTNAME = donorDetails[0].LASTNAME
      this.PROFILE_GENDER = donorDetails[0].GENDER
      this.PROFILE_DOB = donorDetails[0].DATEOFBIRTH
      this.PROFILE_MOBILE_NO = donorDetails[0].MOBILE
      this.PROFILE_EMAIL_ID = donorDetails[0].EMAILID
      this.PROFILE_ADDRESS_L1 = donorDetails[0].ADDRESS_LINE_1
      this.PROFILE_ADDRESS_L2 = donorDetails[0].ADDRESS_LINE_2
      this.PROFILE_ADDRESS_L3 = donorDetails[0].ADDRESS_LINE_3
      this.PROFILE_POSTOL_CODE = donorDetails[0].PINCODE
      this.PROFILE_PASSWORD = donorDetails[0].PASSWORD
      this.PROFILE_NATIONALITY = donorDetails[0].NATIONALITY 
      this.PROFILE_COUNTRY = donorDetails[0].COUNTRY
      this.PROFILE_STATE = donorDetails[0].STATE
      this.PROFILE_CITY = donorDetails[0].CITY
    })    
  }




  public TOTAL_INVITED;
  public TOTAL_JOINED;
  public TOTAL_REMAINING;
  NetworkFundraiseDetails(DonorID) {
    this.FundraiseNetworkDetails.GetMyNetworkDetails(DonorID).subscribe((NetworkDetails) => {
      //this.PeopleInvited = NetworkDetails
      //console.log("NetworkDetails", NetworkDetails)
      //this.PeopleInvited = NetworkDetails.length;
      var totalInvaited = 0;
      var totalJoined = 0;
      var totalRemaining = 0;
      NetworkDetails.forEach(element => {
        totalInvaited += element.TOTAL_INVITED;
        totalJoined += element.TOTAL_JOINED;
        totalRemaining += element.TOTAL_REMAINING;
      });
      this.TOTAL_INVITED = totalInvaited
      this.TOTAL_JOINED = totalJoined
      this.TOTAL_REMAINING = totalRemaining
      //this.PeopleJoined = totalInvaited;
      //console.log("NetworkDetails = ", NetworkDetails)
    })
  }

  public RecentDonationsResult = [];
  GetRecentDonations(DonorID) {
    this.RecentDonations.DonorRecentDonations(DonorID).subscribe((RecentDonationsResult) => {
      this.RecentDonationsResult = RecentDonationsResult;
      //console.log("Recent Donations Result =", RecentDonationsResult)
      this.RecentActivitySlider();
    })
  }

  public Donations = []
  GetDonorDonations(DonorID) {
    this.DDonations.GetDonorDonations(DonorID).subscribe((donations) => {
      this.Donations = donations
      //console.log("donations ==", donations)
    })
  }

  public dob = "1984-06-18T12:50:42";
  GetAge(dob) {
    var dobDate = new Date(dob);
    var nowDate = new Date();
    var diff = nowDate.getTime() - dobDate.getTime();
    var ageDate = new Date(diff); // miliseconds from epoch
    var age = Math.abs(ageDate.getUTCFullYear() - 1970);
    return age
  }


  divEqualheight() {
    $(".discriptionDivHeight")
    setTimeout(function () {
      $(".sameHeightWrap").each(function () {
        $(this).find(".sameHeight").css("height", "auto");
        var maxHeight = 0;
        $(this).find(".sameHeight").each(function () {
          if ($(this).height() > maxHeight) { maxHeight = $(this).height(); }

        });
        $(this).find(".sameHeight").height(maxHeight)
      })
    }, 200)
  }




  SaveProfileForm(form) {
    if (form.valid) {
      //console.log("FORM DATA ", form)
      $(".profileForm, .EditProfileForm").toggleClass("active")
      var body = {
        'TITLE': form.value.profile_title,
        'EMAILID': form.value.Profile_emailid,
        'PASSWORD': this.PROFILE_PASSWORD,
        'FIRSTNAME': form.value.profile_name,
        'LASTNAME': form.value.profile_lastName,
        'MOBILE': form.value.Profile_mobile,
        'ADDRESS_LINE_1': form.value.line1,
        'ADDRESS_LINE_2': form.value.line2,
        'ADDRESS_LINE_3': form.value.line3,
        'POSTALCODE': form.value.postal_code,
        'CITY': form.value.profile_city,
        'STATE': form.value.profile_state,
        'COUNTRY': form.value.profile_country,
        'NATIONALITY': form.value.profile_nationality,
        'API_USERID': Globalvar.getApiUserId()
      }
      console.log("Body", body)
      this.http.post(Globalvar.ApiUrl + "/PostDonorUsersClientAPI", body).subscribe((data) => {
        alert('Detail has been submitted successfully')
        this.GetDnorProfileDetails();

      });
    }
  }

  public States = []
  GetState() {
    this.StateCity.GetState().subscribe((Stats) => {
      this.PROFILE_STATE = '';
      this.PROFILE_CITY = '';
      this.States = Stats;
      //console.log("State Data", this.States)
    })
  }

  public Cities: any = []
  GetCity(stateID) {
    //console.log("stateID", stateID)
    if (stateID != '') {
      this.StateCity.GetCity(stateID).subscribe((city) => {
        this.PROFILE_CITY = '';
        this.Cities = city
        //console.log("State Cities", this.Cities)
      })
    }
    else {
      // this.CWUS_City = '';
      this.Cities = null;
    }
  }

  EditForm() {
    $(".profileForm, .EditProfileForm").toggleClass("active")
  }

  RecentActivitySlider() {
    setTimeout(() => {
      $('.HowHoShworksRA').slick({
        dots: false,
        infinite: false,
        centerMode: false,
        speed: 300,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
              infinite: false,
              dots: true
            }
          },
          {
            breakpoint: 991,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
          // You can unslick at a given breakpoint now by adding:
          // settings: "unslick"
          // instead of a settings object
        ]
      });

      this.divEqualheight()
    }, 400)

  }

  public API_USERID;
  ngOnInit() {
    this.GetState();
    this.GetCity(1)
    $(document).ready(function (e) {
      $(".profileMenuBTN").click(function () {
        $(".MenuWapper").slideToggle();
        $(".overleybg").fadeToggle();
        $(".profileMenuBTN").toggleClass("CloseBTN");
      });
    });

    this.ChildSponsership = localStorage.getItem('ChildSponsership')

    this.DonorID = Globalvar.getDonorId();
    this.API_USERID = Globalvar.getApiUserId();

    Globalvar.donorIdChanged.subscribe(
      (id: number) => {
        this.DonorID = id;
        if (!this.DonorID) {
          this.router.navigate(['']);
        }
      }
    );

    if (!this.DonorID) {
          this.router.navigate(['']);
        }
    this.GetDnorProfileDetails();
    this.GetDonorDonations(this.DonorID);
    this.GetRecentDonations(this.DonorID);
    this.NetworkFundraiseDetails(this.DonorID)

    //console.log("this.DonorID =", this.DonorID, "this.API_USERID =", this.API_USERID);




  }
  onmoveFn(data: NguCarouselStore) {
    //console.log(data);
  }

}
