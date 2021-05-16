import { Component, OnInit, Output, HostListener, PLATFORM_ID, Inject, Optional, AfterViewInit, OnDestroy } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { needsService } from '../../services/needs.service';
import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticateDonorUsersLeadService } from '../../services/authenticate-donor-users-lead.service';
import { HttpClient } from '@angular/common/http';
import { CartService } from '../../services/cart.service';
import { Globalvar } from '../../classes/globalvar';
import { LoginClass } from '../../classes/login';
import { NgxSpinnerService } from 'ngx-spinner';
import { Title, Meta } from '@angular/platform-browser';
import { AuthenticationService } from '../../services/authentication.service';
import { isPlatformServer, isPlatformBrowser } from '@angular/common';
import { DeviceDetectorService } from 'ngx-device-detector';
import { DonorprofileService } from '../../services/donorprofile.service';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Gtag } from 'angular-gtag';  
import { LinkService } from '../../services/link.service';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  faShoppingCart = faShoppingCart;
  subscription: Subscription; 
  deviceInfo = null;
  isBrowser:boolean;
  private returnURL;
  public TOPMENU = [];
  public DONATE = [];
  public ABOUTUS = [];
  public FUNDRAISE = [];
  public ACCOUNT = [];
  constructor(
    private _route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private donorprofileDetails: DonorprofileService,
    private MenuNeeds: needsService,
    private modalService: NgbModal,
    private LoginDetail: AuthenticateDonorUsersLeadService,
    private CartService: CartService,
    private spinner: NgxSpinnerService,
    private activeRoute: ActivatedRoute,
    private deviceService: DeviceDetectorService,
    private titleService: Title,
    private metaService: Meta,
    private authService: AuthenticationService,
    private gtag: Gtag,
    private linkService: LinkService,
    @Optional() @Inject('REQUEST') private request: any,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.epicFunction();
    this.isBrowser = isPlatformBrowser(this.platformId)
    // ROUTING CHANGE EVENT
    router.events.subscribe((event: any) => {
      if (event instanceof NavigationStart) {
        // Show loading indicator
        if(this.isBrowser){
          $(".menuBox").removeClass("mobile")
          $("body").removeClass("menuActive")
        }        
      }

      if (event instanceof NavigationEnd) {
        //console.log("Hide loading indicator")
        //console.log("Roting Event", event);
        if(this.isBrowser){
          this.WebsiteTracking();
        }
        
        // if (isPlatformBrowser(this.platformId)) {
        //   this.setMetaTags(this.router.url);
        // }
        //setTimeout(() => {

        // var url = this.router.url
        //if (isPlatformServer(this.platformId)) {
        //console.log(this.router)
        if(this.isBrowser){
          this.HeaderBottomBorder(this.router.url)
        }
        
        // }
        //}, 3000);
        if (isPlatformBrowser(this.platformId)) {
          this.checkstatus();
          //console.log("Route event", this.router);
          localStorage.setItem('PreviousUrl', localStorage.getItem('CurrentUrl'))
          localStorage.setItem('CurrentUrl', window.location.href);

          var url = this.router.url;
          if (url.toString().includes("donate/details/")) {
            window['donateDetailsComponentRef'].zone.run(() => { window['donateDetailsComponentRef'].component.RunOnInit(); });
          }
          if (url.toString().includes("donate/completed-needs/")) {
            window['completedNeedsDetailsComponentRef'].zone.run(() => { window['completedNeedsDetailsComponentRef'].component.RunOnInit(); });
          }
          gtag.pageview();
        }
        
      }

      if (event instanceof NavigationError) {
        // Hide loading indicator
        // Present error to user
        //console.log(event.error);
      }
    });
    // CHECK IF URL has return parameters
    this._route.queryParams.subscribe(params => {
      this.returnURL = params['returnUrl'];
    });
  }

  public headerBorder = false;

  HeaderBottomBorder(url) {
    //console.log()
    if (url === "/") {
      $(".header").removeClass("HeaderBorderBottom")
    } else {
      $(".header").addClass("HeaderBorderBottom")
    }
  }
  public Device
  epicFunction() {
    this.deviceInfo = this.deviceService.getDeviceInfo();
    const isMobile = this.deviceService.isMobile();
    const isTablet = this.deviceService.isTablet();
    const isDesktopDevice = this.deviceService.isDesktop();
    this.Device = this.deviceInfo.os
    //console.log(this.deviceInfo);
    //console.log(isMobile);  // returns if the device is a mobile device (android / iPhone / windows-phone etc)
    //console.log(isTablet);  // returns if the device us a tablet (iPad etc)
    //console.log(isDesktopDevice); // returns if the app is running on a Desktop browser.
    if (isPlatformBrowser(this.platformId)) {
      if (isMobile) {
        localStorage.setItem("Device", 'Mobile')
      } else if (isTablet) {
        localStorage.setItem("Device", 'Tablet')
      } else if (isDesktopDevice) {
        localStorage.setItem("Device", 'Desktop')
      }
    }
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

  public UserName;
  GetDnorProfileDetails() {
    if (this.DonorID) {
      this.donorprofileDetails.GetDonorUsersLead().subscribe((donorDetails) => {
        localStorage.setItem('NRI_STATUS', '' + donorDetails[0].NATIONALITY);
        var userName = 'Hi ' + donorDetails[0].FIRSTNAME
        localStorage.setItem('USER_NAME', donorDetails[0].FIRSTNAME + ' ' + donorDetails[0].LASTNAME)        
        var newName = userName.length < 10 ? userName : userName.slice(0, 10) + '..'
        this.UserName = newName
        localStorage.setItem('USER_NAME_LOGIN', this.UserName)
        //console.log("UserName", this.UserName, donorDetails)
      })
    // } else {
    //   if (isPlatformBrowser(this.platformId)) {
    //     localStorage.removeItem('USER_NAME');
    //     localStorage.removeItem('currentUser');

    //   }
    }
  }


  GetMenu() {
    this.LoginDetail.GetMenu().subscribe((Data) => {
      //console.log("TOPMENU", Data);
      Data.forEach(element => {
        if (element.MenuName == 'Donate') {
          this.DONATE.push(element)
        } else if (element.MenuName == 'About us') {
          this.ABOUTUS.push(element)
        } else if (element.MenuName == 'Fundraise') {
          this.FUNDRAISE.push(element)
        } else if (element.MenuName == 'My Account') {
          this.ACCOUNT.push(element)
        }
        this.TOPMENU = Data
      });
    });

    // $(".menuBox").find('a').click(function(){
    //   $(this).parents(".mLink").addClass('active').siblings('.mLink').removeClass('active')
    // })
  }

  public DonorID;
  public APIUSERID;
  public cartItem;
  GetCartItem(DonorID) {
    if (isPlatformBrowser(this.platformId)) {
      //console.log("cartItem Done")
      this.CartService.CartService(DonorID).subscribe((CartNeedData) => {
        this.cartItem = CartNeedData.length
        localStorage.setItem('CartItems', this.cartItem)
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

  forgotPassChangeScreen() {
    this.ForgotPassSuccessfully = true
    this.LoginForm = false
    this.ForgotPassError = false
    var thisO = this
    $(".modal-title").text('Forgot Password');
    $(".modal-content").on("focus", "#FP_Email", function () {
      thisO.ForgotPassError = false
      console.log(thisO.ForgotPassError)
    })
    // $("#FP_Email").focus(function () {
    //   thisO.ForgotPassError = false
    //   //console.log(thisO.ForgotPassError)
    // })
  }

  public FORGOT_PASS_EMAILID;
  GetForgotPassSuccess(ngForm) {
    console.log(ngForm)
    if (ngForm.valid) {
      this.spinner.show()
      this.LoginDetail.GetForgotPassword(ngForm.value.FP_Email).subscribe((data) => {
        console.log("FORGOT_PASS_EMAILID", data)
        if (data == 'Mail Sent') {
          this.ForgotPassSuccessfully = false
          $(".modal-title").text('Password has been sent to your email ID');
          this.spinner.hide()
        } else {
          this.ForgotPassError = true
          this.spinner.hide();
        }
      })
      //console.log("Forgot Pass", ngForm)
    }
  }


  public megaMenuNeedList = []
  MegaMenuNeeds() {
    this.MenuNeeds.getNeedsMegaMenu().subscribe((needsList) => {
      //console.log("needsList = ", needsList);
      var i = 0;
      for (var i = 0; i < needsList.length; i++) {
        this.megaMenuNeedList.push(needsList[i])
        if (i === 1) {
          break;
        }
      }
    });
  }
  public typeID: number;
  public TypeName;

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  public closeResult: string;

  open(content) {
    this.modalService.open(content, { backdropClass: 'light-blue-backdrop', windowClass: 'dark-modal' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      //console.log("reson", this.closeResult = `Closed with: ${result}`)
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      //console.log("reson2", this.closeResult)
      this.ForgotPassSuccessfully = false;
      this.LoginForm = true;
      this.LOGINPASSWORD_WORNG = false
    });
  }
  public ChildSponsership;


  public LOGIN_EMAILID;
  public LOGIN_PASSWORD = '';
  public INVITED_EMAILID;

  public submitSuccessfully = false;
  public ForgotPassSuccessfully = false;
  public LoginForm = true;
  public ForgotPassError = false;
  public ERROR: any;
  public LOGINPASSWORD_WORNG = false;
  public FundRaiseDonor
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
            document.getElementById("modalClose").click();
            this.PostFundRaiseInvites('Login')
            this.spinner.hide();
            // check return parameter
            this.LOGINPASSWORD_WORNG = false
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
    }
  }

  public SearchKey;
  SearchBox(form) {
    if (form.valid) {
      var key = form.value.searchKey
      var newkey = key.replace(/  +/g, ' '); // remove extra white spaces
      if (key) {
        var regex = /^[_A-z0-9]*((-|\s)*[_A-z0-9])*$/g // without Special Characters
        if (newkey.match(regex)) {
          this.router.navigate(['/search/' + newkey]);
          $(".serchBtn").removeClass("active")
        } else {
          alert('Remove Special Characters')
        }
      }
    }
  }

  logOut() {
    //localStorage.setItem('DONORID', '');

    //console.log("DONORID =", Globalvar.getDonorId()) //localStorage.getItem('DONORID'));

    //this.DonorID = Globalvar.getDonorId() //localStorage.getItem('DONORID')
    //this.GetCartItem(this.DonorID)
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('currentUser');
      localStorage.removeItem('USER_NAME')
      localStorage.removeItem('FundRaiseDonor')
      localStorage.removeItem('APIUSERID')
      localStorage.removeItem('USER_EMAILID')
      localStorage.removeItem('loginTime')
      localStorage.removeItem('NRI_STATUS')
    }
    this.router.navigate(['/']);
    //this.DonorID = Globalvar.getDonorId()
    Globalvar.setDonorId(Globalvar.getDonorId());
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

  Get_browser_info() {
    var ua = navigator.userAgent, tem, M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if (/trident/i.test(M[1])) {
      tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
      return { name: 'IE ', version: (tem[1] || '') };
    }
    if (M[1] === 'Chrome') {
      tem = ua.match(/\bOPR\/(\d+)/)
      if (tem != null) { return { name: 'Opera', version: tem[1] }; }
    }
    M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
    if ((tem = ua.match(/version\/(\d+)/i)) != null) { M.splice(1, 1, tem[1]); }
    return {
      name: M[0],
      version: M[1]
    };
  }

  public ipAddress;
  GetIPAddress = function () {
    var thisO = this
    $.getJSON("https://jsonip.com?callback=?", function (data) {
      var ip = data.ip
      thisO.ipAddress = ip
    });
  };

  ChangeModel(ModelName, closeBtn) {
    //console.log(ModelName)
    document.getElementById("" + closeBtn).click();
    setTimeout(() => {
      document.getElementById("" + ModelName).click()
    }, 50);
  }


  WebsiteTracking() {
    var thisO = this;
    if(this.isBrowser){
      this.GetIPAddress()
    }
    
    var url = window.location.href;
    var NeedID = window.location.pathname.match(/\d+/)
    var NewNeedID, REFFERALURL = "";
    if (NeedID !== null) { NewNeedID = parseInt(NeedID[0]) } else { NewNeedID = ''; }

    var language = window.navigator.language;

    var motCode = this.getQueryVariable('motcode');
    if (isPlatformBrowser(this.platformId)) {
      if (motCode) { 
        sessionStorage.setItem('MotCode', '' + motCode) 
      }
      REFFERALURL = localStorage.getItem('PreviousUrl');
    }
    var browser = this.Get_browser_info();
    var Device = this.Device
    //console.log("Device", Device);

    setTimeout(function () {
      var body = {
        'NEEDID': NewNeedID,
        'PAGEID': url,
        'DONORID': Globalvar.getDonorId(),
        'SESSIONID': '',
        'BROWSER_NAME': browser.name,
        'BROWSER_VERSION': browser.version,
        'USERAGENT': navigator.userAgent,
        'BROWSERCOOKIESTATUS': '',
        'LANGUAGE': language,
        'DEVICETYPE': Device,
        'HEIGHT': window.innerHeight,
        'WIDTH': window.innerWidth,
        'COLORDEPTH': '',
        'IPADDRESS': thisO.ipAddress,
        'REFFERALURL': REFFERALURL !== url ? REFFERALURL : '',
        'TEMPFIELD1': '',
        'TEMPFIELD2': '',
        'TEMPFIELD3': '',
        'TEMPFIELD4': '',
        'TEMPFIELD5': '',
        'MOTCODE': motCode,
      }
      //console.log("WebsiteTracking", body)
      thisO.http.post(Globalvar.ApiUrl + "/PostWebsiteTracking", body).subscribe((data) => {
        //console.log("post data web tracking", data)
      })
    }, 400)


  }

  public CHANGEPASSWORD = true;

  public SIGN_UP_TITLE = '';
  public SIGN_UP_EMAILID;
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
          this.LOGIN_EMAILID = form.value.sign_up_emailid;
          this.APIUSERID = data[0].STATUSES[0].status1;
          document.getElementById("modalCloseSignUp").click();
          document.getElementById("signupBtn").click();
          this.PostFundRaiseInvites('Registration')
          form.reset();
          this.LOGINPASSWORD_WORNG = false
          this.spinner.hide()
        } else {
          this.spinner.hide()
          setTimeout(() => {
            alert(data[0].STATUSES[0].status1)
          }, 500);
        }
      })
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

  setMenuOnMobile() {
    $(window).on("load resize", function () {
      $(".collapseMenu").click(function (e) {
        $('.menuBox > .menu > li').removeClass('unhide');
      });
      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        //console.log("userAgent")
        $('.menuBox > .menu > li a').each(function () {
          $(this).click(function (e) {
            $(this).parent().removeClass('unhide');
          });
        });
        $('.subMenu a').each(function () {
          $(this).click(function (e) {
            $(this).parents('.ddi').addClass('unhide');
          });
        });

      } else {
        $('.menuBox > .menu > li').removeClass('unhide');
      }
    })
  }

  public FundraisingResultID;
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
  ngOnInit() {
    if (isPlatformServer(this.platformId)) {
      let canonical = ( this.request.get('https') ? 'https' : "http" ) + "://" + this.request.get('host') + this.request.originalUrl;
      this.linkService.addTag( { rel: 'canonical', href:  canonical} );
    }
    
    this.subscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => window.scrollTo(0,0));

    if (isPlatformBrowser(this.platformId)) {
      this.ChildSponsership = localStorage.getItem('ChildSponsership')
      $(".ddi").hover(
        function () {
          $(this).addClass("active");
          alert("hover")
        }, function () {
          $(this).addClass("active");
          alert("remove hover")
        }
      );
      this.setMenuOnMobile()
    }

    Globalvar.donorIdChanged.subscribe(
      (id: number) => {
        this.DonorID = Globalvar.getDonorId();
        this.APIUSERID = Globalvar.getApiUserId();
      }
    );

    this.GetMenu();
    this.MegaMenuNeeds();
    // if (isPlatformBrowser(this.platformId)) {
    //   this.checkstatus();
    // }

    function menu() {
      $(".collapseMenu").click(function () {
        $(".loginIconMobile").removeClass("active")
        $(".menuBox").toggleClass("mobile")
        $("body").toggleClass("menuActive")
      })
      $('.subMenu').on("click", "a, button", function () {
        if ($(".menuBox").css('position') === 'fixed') {
          $(".menuBox").removeClass("mobile")
          $("body").removeClass("menuActive")
        }
      })
      $(".loginIconMobile").click(function () {
        $(this).toggleClass("active")
        $(".menuBox").removeClass("mobile")
        $("body").removeClass("menuActive")
      })
    }
    function searchSection() {
      $(".headerSearch").click(function () {
        $(this).parents(".serchBtn").addClass("active")
        $(".serchInput").focus()
      })

      $(".wvSerchBox").click(function (e) {
        if ($(e.target).is(".serchInput") === false && $(e.target).is(".s_btn") === false) {
          $(this).parents(".serchBtn").removeClass("active")
        }
      })
    }

    function fixHeader() {
      var wScroll = $(window).scrollTop();
      var headerH = $(".header").height();
      if (wScroll < headerH) {
        $(".header").removeClass("active")
      } else {
        $(".header").addClass("active")
      }
      //console.log(wScroll)
      //$(".menuSection").css("top", wScroll +"px")
    }

    function divEqualheight() {
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

    if(this.isBrowser){
      $(document).on('keydown', '.NumberOnly', function (e) { -1 !== $.inArray(e.keyCode, [46, 8, 9, 27, 13]) || /65|67|86|88/.test(e.keyCode) && (!0 === e.ctrlKey || !0 === e.metaKey) || 35 <= e.keyCode && 40 >= e.keyCode || (e.shiftKey || 48 > e.keyCode || 57 < e.keyCode) && (96 > e.keyCode || 105 < e.keyCode) && e.preventDefault() });
      //this.DonorID = Globalvar.getDonorId();
      this.UserName = localStorage.getItem('USER_NAME_LOGIN')
      //localStorage.setItem('DONORID', '');
      this.DonorID = Globalvar.getDonorId()
      this.APIUSERID = Globalvar.getApiUserId()

      var D_id, thisO = this;
      console.log("aaa", this.DonorID, this.UserName)
      if (this.DonorID > 0) {
        this.GetCartItem(this.DonorID)
      }
      
      $(document).ready(function () {
        fixHeader()
        $(window).scroll(function () {
          fixHeader()
        })
      })

      $(document).ready(function () {
        menu();
        searchSection()
        $('.megaMenu .Mcontant ul li a').click(function () {
          $('.megaMenu .Mcontant').removeClass('active');
        })
      })
    
    }

  }
}
