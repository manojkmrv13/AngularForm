import { Component, OnInit, Inject, PLATFORM_ID ,ElementRef, HostListener, ViewChild} from '@angular/core';
import { ImpactedLivesService } from '../services/impacted-lives.service';
import { isPlatformBrowser } from '@angular/common';
import { AuthenticateDonorUsersLeadService } from './../services/authenticate-donor-users-lead.service';
import { Globalvar } from '../classes/globalvar';
import { Router, NavigationStart, NavigationEnd, NavigationError, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from './../services/authentication.service';
import { HomePageBannerService } from './../services/home-page-banner.service';
import { DOCUMENT } from '@angular/common';
declare var $: any;
declare var require: any;
declare var needShareDropdown: any;

@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.css']
})
export class LandingpageComponent implements OnInit {

  @ViewChild("insideElement", {static: false}) insideElement;
  @HostListener('document:click', ['$event.target'])
  public onClick(targetElement) {
    const clickedInside = this.insideElement.nativeElement.contains(targetElement);
      if (!clickedInside) {
        $(".logout").css("display","none")
      }
  }
  title = 'ngSlick';
  private LoginDetail: AuthenticateDonorUsersLeadService;
public getIdToShow:any
  slides = [342, 453, 846., 855, 234, 564, 744, 243];

  slideConfig1 = {
    "slidesToShow": 1,
    "slidesToScroll": 1,
    "nextArrow": "<div class='nav-btn next-slide'></div>",
    "prevArrow": "<div class='nav-btn prev-slide'></div>",
    "dots": true,
	"speed" : 800,
	"cssEase" : 'linear',
    "infinite": false
  };

  slideConfig = {
    "slidesToShow": 3,
    "slidesToScroll": 1,
    "nextArrow": "<div class='nav-btn next-slide'></div>",
    "prevArrow": "<div class='nav-btn prev-slide'></div>",
    "dots": true,
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

  addSlide1() {
    this.slides.push(488)
  }

  removeSlide1() {
    this.slides.length = this.slides.length - 1;
  }

  slickInit1(e) {
    console.log('slick initialized');
  }
  slickInit(e) {
    console.log('slick initialized');
  }
  breakpoint1(e) {
    console.log('breakpoint');
  }
  breakpoint(e){
    console.log('breakpoint');
  }
  afterChange1(e) {
    console.log('afterChange');
  }

  beforeChange1(e) {
    console.log('beforeChange');
  }
  slidesdaa = [
    {
      id:1,
      title:"Helped at the right time",
      text: "“My wife and I are both disabled. We have two infant daughters too. World Vision India came at the right time and gave us the food kit. We have no words to thank them.” - Bilal",
      image: "/assets/images/1.png",
      btntext: "Educaion",
    },
    {
      id:2,
      title:"Relief for Sukbogi's family",
      text: "“This support came at the right time. We struggled a lot to feed our children. Now we can buy 20 kg of rice and other grocery items”, - Sukbogi. ",
      image: "/assets/images/2.png",
      btntext: "Water Sanitation",      
    },
    {
      id:3,
      title:"Making most of the opportunity",
      text: "“When the lives of women change, their families change and ultimately their children are benefitted. Thank you for making this possible in our community,” - Sudha.",
      image: "/assets/images/3.png",
      btntext: "Health Nutrition",
    },
    {
      id:4,
      title:"A new beginning",
      text: "“Now I earn a decent income and need not beg for my wage for the day,” With the help of the pushcart she is able to sell chat items and earn a decent amount every day. - Sujata.",
      image: "/assets/images/4.png",
      btntext: "Educaion",
    },
    
  ]




  isBrowser: boolean;
  private data=[];
  constructor( 
    public HomePageBanner: HomePageBannerService,
    private ImpactedLives: ImpactedLivesService,
    private router: Router,
    private _route: ActivatedRoute,private authService: AuthenticationService,
    @Inject(PLATFORM_ID) platformId: string,
    @Inject(DOCUMENT) private document
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    if (this.isBrowser) {
      window['jQuery'] = $;
      window['$'] = $;
      require('../../assets/js/needsharebutton.min.js');
    }
  }

  public ActiveSector;
  public SECTOR;
  populateData() {
    this.ActiveType = this._route.snapshot.params.type
    if (this.ActiveType !== null && this.ActiveType !== undefined) {
      console.log(this.ActiveType);
      this.ActiveSector = this._route.snapshot.params.type.replace('cat-', '')
    }

    this.GetImpactedLives();
  }

  public ImpactedLivesData = [];
  public SectorCategories = [];
  public ActiveType = 'All Needs'

  GetImpactedLives() {
    this.ImpactedLives.ImpactedLivesService().subscribe((ImpactedLives) => {
      this.ImpactedLivesData = ImpactedLives;
      this.SECTOR =ImpactedLives[0].SECTOR;
      for (var i = 0; i < ImpactedLives.length; i++) {
        var found = false;
        for (var j = 0; j < this.SectorCategories.length; j++) {
          if (ImpactedLives[i].SECTOR === this.SectorCategories[j].sector) {
            found = true;
            break;
          }
        }
        if (!found) {
          var activeSectorTab = false;
          if (this.ActiveSector !== undefined) {
            if (ImpactedLives[i].SECTOR_SLUG.toLocaleLowerCase() === this.ActiveSector.toLocaleLowerCase()) {
              activeSectorTab = true;
              this.NeedSector.push(ImpactedLives[i].SECTORID)
            }
          }
          this.SectorCategories.push({ 'sector': ImpactedLives[i].SECTOR, 'sectorId': ImpactedLives[i].SECTORID, 'activeSector': activeSectorTab })
        }
      }

      console.log("SectorCategories", this.SectorCategories)
      if (this.isBrowser) {
        this.checkBoxCtrl()
      }
      if (this.isBrowser) {
        this.DivEqualheight()
      }
      this.SortImpactedLiveData()
    })
  }

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
  logout(){
    this.authService.logout();
    $(".logout").css("display","none")
    this.HomePageBanner.getUsername = "";
    //this.router.navigate(['/']);
  }
  forMobLogout(){
    $(".logout").css("display","block");
  }
  impactlive(data){
alert(data.id);
$('#myModal3').modal({backdrop: false, keyboard: false, focus: false, show: true});

     $(document.body).css('overflow','auto');

this.getIdToShow = data.id;
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
    //$(".signupform").show();
   // document.getElementById("triggerSignin").click();
  }
  ngOnInit() {
    this.document.forms.signupform.reset();
    this.document.forms.signinform.reset();
    localStorage.setItem("fromLandingPage","landing");
    $(".header,.website-footer,.breadcrumb,.footerDonateBox").hide();
    
    this.populateData()
  }


}
