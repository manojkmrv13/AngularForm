import { AfterViewChecked, ElementRef,Component, OnInit, PLATFORM_ID, Inject, HostListener, ViewChild, AfterViewInit} from '@angular/core';
import { NguCarouselConfig, NguCarouselStore } from '@ngu/carousel';
import { isPlatformBrowser } from '@angular/common';
import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import {MatInputModule} from '@angular/material/input';
import { CartDeleteNeedIdService } from '../../services/cart-delete-need-id.service';
import { needsService } from '../../services/needs.service';
import { CartService } from '../../services/cart.service';
import { Router, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
import { DonorprofileService } from '../../services/donorprofile.service';
import { AuthenticateDonorUsersLeadService } from '../../services/authenticate-donor-users-lead.service';
import { Globalvar } from '../../classes/globalvar';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoginClass } from '../../classes/login';
import { HomePageBannerService } from '../../services/home-page-banner.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
/* import { timeStamp } from 'console'; */
declare var $: any;
declare var Swiper: any;
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { HttpClient } from '@angular/common/http';
import { SlickCarouselComponent } from "ngx-slick-carousel";
import { OwlOptions } from 'ngx-owl-carousel-o';
import { DOCUMENT } from '@angular/common';
import { SwiperComponent, SwiperDirective, SwiperConfigInterface,
  SwiperScrollbarInterface, SwiperPaginationInterface } from 'ngx-swiper-wrapper';
@Component({
  selector: 'app-bannerneed',
  templateUrl: './bannerneed.component.html',
  styleUrls: ['./bannerneed.component.css']
})  
export class BannerneedComponent implements OnInit,AfterViewInit {
  @ViewChild('scrollMe', {static: false}) private myScrollContainer: ElementRef;
  @ViewChild('slickModal', {static: false}) public slickModal: SlickCarouselComponent;
  selectedIndex: number = null;
  public indexCart=0;
  public index=0;
  public CHANGEPASSWORD = true; 
  public tabChecked = false;
  public editable = false;
  public maxlength:number = 8;
  public UrgentNeeds = [];
  public SIGN_UP_TITLE = '';
  public SIGN_UP_EMAILID;
  public storedCartCount;
  public storedCartData:any;
  public SIGN_UP_PASSWORD;
  public SIGN_UP_FIRSTNAME;
  public SIGN_UP_LASTNAME;
  public SIGN_UP_MOBILE;
  public SIGN_UP_ADDRESS_LINE_1;
  public SIGN_UP_ADDRESS_LINE_2;
  public SIGN_UP_ADDRESS_LINE_3;
  public SIGN_UP_POSTALCODE;
  public SIGN_UP_CONFIRM_PASSWORD;
  public SIGN_UP_NATIONALITY = '';
  public SIGN_UP_COUNTRY;
  public SIGN_UP_STATE;
  public SIGN_UP_CITY;
  isBrowser: boolean;
  public DonorID;
  public APIUSERID;
  private modalService: NgbModal;
  public checkoutArray = [];
  public getSectors = [];
  public getCurrentSectors;
  public getTopDonation;
  public getBelowDonation = [];
  public resultArray = [];
  public total = 0;
  public typingAmt:number = 0;
  showMainContent: Boolean = true;
  removeFromCheckout: Boolean = true;
  public LOGIN_EMAILID;
  public LOGIN_PASSWORD = '';
  public INVITED_EMAILID;
  public submitSuccessfully = false;
  public ForgotPassSuccessfully = false;
  public LoginForm = true;
  public ForgotPassError = false;
  public ERROR: any;
  public LOGINPASSWORD_WORNG = false;
  public FundRaiseDonor;
  public ChildSponsership;
  private returnURL;
  public cartItem;
  public getcartItem;
  defaultImage = '../assets/images/bannerBG.png';
  title = 'ngSlick';
  public config: SwiperConfigInterface = {
    a11y: true,
    direction: 'vertical',
    slidesPerView: 2,
    keyboard: true,
    mousewheel: true,
    scrollbar: false,
    uniqueNavElements: true,
	navigation: {
      nextEl: '.swiper-button-next2',
      prevEl: '.swiper-button-prev2',
    },
	watchOverflow:true,
    pagination: false,
    spaceBetween: 25,
    observer: true,
    loop:false,
    breakpoints: {
     
      767: {
        slidesPerView: 2,
        spaceBetween: 15,
      },
      500: {
        slidesPerView: 2,
        spaceBetween: 15
      },
      320:{slidesPerView: 2,
        spaceBetween: 15,}
    }
  };
  public configDesktop: SwiperConfigInterface = {
    a11y: true,
    direction: 'horizontal',
    slidesPerView: 4,
    keyboard: true,
    freeMode: true,
    mousewheel: false,
    scrollbar: false,
    uniqueNavElements: true,
    navigation: {
      nextEl: '.swiper-button-next1',
      prevEl: '.swiper-button-prev1',
    },
    pagination: false,
    spaceBetween:20,
    observer: true, 
    observeParents: true,
    loop:false,
    breakpoints: {
     1024:{
      slidesPerView: 4,
      spaceBetween: 25,
     },
      768: {
        slidesPerView: 3,
        spaceBetween: 25,
      }
    }
    
  };
  public configFirstDesktop: SwiperConfigInterface = {
    a11y: true,
    direction: 'horizontal',
    slidesPerView: 3.5,
    keyboard: true,
    freeMode: true,
    mousewheel: false,
    scrollbar: false,
    navigation: {
      nextEl: '.swiper-button-next3',
      prevEl: '.swiper-button-prev3',
    },
    pagination: false,
    spaceBetween:20,
    observer: true,
    observeParents: true,
    loop:false,
    breakpoints: {
     /*  1024: {
        slidesPerView: 4,
        spaceBetween: 15,
      }, */
      900: {
        slidesPerView: 3.5,
        spaceBetween: 15,
      },
      767: {
        slidesPerView: 3,
        spaceBetween: 15,
      },
      500: {
        slidesPerView: 1.5,
        spaceBetween: 15,
      },
      320:{slidesPerView: 1.5,
        spaceBetween: 15,}
    }
    
    
  };
  /* public configswip: SwiperConfigInterface = {
    a11y: true,
    direction: 'horizontal',
    slidesPerView: 1,
    keyboard: true,
    freeMode: false,
    mousewheel: false,
    scrollbar: false,
    pagination: true,
    navigation: true,
    spaceBetween: 5,
    observer: false,
    loop:false
  }; */
  public configswip: SwiperConfigInterface = {
    a11y: true,
    direction: 'horizontal',
    slidesPerView: 1,
    keyboard: true,
    freeMode: false,
    mousewheel: false,
    scrollbar: false,
    pagination: true,
    uniqueNavElements: true,
    navigation: {
      nextEl: '.swiper-button-next4',
      prevEl: '.swiper-button-prev4',
    },
    spaceBetween: 10,
    observer: true,
    loop:false
  };
  
