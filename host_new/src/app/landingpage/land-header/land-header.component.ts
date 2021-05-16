import { Component, OnInit,Inject, PLATFORM_ID,HostListener, ViewChild } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { AuthenticateDonorUsersLeadService } from './../../services/authenticate-donor-users-lead.service';
import { Globalvar } from '../../classes/globalvar';
import { Router, NavigationStart, NavigationEnd, NavigationError, ActivatedRoute } from '@angular/router';
import { HomePageBannerService } from './../../services/home-page-banner.service';
import { AuthenticationService } from './../../services/authentication.service';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { DOCUMENT } from '@angular/common';

declare var $: any;
declare var require: any;
declare var needShareDropdown: any;
@Component({
  selector: 'app-land-header',
  templateUrl: './land-header.component.html',
  styleUrls: ['./land-header.component.css']
})
export class LandHeaderComponent implements OnInit {
  faShoppingCart = faShoppingCart;
  @ViewChild("insideElement", {static: false}) insideElement;
  @HostListener('document:click', ['$event.target'])
  public onClick(targetElement) {
    const clickedInside = this.insideElement.nativeElement.contains(targetElement);
       if (!clickedInside) {
        $(".logout").removeClass("activelog")
      } 
      if(targetElement.innerHTML == "Logout"){
        $(".logout").removeClass("activelog")
      }
  }
  title = 'ngSlick';
  private LoginDetail: AuthenticateDonorUsersLeadService;

  slides = [342, 453, 846., 855, 234, 564, 744, 243];

  slideConfig1 = {
    "slidesToShow": 1,
    "slidesToScroll": 1,
    "nextArrow": "<div class='nav-btn next-slide'></div>",
    "prevArrow": "<div class='nav-btn prev-slide'></div>",
    "dots": true,
    "infinite": false
  };

  addSlide1() {
    this.slides.push(488)
  }
  logout(){
    this.authService.logout();
    $(".logout").css("display","none")
    this.HomePageBanner.getUsername = "";
    //this.router.navigate(['/']);
  }
  forMobLogout(){
    if($(".logout").hasClass('activelog')){
      $(".logout").removeClass("activelog");
    }else{
      $(".logout").addClass("activelog");
    }
    
  }
  removeSlide1() {
    this.slides.length = this.slides.length - 1;
  }

  slickInit1(e) {
    console.log('slick initialized');
  }

  breakpoint1(e) {
    console.log('breakpoint');
  }

  afterChange1(e) {
    console.log('afterChange');
  }

  beforeChange1(e) {
    console.log('beforeChange');
  }

  isBrowser: boolean;
  private data=[];
  constructor(public HomePageBanner: HomePageBannerService,
    private router: Router,
    private _route: ActivatedRoute,private authService: AuthenticationService,
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(DOCUMENT) private document
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        //console.log("Hide loading indicator")
        //console.log("Roting Event", event);
        if(this.isBrowser){
          var motCode = this.getQueryVariable('motcode');
          if (isPlatformBrowser(this.platformId)) {
            if (motCode) { 
              sessionStorage.setItem('MotCode', '' + motCode) 
            }
          }
        }
      }
    });
    if (this.isBrowser) {
      window['jQuery'] = $;
      window['$'] = $;
      require('../../../assets/js/needsharebutton.min.js');
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

  public ActiveSector;
  public SECTOR;
  public ImpactedLivesData = [];
  public SectorCategories = [];
  public ActiveType = 'All Needs'


  public NeedSector = []
  GetSelectedSector(SectorValue, e) {
    if (this.NeedSector !== undefined) {
      var index = this.NeedSector.indexOf(SectorValue);
      if (e.target.checked == true) {
        this.NeedSector.push(SectorValue)
      } else {
        this.NeedSector.splice(index, 1);
      }
    }
    //console.log(this.NeedSector)
    if (this.isBrowser) {
      this.SortImpactedLiveData()
    }
  }

  public impactedLiveArr = []
  SortImpactedLiveData() {
    //console.log("NeedSector", this.NeedSector)
    var newData = []
    this.NeedSector.forEach(element => {
      this.ImpactedLivesData.forEach(element2 => {
        if (element === element2.SECTORID) {
          newData.push(element2)
        }
      });
    });
    if (newData.length > 0) {
      this.impactedLiveArr = newData
    } else {
      this.impactedLiveArr = this.ImpactedLivesData
    }
    console.log("impactedLiveArr", this.impactedLiveArr);
    if (this.isBrowser) {
      this.DivEqualheight()
    }  
  }

  checkBoxCtrl() {
    setInterval(function () {
      $("input[type='checkbox']").each(function () {
        CheckCtrl($(this))
        $(this).click(function () {
          CheckCtrl($(this))
        })
        function CheckCtrl(thisO) {
          if (thisO.is(":checked")) {
            thisO.parents(".checkbox").addClass("active")
          } else {
            thisO.parents(".checkbox").removeClass("active")
          }
        }
      });
    }, 100)
  }
  DivEqualheight() {
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
  openCart(){
    if(this.HomePageBanner.getCartCount != 0){
      $('#myModal2').modal({backdrop: 'static', keyboard: false});
      $(".demo").show();
    }
     else{
      alert("There is nothing in your cart!");
     }
  }
  opnSignin(){
    this.document.forms.signupform.reset();
    this.document.forms.signinform.reset();
    $('#myModal').removeClass("fromCart").modal({backdrop: 'static', keyboard: false});
    $(".signin").hide();
    $(".forgotpassword").hide();
    $(".createInSign").hide();
    $(".signupform").show();
    $(".demo").hide();
 }
  public DonorID;
  public DONATE = [];
  public FUNDRAISE = [];

  public SearchKey;
  public SearchBox;

  ngOnInit() { 
  }


}