  /* private scrollbar: SwiperScrollbarInterface = {
    el: '.swiper-scrollbar',
    hide: false,
    draggable: true
  };

  private pagination: SwiperPaginationInterface = {
    el: '.swiper-pagination',
    clickable: true,
    hideOnClick: false
  }; */
  public type: string = 'component';

  public disabled: boolean = false;
  @ViewChild(SwiperComponent, {static: false}) componentRef?: SwiperComponent;
  @ViewChild(SwiperDirective, {static: false}) directiveRef?: SwiperDirective;


  public toggleType(): void {
    this.type = (this.type === 'component') ? 'directive' : 'component';
  }

  public toggleDisabled(): void {
    this.disabled = !this.disabled;
  }

  public slides = [
    'First slide',
    'Second slide',
    'Third slide',
    'Fourth slide',
    'Fifth slide',
    'Sixth slide'
  ];
  public toggleDirection(): void {
    this.config.direction = (this.config.direction === 'horizontal') ? 'vertical' : 'horizontal';
  }

  public toggleSlidesPerView(): void {
    if (this.config.slidesPerView !== 1) {
      this.config.slidesPerView = 1;
    } else {
      this.config.slidesPerView = 2;
    }
  }

  slideConfigCart = {
    "slidesToShow": 1,
    "slidesToScroll": 1,
    "nextArrow": "<div class='nav-btn next-slide'></div>",
    "prevArrow": "<div class='nav-btn prev-slide'></div>",
    "dots": false,
    "infinite": false,
   
  }
  
  slideConfig = {
    "slidesToShow": 4,
    "slidesToScroll": 1,
    "nextArrow": "<div class='nav-btn next-slide'></div>",
    "prevArrow": "<div class='nav-btn prev-slide'></div>",
    "dots": false,
    "speed" : 800,	
	 "cssEase" : 'linear',
    "infinite": false
  };
  slideConfig1 = {
    "slidesToShow": 3.5,
    "slidesToScroll": 1,
    "nextArrow": "<div class='nav-btn next-slide'></div>",
    "prevArrow": "<div class='nav-btn prev-slide'></div>",
    "dots": false,
    "speed" : 800,	
	"cssEase" : 'linear',
    "infinite": false,
    responsive: [
      {
      breakpoint: 1024,
      settings: {
      slidesToShow: 3,
      initialSlide: 1,
      arrows: true,
      dots: true
      }
      },
      {
        breakpoint: 768,
        settings: {
        slidesToShow: 3,
        arrows: false,
        }
        },
      {
      breakpoint: 600,
      settings: {
      slidesToShow: 1.5,
      arrows: false,
      }
      },
      {
      breakpoint: 480,
      settings: {
      slidesToShow: 1.5,
      arrows: false,
      }
      }
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
      ]
  };
  
  // addSlide() {
  //   this.slides.push(488)
  // }

  removeSlide() {
    this.slides.length = this.slides.length - 1;
  }

  slickInit(e) {

  }
  slickInit1(el){
  
  }
  breakpoint(e) {
  }

  afterChange(e) {
  }

  beforeChange(e) {
  }

  public carouselConfig: NguCarouselConfig = {
    grid: { xs: 1, sm: 1, md: 1, lg: 1, all: 0 },
    slide: 1,
    speed: 400,
    point: {
      visible: true
    },
    load: 2,
    loop: false,
    touch: true
  };
  modalOption: NgbModalOptions = {};
  constructor(
    private HomePageBanner: HomePageBannerService,private _route: ActivatedRoute,
    @Inject(PLATFORM_ID) private platformId: Object,
    private http: HttpClient,
    private spinner: NgxSpinnerService,
    private LoginDetail: AuthenticateDonorUsersLeadService,
    private donorprofileDetails: DonorprofileService,
    private router: Router,
    private CartService: CartService,
    private authService: AuthenticationService,
    private homePageNeeds: needsService,
    private DeleteCart: CartDeleteNeedIdService,
    @Inject(DOCUMENT) private document
  ) {
    
    this.isBrowser = isPlatformBrowser(this.platformId)
    if( this.isBrowser ){
      this.HomePageBanner.getUsername = localStorage.getItem('USER_NAME');
      //this.getScreenSize();
      this._route.queryParams.subscribe(params => {
        this.returnURL = params['returnUrl'];
      });
      router.events.subscribe((event: any) => {
        if (isPlatformBrowser(this.platformId)) {
          this.checkstatus();
          //console.log("Route event", this.router);
          localStorage.setItem('PreviousUrl', localStorage.getItem('CurrentUrl'))
          localStorage.setItem('CurrentUrl', window.location.href);
        }
      });
    }
    
  }

  ShowHideButton() {
    this.showMainContent = this.showMainContent ? false : true;
  }

  SignUpSuccess(form) {
    if (form.valid && this.CHANGEPASSWORD) {
      this.spinner.show()
      //console.log("SIGN_UP_FORM", this.CHANGEPASSWORD)
      var body = {
        'TITLE': form.value.sign_up_title,
        'EMAILID': form.value.sign_up_emailid,
        'PASSWORD': form.value.sign_up_PasswordCtrl,
        'FIRSTNAME': form.value.sign_up_firstName,
        'LASTNAME': form.value.sign_up_lastName,
        'MOBILE': form.value.sign_up_mobile,
        'ADDRESS_LINE_1': form.value.SIGN_UP_line1,
        'ADDRESS_LINE_2': form.value.SIGN_UP_line2,
        'ADDRESS_LINE_3': form.value.SIGN_UP_line3,
        'POSTALCODE': form.value.sign_up_postal,
        'CITY': form.value.sign_up_city,
        'STATE': form.value.sign_up_state,
        'COUNTRY': form.value.sign_up_country,
        'NATIONALITY': form.value.sign_up_nationality
      }
      //console.log("SIGN_UP_FORM body", body)
      this.http.post(Globalvar.ApiUrl + "/PostDonorUsersClientAPI", body).subscribe((data) => {
        if (data[0].STATUSES[0].ResultId > 0) {
         // this.checkstatus();
          this.LOGIN_EMAILID = form.value.sign_up_emailid;
          this.APIUSERID = data[0].STATUSES[0].status1;
          this.DonorID = this.APIUSERID;
            Globalvar.setDonorId(this.DonorID);
          //document.getElementById("modalCloseSignUp").click();
          //this.ChangeModel();
          // localStorage.setItem('APIUSERID',this.APIUSERID);
          /* 
          
          document.getElementById("signupBtn").click(); */
         // this.PostFundRaiseInvites('Registration')
         // form.reset();
          this.LOGINPASSWORD_WORNG = false;
          this.LoginDetail.GetAuthenticateDonorUsersLead(form.value.sign_up_emailid, form.value.sign_up_PasswordCtrl).subscribe((Data: LoginClass) => {
            //console.log("Login Data =", Data)
            if (Data) {
              if (Data[0].DONORID > 0) {
                if (isPlatformBrowser(this.platformId)) {
                  localStorage.setItem('loginTime', new Date().toString());
                  localStorage.setItem('currentUser', JSON.stringify(Data));
                  localStorage.setItem('ChildSponsership', 'https://www.worldvision.in/autologin.aspx?user_leadid=' + Data[0].API_USERID + '&user_email=' + form.value.sign_up_emailid)
                }
                this.ChildSponsership = 'https://www.worldvision.in/autologin.aspx?user_leadid=' + Data[0].API_USERID + '&user_email=' + form.value.sign_up_emailid
    
                // localStorage.setItem('DONORID', '' + Data[0].DONORID);
                localStorage.setItem('APIUSERID', '' + Data[0].API_USERID);
                localStorage.setItem('USER_EMAILID', '' + form.value.sign_up_emailid);
                this.GetCartItem(Data[0].DONORID)
                this.DonorID = Data[0].DONORID;
                Globalvar.setDonorId(this.DonorID);
                this.GetDnorProfileDetails()
                //this.closeCartModal();
                $("#myModal").modal("hide");
                this.PostFundRaiseInvites('Login')
                this.spinner.hide();
                // check return parameter
                this.LOGINPASSWORD_WORNG = false;
                
                this.DeleteCart.DeleteDonorCartDonorId(this.DonorID).subscribe((DonorID) => {
                  
                  let cartItems = this.checkoutArray.map(data => {
                    let cartItem = {};
                    if(data.PAYMENT_FREQUENCY == 'One Time'){
                      cartItem={
                        'NEEDID': parseInt(data.NEEDID),
                        'DONORID': this.DonorID,
                        'QUANTITY': data.selectedquantity,
                        'CART_PAYMENT_FREQUENCY': "",
                        'AMOUNT': parseFloat(data.NEED_AMOUNT),
                        'ACTUAL_AMOUNT': parseFloat(data.selectedquantity)
                      };
                    }else{
                      cartItem = {
                        'NEEDID': parseInt(data.NEEDID),
                        'DONORID': this.DonorID,
                        'QUANTITY': "",
                        'CART_PAYMENT_FREQUENCY': data.selectedfrequencyval,
                        'AMOUNT': parseFloat(data.NEED_AMOUNT),
                        'ACTUAL_AMOUNT': parseFloat(data.NEED_AMOUNT)
                      };
                    }
                    return cartItem;
                  });

                  this.http.post(Globalvar.ApiUrl + "/PostDonorCarts", cartItems).subscribe((cartData) => { 
                    if( $('#myModal').hasClass("fromCart") ){
                      localStorage.setItem("goto","LandingPage"); 
                      this.router.navigate(['/payment/details']);
                    }
                  });

                });
              
                 //$(".modal-backdrop.in").remove();
               
                if (this.returnURL !== null && this.returnURL !== undefined && this.returnURL !== "") {
                  //console.log(this.returnURL);
                  this.router.navigate([this.returnURL]);
                }
              } else {
                this.LOGINPASSWORD_WORNG = true;
                this.spinner.hide();
              }
            } else { this.spinner.hide(); }
          });
         // this.spinner.hide();
         // this.addToCart();
         //this.ChangeModel();
        } else {
          this.spinner.hide()
          setTimeout(() => {
            alert(data[0].STATUSES[0].status1)
          }, 500);
        }
      })
    } else {
      for (const key of Object.keys(form.controls)) {
        if (form.controls[key].invalid) {
          this.document.querySelector('[name="' + key + '"]').focus();
          break;
       }
  }
    }
  }
 
  addToCart(){
   // this.checkstatus();
    
    this.DeleteCart.DeleteDonorCartDonorId(this.DonorID).subscribe((DonorID) => {

      let cartItems = this.checkoutArray.map(data => {
        let cartItem = {};
        if(data.PAYMENT_FREQUENCY == 'One Time'){
          cartItem={
            'NEEDID': parseInt(data.NEEDID),
            'DONORID': this.DonorID,
            'QUANTITY': parseInt(data.selectedquantity),
            'CART_PAYMENT_FREQUENCY': "",
            'AMOUNT': parseFloat(data.NEED_AMOUNT),
            'ACTUAL_AMOUNT': parseFloat(data.selectedquantity)
          };
        }else{
          cartItem = {
            'NEEDID': parseInt(data.NEEDID),
            'DONORID': this.DonorID,
            'QUANTITY': "",
            'CART_PAYMENT_FREQUENCY': data.selectedfrequencyval,
            'AMOUNT': parseFloat(data.NEED_AMOUNT),
            'ACTUAL_AMOUNT': parseFloat(data.NEED_AMOUNT)
          };
        }
        return cartItem;
      });

      this.http.post(Globalvar.ApiUrl + "/PostDonorCarts", cartItems).subscribe((cartData) => { 
        localStorage.setItem("goto","LandingPage"); 
        this.router.navigate(['/payment/details']);
      });

    })
   
    
  }
  checkstatus() {
    // CHECK TIME TOKEN
    if (isPlatformBrowser(this.platformId)) {
      let loginTime = localStorage.getItem('loginTime');
    if (loginTime != null) {
      let currentData: string = new Date().toString();
      let diffInMs: number = Date.parse(currentData) - Date.parse(loginTime);
      let diffInMins: number = diffInMs / 1000 / 60;

      if (diffInMins < 25) {        
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        var accessToken = "", donerId = 0, ApiuserId = "";
        if (currentUser != null) {
          accessToken = currentUser[0].accessToken;
          donerId = currentUser[0].DONORID;
          ApiuserId = currentUser[0].API_USERID;
        }
        if (accessToken !== "") {
          var postBody = {
            "accessToken": accessToken,
            "DONORID": donerId,
            "API_USERID": ApiuserId
          };
          this.LoginDetail.postStatus(postBody).subscribe((Data: LoginClass) => {
            //console.log("postStatus ", Data)
            if (Data) {
              if (Data[0].DONORID > 0) {
                localStorage.setItem('loginTime', new Date().toString());
                localStorage.setItem('currentUser', JSON.stringify(Data));
                this.GetDnorProfileDetails()
              } else {
                return <any>this.authService.sessionExpired();
              }
            }
           });
        }
      } else {
        return <any>this.authService.logout();
      }
    }
    }    
  }
  ChangeModel(){
    $(".signin").show();
    $(".createInSign").show();
     $("#LOGINFORM").modal('toggle');
    $(".signupform").hide();
  }
  ConfirmPassword(val, event) {
    //console.log(val, event.target.value)
    if (val && event.target.value) {
      if (val !== event.target.value) {
        this.CHANGEPASSWORD = false;
      } else {
        this.CHANGEPASSWORD = true;
      }
      //console.log(this.CHANGEPASSWORD)
    } else {
      this.CHANGEPASSWORD = true;
    }
  }
  
  forgotPassChangeScreen(){
    $(".signin").hide();
    $(".signupform").hide();
    $(".forgotpassword").show();
    $(".createInSign").hide();
  }
  
  GetUrgentNeeds(Priority) {
    this.homePageNeeds.GetUrgentNeeds(Priority).subscribe((UrgentNeedsData) => {
      this.UrgentNeeds = UrgentNeedsData.filter(e => e.SHOW_IN_LANDINGPAGE == 0);
      this.UrgentNeeds.forEach((item,i) => {
        if(item.NEEDTYPE == 'Individual Needs' && item.PAYMENT_FREQUENCY != 'Monthly' ){
          item.NEED_AMOUNT = "";
        }
        item.val = item.NEED_AMOUNT;
         item.selectedquantity = "1";
         item.removeFromCheckout = true;
         item.editable = false;
         item.needamountoriginalval = item.NEED_AMOUNT;
         item.selectedfrequency = item.PAY_FREQUENCY.length>0?item.PAY_FREQUENCY[0]:"";
         item.selectedfrequencyval = item.PAY_FREQUENCY.length>0?item.PAY_FREQUENCY[0].FREQUENCY:"";
        });
     
    });
  }
  public FORGOT_PASS_EMAILID;
  GetForgotPassSuccess(ngForm) {
    
    if (ngForm.valid) {
      this.spinner.show()
      this.LoginDetail.GetForgotPassword(ngForm.value.FP_Email).subscribe((data) => {
        
        if (data == 'Mail Sent') {
          this.ForgotPassSuccessfully = false
          $(".modal-title.forgotpassword").text('Password has been sent to your email ID');
          this.spinner.hide()
        } else {
          this.ForgotPassError = true
          this.spinner.hide();
        }
      })
      //console.log("Forgot Pass", ngForm)
    }
  }
  ngAfterViewChecked() {        
    this.scrollToBottom();        
} 
scrollToBottom(): void {
        try {
            this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
        } catch(err) { }                 
    }
  GetLoginSuccess(ngForm) {
    //  console.log("form Data", ngForm)
    if (ngForm.valid) {
      this.spinner.show();
      this.LoginDetail.GetAuthenticateDonorUsersLead(ngForm.value.txtEmail, ngForm.value.PasswordCtrl).subscribe((Data: LoginClass) => {
        //console.log("Login Data =", Data)
        if (Data) {
          if (Data[0].DONORID > 0) {
            if (isPlatformBrowser(this.platformId)) {
              localStorage.setItem('loginTime', new Date().toString());
              localStorage.setItem('currentUser', JSON.stringify(Data));
              localStorage.setItem('ChildSponsership', 'https://www.worldvision.in/autologin.aspx?user_leadid=' + Data[0].API_USERID + '&user_email=' + ngForm.value.txtEmail)
            }
            this.ChildSponsership = 'https://www.worldvision.in/autologin.aspx?user_leadid=' + Data[0].API_USERID + '&user_email=' + ngForm.value.txtEmail

            // localStorage.setItem('DONORID', '' + Data[0].DONORID);
            localStorage.setItem('APIUSERID', '' + Data[0].API_USERID);
            localStorage.setItem('USER_EMAILID', '' + ngForm.value.txtEmail);
            this.GetCartItem(Data[0].DONORID)
            this.DonorID = Data[0].DONORID;
            Globalvar.setDonorId(this.DonorID);
            this.GetDnorProfileDetails()
            //this.closeCartModal();
            $("#myModal").modal("hide");
            this.PostFundRaiseInvites('Login')
            this.spinner.hide();
            // check return parameter
            this.LOGINPASSWORD_WORNG = false;
            
            this.DeleteCart.DeleteDonorCartDonorId(this.DonorID).subscribe((DonorID) => {

              let cartItems = this.checkoutArray.map(data => {
                let cartItem = {};
                if(data.PAYMENT_FREQUENCY == 'One Time'){
                  cartItem={
                    'NEEDID': parseInt(data.NEEDID),
                    'DONORID': this.DonorID,
                    'QUANTITY': data.selectedquantity,
                    'CART_PAYMENT_FREQUENCY': "",
                    'AMOUNT': parseFloat(data.NEED_AMOUNT),
                    'ACTUAL_AMOUNT': parseFloat(data.selectedquantity)
                  };
                }else{
                  cartItem = {
                    'NEEDID': parseInt(data.NEEDID),
                    'DONORID': this.DonorID,
                    'QUANTITY': "",
                    'CART_PAYMENT_FREQUENCY': data.selectedfrequencyval,
                    'AMOUNT': parseFloat(data.NEED_AMOUNT),
                    'ACTUAL_AMOUNT': parseFloat(data.NEED_AMOUNT)
                  };
                }
                return cartItem;
              });

              this.http.post(Globalvar.ApiUrl + "/PostDonorCarts", cartItems).subscribe((cartData) => { 
                if( $('#myModal').hasClass("fromCart") ){
                  localStorage.setItem("goto","LandingPage"); 
                  this.router.navigate(['/payment/details']);
                }
              });

            });
            
            if (this.returnURL !== null && this.returnURL !== undefined && this.returnURL !== "") {
              //console.log(this.returnURL);
              this.router.navigate([this.returnURL]);
            }
          } else {
            this.LOGINPASSWORD_WORNG = true;
            this.spinner.hide();
          }
        } else { this.spinner.hide(); }
        this.HomePageBanner.getUsername = localStorage.getItem('USER_NAME'); 
      });
    }
  }
  PostFundRaiseInvites(key) {
    if (window.location.href.indexOf("my-fundraisers/") > -1) {
      this.FundRaiseDonor = localStorage.getItem('FundRaiseDonor')
      if (!this.FundRaiseDonor) {
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
          if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem('FUNDRAISEID_FOR_PAYMENT', "" + id);
          }
        })
      }
    }
  }
  //  SubmitSubscribForm(form) {
  //   if (form.valid) {
  //     this.spinner.show();
  //     var ipAdd;
  //     $.getJSON('http://ipinfo.io', function (data) {
  //       ipAdd = data.ip
  //     });
  //     var body = {
  //       'EMAILID': form.value.SubEmail,
  //       'TOPIC': '',
  //       'IPADDRESS': ipAdd,
  //       'USERAGENT': '',
  //       'CREATEDBY': this.DONORID ? this.DONORID : ''
  //     }

  //     this.http.post(Globalvar.ApiUrl + "/PostNewsletters", body).subscribe((result) => {
   
  //       this.spinner.hide();
  //       setTimeout(() => {
  //         if (result[0].STATUSES[0].ResultId == 0) {
  //           alert('You are already subscribed.')
  //         } else {
  //           alert('Your details are updated successfully.')
  //           $("#SubEmail").val('')
  //         }
  //       }, 200)
  //     })
  //   }
  // }
  public UserName;
  GetDnorProfileDetails() {
    if (this.DonorID) {
      this.donorprofileDetails.GetDonorUsersLead().subscribe((donorDetails) => {
        localStorage.setItem('NRI_STATUS', '' + donorDetails[0].NATIONALITY);
        var userName =  donorDetails[0].FIRSTNAME
        localStorage.setItem('USER_NAME', donorDetails[0].FIRSTNAME + ' ' + donorDetails[0].LASTNAME);
        
        var newName = userName.length < 10 ? userName : userName.slice(0, 10) + '..'
        this.UserName = newName
        localStorage.setItem('USER_NAME_LOGIN', this.UserName);
        this.HomePageBanner.getUsername = localStorage.getItem('USER_NAME');  
              
        //console.log("UserName", this.UserName, donorDetails)
      })
    // } else {
    //   if (isPlatformBrowser(this.platformId)) {
    //     localStorage.removeItem('USER_NAME');
    //     localStorage.removeItem('currentUser');

    //   }
    }
  }
  stickyclose(){
    $(".checkout").hide(500);
    $(".row.footerBottom").css("margin-bottom","0");
  }
  GetCartItem(DonorID) {
    if (isPlatformBrowser(this.platformId)) {
      //console.log("cartItem Done")
      this.CartService.CartService(DonorID).subscribe((CartNeedData) => {
        this.cartItem = CartNeedData.length
        localStorage.setItem('CartItems', this.cartItem);
      })


      var thisO = this
      setInterval(function () {
        if (thisO.cartItem !== localStorage.getItem('CartItems')) {
          thisO.cartItem = localStorage.getItem('CartItems')
          //console.log("CartItems =", localStorage.getItem('CartItems'));
        }
      }, 500);
    }
  }
/*   PostFundRaiseInvites(key) {
    if (window.location.href.indexOf("my-fundraisers/") > -1) {
      this.FundRaiseDonor = localStorage.getItem('FundRaiseDonor')
      if (!this.FundRaiseDonor) {
        this.FundRaiseDonor = 1;
        localStorage.setItem('FundRaiseDonor', '' + this.FundRaiseDonor)
        var path = window.location.pathname
        path = path.substring(0, path.lastIndexOf("/"))
        var id = path.match(/\d+/g).map(Number);
        var body = {
          'FUNDRAISEID': '' + id,
          'INVITED_EMAILID': this.LOGIN_EMAILID,
          'REGISTERED_OR_LOGGEDIN': key,
          'API_USERID': this.APIUSERID,
        }
        this.http.post(Globalvar.ApiUrl + "/PostFundRaiseInvitesApiUserId", body).subscribe((data) => {
          if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem('FUNDRAISEID_FOR_PAYMENT', "" + id);
          }
        })
      }
    }
  } */
  currenttab;
  tabClick(data,index){
   
    this.selectedIndex = index;
    const result = this.getBelowDonation.filter(word => word.SECTOR == data);
    this.resultArray = result;

  }
  
  ngAfterViewInit(){

    if (!this.directiveRef) {
      this.directiveRef.update();
      }
     
  }
  ngOnInit() {

    if( this.isBrowser ){
      
      new Swiper('.swiper-container.cart-swiper', {
        a11y: true,
        direction: 'horizontal',
        slidesPerView: 1,
        keyboard: true,
        mousewheel: true,
        scrollbar: false,
        pagination: false,
        navigation: true,
        spaceBetween: 10,
        speed: 700,
        loop:false,
        observer: true, 
         observeParents: true
       });
       
       new Swiper('.swiper-container.configDesktop', {
        a11y: true,
        direction: 'horizontal',
        slidesPerView: 4,
        keyboard: true,
        freeMode: true,
        mousewheel: false,
        scrollbar: false,
        navigation:true,
        speed: 700,
        pagination: false,
        spaceBetween:20,
        observer: true,
        loop:false,
        breakpoints: {
         1024:{
          slidesPerView: 4,
          spaceBetween: 25,
         },
          768: {
            slidesPerView: 3,
            spaceBetween: 25,
          }
        },
         observeParents: true
       });

      localStorage.removeItem("goto");
      this.storedCartData = JSON.parse(localStorage.getItem("cartItems"));
      this.DonorID = Globalvar.getDonorId()
      this.HomePageBanner.getCartCount = 0;
      this.HomePageBanner.getUsername = localStorage.getItem('USER_NAME'); 
      $(".checkout").hide();
      $(".row.footerBottom").css("margin-bottom","0");
      $(".signin").hide();
      $(".forgotpassword").hide();
    }
  
    this.typingAmt = 0;
   
    this.GetUrgentNeeds('Urgent');
    this.homePageNeeds.GetLandingPageNeeds().subscribe((data1) => {
      var data = [];
      data1.forEach((item,i) => {
        if(item.DONATION_PERCENTAGE == 100){
          if(item.NEEDTYPE != 'Individual Needs'){
            data.push(item);
          }  
        }else{
          data.push(item);
        }
      })

      this.getTopDonation = data;
      this.resultArray = data;
    
      this.resultArray.forEach((item,i) => {
        if(item.NEEDTYPE == 'Individual Needs' && item.PAYMENT_FREQUENCY != 'Monthly' ){
          // item.NEED_AMOUNT = item.TOTAL_NEED_AMOUNT - item.DONATION_AMOUNT;
          item.NEED_AMOUNT = "";
           item.val = item.NEED_AMOUNT;
          item.selectedquantity = "1";
          item.removeFromCheckout = true;
          item.editable = false;
          item.needamountoriginalval = item.NEED_AMOUNT;
          item.selectedfrequency = item.PAY_FREQUENCY.length>0?item.PAY_FREQUENCY[0]:"";
          item.selectedfrequencyval = item.PAY_FREQUENCY.length>0?item.PAY_FREQUENCY[0].FREQUENCY:"";
        }
      })
      this.getTopDonation.forEach((element,i) => {
       // if(i>4){
          this.getBelowDonation.push(element);
          element.selectedquantity = "1";
          element.selectedfrequency = element.PAY_FREQUENCY.length>0?element.PAY_FREQUENCY[0]:"";
          element.selectedfrequencyval = element.PAY_FREQUENCY.length>0?element.PAY_FREQUENCY[0].FREQUENCY:"";
          element.removeFromCheckout = true;
          element.editable = false;
          element.needamountoriginalval = element.NEED_AMOUNT;
          element.val = '';
          this.getSectors.push(element.SECTOR);
          var uniqueNames = [];
          this.getSectors.forEach( function(el, i){ 
            if( uniqueNames.indexOf(el) === -1 ) uniqueNames.push(el);
          })
          
          this.getCurrentSectors = uniqueNames;
          //const result = this.getBelowDonation.filter(word => word.SECTOR == this.getCurrentSectors[0]);
          this.resultArray =[];
          for(let i=0;i<this.getTopDonation.length;i++){
          if(i>4){
            this.resultArray.push(this.getTopDonation[i]);
          }
        }

        this.resultArray.forEach((item,i) => {
          if(item.NEEDTYPE == 'Individual Needs' && item.PAYMENT_FREQUENCY != 'Monthly'  ){
          // item.NEED_AMOUNT = item.TOTAL_NEED_AMOUNT - item.DONATION_AMOUNT;
          item.NEED_AMOUNT = "";
            item.val = item.NEED_AMOUNT;
            item.selectedquantity = "1";
            item.removeFromCheckout = true;
            item.editable = false;
            item.needamountoriginalval = item.NEED_AMOUNT;
            item.selectedfrequency = item.PAY_FREQUENCY.length>0?item.PAY_FREQUENCY[0]:"";
            item.selectedfrequencyval = item.PAY_FREQUENCY.length>0?item.PAY_FREQUENCY[0].FREQUENCY:"";
          }
        })

        if(this.storedCartData != undefined && this.storedCartData.length > 0){
          this.checkoutArray = this.storedCartData;
          
          this.checkoutArray.forEach((item,i) => {
            if(item.typeDiff="urgentNeed"){
              this.UrgentNeeds.forEach((element,i) => {
                if(item.NEEDID == element.NEEDID){
                  element.removeFromCheckout = false;
                  element.val = parseInt(item.NEED_AMOUNT);
                  element.NEED_AMOUNT = parseInt(item.NEED_AMOUNT);
                  if(item.NEEDTYPE == 'Gift Catalogue'){
                    element.selectedquantity = item.selectedquantity;
                  }
                  else if(item.NEEDTYPE == 'Recurrin Gifts'){
                    element.selectedfrequencyval = item.selectedfrequencyval;
                  }
                }
              });
            }
            if(item.typeDiff="getTopNotation"){
              this.getTopDonation.forEach((element,i) => {
                if(item.NEEDID == element.NEEDID){
                  element.removeFromCheckout = false;
                  element.val = parseInt(item.NEED_AMOUNT);
                  element.NEED_AMOUNT = parseInt(item.NEED_AMOUNT);
                  if(item.NEEDTYPE == 'Gift Catalogue'){
                    element.selectedquantity = item.selectedquantity;
                  }
                  else if(item.NEEDTYPE == 'Recurrin Gifts'){
                    element.selectedfrequencyval = item.selectedfrequencyval;
                  }
                } 
              });
            }
            if(item.typeDiff="resultArray"){
              this.resultArray.forEach((element,i) => {
                if(i>4){
                if(item.NEEDID == element.NEEDID){
                  element.removeFromCheckout = false;
                  element.val = parseInt(item.NEED_AMOUNT);
                  element.NEED_AMOUNT = parseInt(item.NEED_AMOUNT);
                  if(item.NEEDTYPE == 'Gift Catalogue'){
                    element.selectedquantity = item.selectedquantity;
                  }
                  else if(item.NEEDTYPE == 'Recurrin Gifts'){
                    element.selectedfrequencyval = item.selectedfrequencyval;
                  }         
                }
              }
              });
            }
          
          });
          this.totalamountcalculation();
        }

      });

    });

  }

  onmoveFn(data: NguCarouselStore) {
    //console.log(data);
  }
  /* openSignin(){
    $(".signupform").hide();
    $(".signin").show();
  } */
  Changesignup(){
    $(".createInSign").hide();
    $(".forgotpassword").hide();
    $(".signupform").show();
    $(".signin").hide();
   
  }
    
  pay(){
   



    // $(".forgotpassword").hide();
    // $(".signupform").show();
    // $(".signin").hide();
    // $(".createInSign").hide();
    // $(".demo").hide();
    $("#myModal2").modal('hide');
    
    var getUserId = localStorage.getItem("APIUSERID");
    if(getUserId == "" || getUserId == null){
      this.document.forms.signupform.reset();
      this.document.forms.signinform.reset();
      setTimeout(function () {
        $('#myModal').addClass("fromCart").modal({backdrop: 'static', keyboard: false, focus: false});
        $('body').addClass('modal-open');
        $(".signin").hide();
        $(".forgotpassword").hide();
        $(".createInSign").hide();
        $(".signupform").show();
        $(".demo").hide();
    }, 500);
    }
    else{
      //$(".modal-backdrop.in").remove();
      this.addToCart();
    }
  }
  //@HostListener("window:resize", ["$event"])
getScreenSize(event?) {
  setTimeout(()=>{      
    $('.carousel.slick-slider').resize();
    }, 1000);
}
closeCartModal(){
  this.totalamountcalculation();
}
  forCarousel(){
    
   
      this.getScreenSize();
   // $(".checkout").hide();
    //$("#myModal2").modal('show');
    $(".demo").show();
    $('#myModal2').modal({backdrop: 'static', keyboard: false});
    setTimeout(()=>{      
      this.directiveRef.update();
      }, 3000);
   // $('.modal-backdrop').show();
   /*  this.modalOption.backdrop = 'static';
  this.modalOption.keyboard = false;
  const modalRef = this.modalService.open(BannerneedComponent,this.modalOption); */
    $(".row.footerBottom").css("margin-bottom","0");

  }
  
  notmonthlyamountchange(selectedvalue,index,item){
    var amount = parseInt(selectedvalue) * (this.getTopDonation[index].needamountoriginalval);
    this.getTopDonation[index].NEED_AMOUNT = amount;
    this.totalamountcalculation();
  }
  keyPress(event,index,item) {
    this.getTopDonation[index].editable =true;
    if (this.getTopDonation[index].val == "" && event.which == 48 ){
      this.getTopDonation[index].val = "";
      return false;
   }
   else if(this.getTopDonation[index].length >8){
    this.getTopDonation[index].val = "";
    return false;
   }
}
  keyPressurget(event,index,item) {
    this.UrgentNeeds[index].editable =true;
    if (this.UrgentNeeds[index].val == "" && event.which == 48 ){
      this.UrgentNeeds[index].val = "";
      return false;
   }
   else if(this.UrgentNeeds[index].length >8){
    this.UrgentNeeds[index].val = "";
    return false;
   }
}
keyPressonetime(event,index,item) {
  this.getTopDonation[index].editable =true;
  if (this.getTopDonation[index].NEED_AMOUNT == "" && event.which == 48 ){
    this.getTopDonation[index].NEED_AMOUNT = "";
    return false;
 }
 else if(this.getTopDonation[index].length > 8){
  this.getTopDonation[index].val = "";
  return false;
 }
}
keyPress1(event,index,item) {
  this.resultArray[index].editable =true;
  if ((this.resultArray[index].val == "" && event.which == 48) || (this.resultArray[index].val == null && event.which == 48 )){
    this.resultArray[index].val = "";
    return false;
 }
}
keyPressonetime1(event,index,item) {
  this.resultArray[index].editable =true;
  if ((this.resultArray[index].NEED_AMOUNT == "" && event.which == 48) || (this.resultArray[index].NEED_AMOUNT == null && event.which == 48 )){
  this.resultArray[index].NEED_AMOUNT = "";
  return false;
}
}
indivitualchange(event,selectedvalue,index,item){
  if(selectedvalue !='' && event.which != 48 && selectedvalue != 0){
    /* 
      this.typingAmt= this.typingAmt.replace(/^0+/, '') */
      if(selectedvalue <= (this.getTopDonation[index].TOTAL_NEED_AMOUNT - this.getTopDonation[index].DONATION_AMOUNT) && selectedvalue >= this.resultArray[index].MINIMUM_AMOUNT_PAYABLE){
        var amount = parseInt(selectedvalue);
        this.getTopDonation[index].NEED_AMOUNT = amount;
        this.totalamountcalculation();
      }else{
        // this.resultArray[index].NEED_AMOUNT = this.resultArray[index].TOTAL_NEED_AMOUNT - this.resultArray[index].DONATION_AMOUNT;
        // this.resultArray[index].val = this.resultArray[index].TOTAL_NEED_AMOUNT - this.resultArray[index].DONATION_AMOUNT;
      }
    }else{
      this.getTopDonation[index].val = "";
    }
}
urgentchange(event,selectedvalue,index,item){
  if(selectedvalue !='' && event.which != 48 && selectedvalue != 0){
   
      if(selectedvalue <= (this.UrgentNeeds[index].NEEDTYPE != 'Individual Needs' || this.UrgentNeeds[index].TOTAL_NEED_AMOUNT - this.UrgentNeeds[index].DONATION_AMOUNT) && selectedvalue >= this.UrgentNeeds[index].MINIMUM_AMOUNT_PAYABLE){
        var amount = parseInt(selectedvalue);
        this.UrgentNeeds[index].NEED_AMOUNT = amount;
        this.totalamountcalculation();
      }
    }else{
      this.UrgentNeeds[index].val = "";
    }
}
indivitualchange1(event,selectedvalue,index,item){
  if(selectedvalue !='' && event.which != 48 && selectedvalue != 0){
    /* 
      this.typingAmt= this.typingAmt.replace(/^0+/, '') */
      if(selectedvalue <= (this.resultArray[index].TOTAL_NEED_AMOUNT - this.resultArray[index].DONATION_AMOUNT) && selectedvalue >= this.resultArray[index].MINIMUM_AMOUNT_PAYABLE){
        var amount = parseInt(selectedvalue);
        this.resultArray[index].NEED_AMOUNT = amount;
        this.totalamountcalculation();
      }else{
        // this.resultArray[index].NEED_AMOUNT = this.resultArray[index].TOTAL_NEED_AMOUNT - this.resultArray[index].DONATION_AMOUNT;
        // this.resultArray[index].val = this.resultArray[index].TOTAL_NEED_AMOUNT - this.resultArray[index].DONATION_AMOUNT;
      }
    }else{
      this.resultArray[index].val = "";
    }
}
  notmonthlyamountchange1(event,selectedvalue,index,item){
    if(selectedvalue !='' && event.which != 48 && selectedvalue != 0){
  /* 
    this.typingAmt= this.typingAmt.replace(/^0+/, '') */
    if(selectedvalue < (this.resultArray[index].TOTAL_NEED_AMOUNT - this.resultArray[index].DONATION_AMOUNT) && selectedvalue >= this.resultArray[index].MINIMUM_AMOUNT_PAYABLE){
      var amount = parseInt(selectedvalue);
      this.resultArray[index].NEED_AMOUNT = amount;
      this.totalamountcalculation();
    }else{
      // this.resultArray[index].NEED_AMOUNT = this.resultArray[index].TOTAL_NEED_AMOUNT - this.resultArray[index].DONATION_AMOUNT;
      // this.resultArray[index].val = this.resultArray[index].TOTAL_NEED_AMOUNT - this.resultArray[index].DONATION_AMOUNT;
    }
  }else{
    this.resultArray[index].val = 0;
  }
  }
  ChangingValuecheckout(selectedvalue,index,item){
    var amount = parseInt(selectedvalue) * this.checkoutArray[index].needamountoriginalval;
    this.checkoutArray[index].NEED_AMOUNT = amount;
    this.checkoutArray[index].val = amount;
    this.getTopDonation.forEach(element => {
        if(this.checkoutArray[index].NEEDID == element.NEEDID){
          element.NEED_AMOUNT = amount;
        }
    });
    this.totalamountcalculation();
  }
  deleteitem(i,data){
    this.getTopDonation.forEach(element => {
        if(element.NEEDID == this.checkoutArray[i].NEEDID){
          element.removeFromCheckout = true;
          element.val ="";
          element.editable=false;
        }
    });
    this.UrgentNeeds.forEach(element => {
     /*  if(element.NEEDID == this.checkoutArray[i].NEEDID){
        element.selected = false;
      } */
      if(element.NEEDID == this.checkoutArray[i].NEEDID){
        element.removeFromCheckout = true;
        element.val ="";
        element.editable=false;
      }
  });
  $('#myModal2 .content-container,#myModal2 .action-container').css({"height":"90px","min-height":"90px"})
    this.totalamountcalculation();
    if(this.checkoutArray.length == 0){
      $('#myModal2').modal("hide")
    }

  }
  DonateMore(){
    $(".close").click();
    $(".checkout").show();
  }
  ChangingValuenotmonthly(selectedvalue,index,item){
    var amount = parseInt(selectedvalue) * (this.getTopDonation[index].needamountoriginalval);
    this.getTopDonation[index].NEED_AMOUNT = amount;
    this.totalamountcalculation();
    // if(selectedvalue == '0'){
    //   this.donateNow(item);
    // }
  }
  ChangingValuenotmonthly1(selectedvalue,index,item){
    var amount = parseInt(selectedvalue) * this.resultArray[index].needamountoriginalval;
    this.resultArray[index].NEED_AMOUNT = amount;
    this.totalamountcalculation();
    // if(selectedvalue == '0'){
    //   this.donateNow(item);
    // }
  }
  ChangingValue(selectedvalue,index,item){
    this.getTopDonation[index].selectedfrequencyval = selectedvalue.FREQUENCY;
    this.getTopDonation[index].NEED_AMOUNT = parseInt(selectedvalue.FREQUENCY_AMOUNT);
    this.totalamountcalculation();

    // if(selectedvalue == '0'){
    //   this.donateNow(item);
    // }
  }
  ChangingValue1(selectedvalue,index,item){
    this.resultArray[index].selectedfrequencyval = selectedvalue.FREQUENCY;
    this.resultArray[index].NEED_AMOUNT = parseInt(selectedvalue.FREQUENCY_AMOUNT);
    this.totalamountcalculation();

    // if(selectedvalue == '0'){
    //   this.donateNow(item);
    // }
  }
  ChangingValuecheckoutfre(selectedvalue,index,item){
    this.checkoutArray[index].selectedfrequencyval = selectedvalue.FREQUENCY;
    this.checkoutArray[index].NEED_AMOUNT = parseInt(selectedvalue.FREQUENCY_AMOUNT);
    this.checkoutArray[index].val = parseInt(selectedvalue.FREQUENCY_AMOUNT);
    this.totalamountcalculation();
    this.getTopDonation.forEach(element => {
      if(element.NEEDID == this.checkoutArray[index].NEEDID){
        element.selectedfrequencyval = selectedvalue.FREQUENCY;
        element.NEED_AMOUNT = parseInt(selectedvalue.FREQUENCY_AMOUNT);
        element.val = parseInt(selectedvalue.FREQUENCY_AMOUNT);
      }
    });
  }
  addneeds(item,index){
    this.UrgentNeeds[index].selected = true;
    this.totalamountcalculation();
   let urgentNeedLength = 0;
   this.UrgentNeeds.forEach(element => {
    if(element.selected == false){
      urgentNeedLength = urgentNeedLength + 1;
    }
    });
    if(urgentNeedLength == 0){
      $('#myModal2 .content-container,#myModal2 .action-container').css({"height":0,"min-height":0})
    }
    else{
      $('#myModal2 .content-container,#myModal2 .action-container').css({"height":"90px","min-height":"90px"});
    }
  }
  totalamountcalculation(){
    
    var count = 0;
    this.checkoutArray = [];
    this.total = 0;
    $(".checkout").show(500);
    $(".row.footerBottom").css("margin-bottom","112px");
this.getTopDonation.forEach(element => {
  if(element.removeFromCheckout == false){
    element.typeDiff="getTopNotation";
    this.checkoutArray.push(element);
    count = count + 1;
  }
});
this.resultArray.forEach(element => {
  if(element.removeFromCheckout == false){
    element.typeDiff="resultArray";
    this.checkoutArray.push(element);
    count = count + 1;
  }
});
this.UrgentNeeds.forEach(element => {
  if(element.removeFromCheckout == false){
    element.typeDiff="urgentNeed";
      this.checkoutArray.push(element);
      count = count + 1;
    }
});
this.checkoutArray = this.checkoutArray.filter((el, i, a) => i === a.indexOf(el))

this.checkoutArray.forEach(element => {
  if(element.NEEDTYPE == 'Individual Needs' && element.PRIORITY !="Urgent"){
    this.total = this.total + parseInt(element.val);
  }
  else{
    this.total = this.total + parseInt(element.NEED_AMOUNT);
  }
});
localStorage.setItem("cartItems",JSON.stringify(this.checkoutArray));
/* if(this.storedCartData != undefined || this.storedCartData.length > 0){
  this.storedCartData.forEach(element => {
    this.checkoutArray.forEach(item => {
      if(element.NEEDID != item.NEEDID)
      localStorage.setItem("cartItems",JSON.stringify(this.checkoutArray));
    });
  });
  
} */

this.HomePageBanner.getCartCount = this.checkoutArray.length;
localStorage.setItem("CartDataCount",this.HomePageBanner.getCartCount);
localStorage.setItem("allCartDatas","");
if(count==0){
  $(".checkout").hide();
  $(".row.footerBottom").css("margin-bottom","0");
    this.HomePageBanner.getCartCount = 0;
}


  
  }
  
  donateNow(data){   
    if(data.val == null || data.val == "" || data.val == undefined || data.val == 0){
      if( data.NEEDTYPE == "Individual Needs" ){
        alert("Please add amount!!")
        return;
      }
    }else {
      data.NEED_AMOUNT = data.val;

      if( data.val < data.MINIMUM_AMOUNT_PAYABLE ){
        alert("Please enter minimum amount!!");
        data.val="";
        return;
      } else if((data.TOTAL_NEED_AMOUNT - data.DONATION_AMOUNT) < data.val && data.NEEDTYPE == "Individual Needs"){
        alert("Please enter the required amount!!");
        data.val="";
        return;
      }

    }
  
    if(data.removeFromCheckout == false){
      data.removeFromCheckout = true;
    }else{ 
      data.removeFromCheckout = false;
    }
    this.totalamountcalculation();

  }
}
