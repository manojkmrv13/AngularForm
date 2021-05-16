import { Component, OnInit, HostListener, ElementRef, PLATFORM_ID, Inject, NgZone } from '@angular/core';
import { Injectable,Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Needs } from '../classes/needs';
import { needsService } from '../services/needs.service';
import { Needtype } from '../classes/needtype';
import { NeedtypeService } from '../services/needtype.service';
import { NeedSector } from '../classes/needsector';
import { NeedsectorService } from '../services/needsector.service';
import { LocationService } from '../services/location.service';
import { HttpClient } from '@angular/common/http';
import { Globalvar } from '../classes/globalvar';
import { Router, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';

import { GetFundRaiseNeedMappingDetailsService } from '../services/get-fund-raise-need-mapping-details.service';
import { DeleteFundRaiseNeedMapping } from '../services/delete-fund-raise-need-mapping.service';
import { CartService } from '../services/cart.service';
import { CartDeleteNeedIdService } from '../services/cart-delete-need-id.service';
import { ConnectnowService } from '../services/connectnow.service';
import { StateCityService } from '../services/state-city.service';
import { Title, Meta } from '@angular/platform-browser';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

import { NgxSpinnerService } from 'ngx-spinner';
import { isPlatformBrowser } from '@angular/common';
declare var needShareDropdown: any;
declare var google: any;
declare var $: any;
declare var require: any;
declare var MarkerClusterer: any;
let options: NgbModalOptions = {
  size: 'lg'
};
@Component({
  selector: 'app-donate',
  templateUrl: './donate.component.html',
  styleUrls: ['./donate.component.css']
})

export class DonateComponent implements OnInit {
  faShoppingCart = faShoppingCart;

  public title = "HoSh - Online Fundraising Platform, Donation Platform India";
  public description = "HoSh, the online fundraising and donation platform in India for raising money for education, environment, economic development, health and nutrition, etc.";
  public keywords = "online fundraising platform, online donation platform, donation platform";

  defaultImage = '../assets/images/image_not_available.jpg';
  public shareTitle
  public shareMedia
  public shareText
  public TypeName;

  DonationAmount = [1, 500000];
  PercentageCompleted = [0, 100];
  public PageNumber = 1;
  public prevScroll = 0;
  public currentNumber = 1;
  public noOfList = [];
  public Location_STATE_NAME = [];
  public DesignationId = '';
  selectedValue = 1;
  locations = "Select";
  Region = "Select";
  public TOTAL_NEED_AMOUNT_FOR_LARGE_NEED: number;
  public DONATION_AMOUNT_FOR_LARGE_NEED: number;
  public DAYS_LEFT_FOR_LARGE_NEED: number;
  public needIdForFundraising = [];
  public setNoOFNeeds;
  public isLoading = true;
  public isDataAvailable = true;

  // for fund Fundraising

  public DONORID;
  public FUNDRAISE_NAME: string = '';
  public PARENT_COMMENTID: number;
  public FUNDRAISE_AMOUNT: number;
  public DESCRIPTION: string = '';
  public ResultID: any;
  public FUNDRAIS_ID: number;
  public FUND_RAISE_DATA = [];


  // for Cart
  public NeedForCart = [];
  public NoOFCarts;
  public CartDonorID;
  public CartNeedDataList = [];


  nds = [];
  //nds_temp=[];
  rtn_nds: Needs[];
  ndt: Needtype[];
  ndss: NeedSector[];
  isBrowser: boolean;
  public data =[];
  constructor(
    private titleService: Title, 
    private metaService: Meta,
    private activeRoute: ActivatedRoute,
    public el: ElementRef,
    private _route: ActivatedRoute,
    private ns: needsService,
    private nt: NeedtypeService,
    private nss: NeedsectorService,
    private LocatAr: LocationService,
    private http: HttpClient,
    public router: Router,
    private FundRiseS: GetFundRaiseNeedMappingDetailsService,
    private DeleteFundRaiseN: DeleteFundRaiseNeedMapping,
    private CartS: CartService,
    private DeleteCart: CartDeleteNeedIdService,
    private modalService: NgbModal,
    private nsf: ConnectnowService,
    private StateCity: StateCityService,
    private spinner: NgxSpinnerService,
    private _ngZone: NgZone,
    private sanitizer: DomSanitizer,
    @Inject(PLATFORM_ID) platformId: string
  ) {
    this.sanitizer = sanitizer;
    this.isBrowser = isPlatformBrowser(platformId);
    if (this.isBrowser) {

      window['donateDetailsComponentRef'] = { component: this, zone: _ngZone };
      window['jQuery'] = $;
      window['$'] = $;
      require('../../assets/js/jquery-ui.js');
      require('../../assets/js/jquery.fancybox.min.js');
      require('../../assets/js/cPager.js');
      require('../../assets/js/needsharebutton.min.js');

      router.events.subscribe((event: any) => {
        if (event instanceof NavigationStart) {
          // Show loading indicator
        }
  
        if (event instanceof NavigationEnd) {
          //console.log(this._route);
  
          this.TypeName = this._route.snapshot.params['type'];
          //this.getUrl(this.TypeName)
          if (this.ndss !== undefined) {
            $(".clsNeedType").prop('checked', false);
            $(".clsNeedSector").prop('checked', false);
            this.populateData();
          }
        }
        if (event instanceof NavigationError) {
  
        }
  
      });
      
      window['donateComponentRef'] = { component: this, zone: _ngZone };
    }
  }

  public NeedTypes = [];
  public NeedSector = [];
  public NeedAmountFrom = [];
  public NeedAmountTo = [];
  public PercentageCompletedFrom = [];
  public PercentageCompletedTo = [];
  public GiftQuantity = [];
  public ADPREGION = '';
  public ADPStateId = '';
  public AdditionalFilter = [];
  public PageSize = '6'
  public PageNo = 1

  ndsMap = [];
  public agmMarker = [];
  public markerNeed = [];
  public markerNeedWrp = false;
  public latitude: number = 22.431340535555012;
  public longitude: number = 78.66210912500003;
  public zoom = 5;

  public ActiveListTab = true
  ActiveViewTab(active) {
    if (active == 'List') {
      this.ActiveListTab = true;
    } else {
      this.ActiveListTab = false;
      setTimeout(() => {
        var marBotm = $(".legends").height();
        $(".MapViewer").css("margin-bottom", marBotm + "px");        
      }, 500);
    }
    this.Search()
    this.divEqualheight()
    this.selectCtrl()

    if (this.DONORID) {      
      this.GetCartNeedItem(this.DONORID)
      this.GetFundraiseDetails(this.ResultID)
      this.slickSlider()
    }
  }

  clickedMarker(id) {
    this.markerNeed = [];
    this.agmMarker.forEach(element => {
      if (element.NEEDID == id) {
        this.markerNeedWrp = true;
        this.markerNeed.push(element);
        if (this.DONORID > 0) {
          this.GetCartNeedItem(this.DONORID)
        }
        this.commaSeparater();
        //console.log('markerNeed', this.markerNeed)
        this.slickSlider()
        this.selectCtrl()
      }
    })

  }
  needShareDropdownF(title, text, media) {
    console.log(title);
    console.log(text);
    console.log(media);
   
    var id = document.getElementById('howfun');
    var url=window.location.href;
    
    new needShareDropdown(id, {
        boxForm: 'vertical', // horizontal or vertical            
        position: 'bottomLeft', // top / middle / bottom + Left / Center / Right
        url:text,
        title: title, //root.getTitle(),
        image: media, //root.getImage(),
        description: text, //root.getDescription(),
    });
    setTimeout(function () {
        $('.need-share-button_linkedin').after('<span class="need-share-button_link-box need-share-button_link need-share-button_twitter button_watsapp"  id="whatsApp" data-text="' + window.location.href + '" data-action="share/whatsapp/share"></span>');
    }, 100);

    setTimeout(function () {
        $('#whatsApp').click(function () {
            var text = $(this).attr('data-text');
            window.open("https://api.whatsapp.com/send?text=" + text, "myWindow", "width=600,height=500");
        });
    }, 500);

}
  onMouseOver(infoWindow, gm) {
    if (gm.lastOpen != null) {
      gm.lastOpen.close();
    }
    gm.lastOpen = infoWindow;
    infoWindow.open();
  }
  onMouseOut(infoWindow, gm) {
    if (gm.lastOpen != null) {
      gm.lastOpen.close();
    }
    gm.lastOpen = infoWindow;
    // infoWindow.close();
  }
  mapClicked($event: MouseEvent, gm) {
    //console.log('mapClicked', $event);
    $('.mapNeedWrp').removeClass('show');
    this.markerNeedWrp = false;
    this.markerNeed = [];
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
    }, 10)
  }

  // START  FUNDRAISING
  public FundraisBtnClick = false;
  postFundraising() {
    this.DONORID = Globalvar.getDonorId();
    if (this.DONORID > 0) {
      if (this.ResultID > 0) {
        this.postNeedIDForFundraising()
      } else {
        var body = {
          'DONORID': this.DONORID,
          'FUNDRAISE_NAME': '',
          'PARENT_COMMENTID': '0',
          'FUNDRAISE_AMOUNT': '',
          'DESCRIPTION': ''
        };
        //console.log("fundRaise body", body)
        this.http.post(Globalvar.ApiUrl + "/PostFundRaise", body).subscribe((data) => {
          this.ResultID = data[0].STATUSES[0].ResultId;
          this.ResultID = this.ResultID;
          this.postNeedIDForFundraising();
          //console.log("PostFundRaise data", data, this.ResultID)
        });
      }
    } else {
      this.FundraisBtnClick = true
      document.getElementById("signupBtn").click()
    }
  }

  postNeedIDForFundraising() {
    this.spinner.show();
    this.DeleteFundRaiseN.DeleteFundRaiseNeedMapping(this.ResultID).subscribe((Data) => {
      if (this.ResultID > 0) {
        var time = 0;
        this.needIdForFundraising.forEach(element => {
          var body1 = {
            'NEEDID': element,
            'FUNDRAISEID': this.ResultID,
            'DONATION_AMOUNT': ''
          };
          this.http.post(Globalvar.ApiUrl + "/PostFundRaiseNeedMapping", body1).subscribe((data1) => {
            time = time + 1;
            if (this.needIdForFundraising.length == time) {
              localStorage.setItem('ResultID', this.ResultID);
              //document.cookie = "ResultID=" + this.ResultID;
              this.router.navigate(['/my-fundraisers']);
              this.FundraisBtnClick = false
            }
          });
        });
      }
    })
  }

  GetFundraiseDetails(ResultID) {
    if (ResultID > 0) {
      if (this.FUND_RAISE_DATA.length < 1) {
        this.FundRiseS.GetFundRaiseNeedMappingDetailsService(ResultID).subscribe((fundRaiseData) => {
          if (fundRaiseData.length >= 0) {
            this.FUND_RAISE_DATA = fundRaiseData;
            var count = 0;
            this.FUND_RAISE_DATA.forEach(element => {
              var activeCheckbox = "need" + element.NEEDID
              $("#" + activeCheckbox).prop("checked", "checked")

              count = count + 1
              this.needIdForFundraising.push(element.NEEDID)
              if (this.FUND_RAISE_DATA.length == count) {
                this.setNoOFNeeds = this.FUND_RAISE_DATA.length
              }
            });
          };
        });
      } else {
        this.needIdForFundraising.forEach(element => {
          var activeCheckbox = "need" + element
          setTimeout(function () {
            $("#" + activeCheckbox).prop("checked", "checked")
          }, 200)

        })
      }
    }
  }

  AddNeedFundraising(e) {
    var thisO = e.target.value
    var index = this.needIdForFundraising.indexOf(parseFloat(e.target.value));

    if (e.target.checked == true) {
      this.needIdForFundraising.push(parseFloat(e.target.value))
    } else {
      this.needIdForFundraising.splice(index, 1);
    }
    this.setNoOFNeeds = this.needIdForFundraising.length;


  }

  // END FUNDRAISING


  getCookie() {
    //this.ResultID = parseFloat(Globalvar.readCookie('ResultID'))
    this.ResultID = localStorage.getItem('ResultID')
    //console.log("this.ResultID", this.ResultID)
  }

  // START CART

  AddNeedInCart(e) {
    var thisId = e.target.value;
    var mapV = $("#mapdonateA" + thisId).attr("id");
    if (mapV == "mapdonateA" + thisId) {
      var mapDonateA = $("#mapdonateA" + thisId).val();
      var mapDonateAval = mapDonateA.replace(/\,/g, '');
      if (mapDonateAval > 0) {
        if (e.target.checked == true) {
          this.postNeedForCart(e.target.value, false)
        } else {
          this.DeleteCartNeed(e.target.value)
        }
      } else {
        alert('Please enter contribution amount. ')
        $("#mapcartNeedId" + thisId).prop("checked", false)
      }
      //console.log('mapdonateA', mapV);
    } else {
      var donateA = $("#donateA" + thisId).val();
      var donateAval = donateA.replace(/\,/g, '');
      if (donateAval > 0) {
        if (e.target.checked == true) {
          this.postNeedForCart(e.target.value, false)
        } else {
          this.DeleteCartNeed(e.target.value)
        }
      } else {
        alert('Please enter contribution amount. ')
        $("#cartNeedId" + thisId).prop("checked", false)
      }
      //console.log('donateA', mapV);
    }

  }

  postNeedForCart(ADDNeedID, donateBtn) {
    var mapV = $("#mapdonateA" + ADDNeedID).attr("id");
    if (mapV == "mapdonateA" + ADDNeedID) {
      var amount = $("#mapdonateA" + ADDNeedID).val();
    } else {
      var amount = $("#donateA" + ADDNeedID).val();
    }
    var amount = amount.replace(/\,/g, '');
    amount = parseInt(amount, 10);

    var _quantity = parseInt($("#donateQuentatity" + ADDNeedID).find("option:selected").text()) > 0 ? parseInt($("#donateQuentatity" + ADDNeedID).find("option:selected").text()) : '';// for Select Quantity
    var _paymentFrequency = $("#payFrequency" + ADDNeedID).length == 1 ? $("#payFrequency" + ADDNeedID).find("option:selected").html().replace(/(\r\n\t|\n|\r\t)/gm, "").replace(/\s/g, "") : '';
    var _actual_amount = $("#actualA" + ADDNeedID).val();

    var cartItem = {
      'NEEDID': parseInt(ADDNeedID),
      'DONORID': this.DONORID,
      'QUANTITY': _quantity,
      'CART_PAYMENT_FREQUENCY': _paymentFrequency,
      'AMOUNT': parseFloat(amount),
      'ACTUAL_AMOUNT': parseFloat(_actual_amount)
    };

    this.http.post(Globalvar.ApiUrl + "/PostDonorCart", cartItem).subscribe((cartData) => {
      this.GetCartNeedItem(this.DONORID)
      if (donateBtn == true) {
        this.router.navigate(['/payment']);
        this.DonateAmountIDBeforeLogin = 0;
      }
    });
  }

  DeleteCartNeed(DltNeedID) {
    this.DeleteCart.CartDeleteService(this.DONORID, DltNeedID).subscribe((CartNeedD) => {
      this.GetCartNeedItem(this.DONORID)
    })
  }

  GetCartNeedItem(CartDonID) {
    this.CartNeedDataList = []
    this.NoOFCarts = 0;
    this.CartS.CartService(CartDonID).subscribe((CartNeedData) => {
      this.CartNeedDataList = CartNeedData
      //console.log("this.CartNeedDataList", this.CartNeedDataList)
      this.CartNeedDataList.forEach(element => {
        this.NeedForCart.push(element.NEEDID)
        $("#cartNeedId" + element.NEEDID).prop("checked", "checked")
        var thisVWithComa, thisV = (element.AMOUNT).toString()
        thisVWithComa = thisV.replace(/[\D\s\._\-]+/g, "");
        thisVWithComa = thisVWithComa ? parseInt(thisVWithComa, 10) : 0;
        thisVWithComa = (thisVWithComa === 0) ? "" : thisVWithComa.toLocaleString("en-US");

        $("#payFrequency" + element.NEEDID).val(element.ACTUAL_AMOUNT);
        $("#donateQuentatity" + element.NEEDID).val(element.ACTUAL_AMOUNT);
        $("#donateA" + element.NEEDID).val(thisVWithComa);
        $("#UpdatedA" + element.NEEDID).val(element.AMOUNT);
        this.selectCtrl()
      });
      this.NoOFCarts = this.CartNeedDataList.length;
      localStorage.setItem('CartItems', this.NoOFCarts);
    })

  }


  // END CART

  // NEED DONATE
  public DonateAmountIDBeforeLogin = 0;
  donateNow(needID) {
    if (this.DONORID) {
      if ($('#donateA' + needID).val().replace(/\,/g, '') > 0) {
        var mapV = $("#mapdonateA" + needID).attr("id");
        if (mapV == "mapdonateA" + needID) {
          var MapVal = $('#mapdonateA' + needID).val();
          var eValM = MapVal.replace(/\,/g, '');
          eValM = parseInt(eValM, 10);
          if (eValM > 0) {
            this.postNeedForCart(needID, true)
          } else {
            alert('Please enter contribution amount.')
          }
        } else {
          var DVal = $('#donateA' + needID).val();
          var eValD = DVal.replace(/\,/g, '');
          eValD = parseInt(eValD, 10);
          if (eValD > 0) {
            this.postNeedForCart(needID, true)
          } else {
            alert('Please enter contribution amount.')
          }
        }
      } else {
        alert('Please enter contribution amount.')
      }

    } else {
      if ($('#donateA' + needID).val().replace(/\,/g, '') > 0) {
        this.DonateAmountIDBeforeLogin = needID
      }

     document.getElementById("signupBtn").click()
    }

  }

  GetSelectedNeedType(NeedTypeValue, e) {
    if (this.NeedTypes !== undefined) {
      var index = this.NeedTypes.indexOf(parseFloat(NeedTypeValue));
      if (e.target.checked == true) {
        this.NeedTypes.push(parseFloat(NeedTypeValue))
      } else {
        this.NeedTypes.splice(index, 1);
      }
    }
    //this.GetReloadAPI();
  }

  // Get NeedSector
  GetSelectedSector(SectorValue, e,chkch_val) {
    console.log(chkch_val+"selectvaluesaa");
    this.ActiveTypeName=chkch_val;
    if (this.NeedSector !== undefined) {
      var index = this.NeedSector.indexOf(parseFloat(SectorValue));
      if (e.target.checked == true) {
        this.NeedSector.push(parseFloat(SectorValue))
      } else {
        this.NeedSector.splice(index, 1);
      }
    }
  }

  filterByRegion(e) {
    if (e.target.value == 'Select') {
      this.ADPREGION = '';
    } else {
      this.ADPREGION = e.target.value
    }
    this.locations = "Select";
    this.GetLocation(this.ADPREGION);
    this.selectCtrl()
  }
  filterByState(e) {
    if (e.target.value == 'Select') {
      this.ADPStateId = '';
    } else {
      this.ADPStateId = e.target.value
    }
    this.selectCtrl()
  }

  CompletedNeedInPercentage(e) {
    this.PercentageCompletedFrom = e[0];
    this.PercentageCompletedTo = e[1];
  }

  GetNeedRangeAmount(e) {
    this.NeedAmountFrom = e[0];
    this.NeedAmountTo = e[1];
    var toLargeAmount = 10000000000;
    if (e[1] == '500000') {
      $('#DonationAmount .noUi-handle-upper .noUi-tooltip').text('500000+');
      this.NeedAmountTo = e[1] + toLargeAmount;
    }
    var $this = $('#DonationAmount .noUi-handle-upper .noUi-tooltip')
    var input = $('#DonationAmount .noUi-handle-upper .noUi-tooltip').text();
    var input = input.replace(/[\D\s\._\-]+/g, "");
    input = input ? parseInt(input, 10) : 0;
    $this.val(function () {
      return (input === 0) ? "" : input.toLocaleString("en-US");
    });
    //console.log('GetNeedRangeAmount From', this.NeedAmountFrom);
    //console.log('GetNeedRangeAmount To', this.NeedAmountTo);

  }

  GetAdditionalFilter(e) {
    this.AdditionalFilter = e.target.value;
  }


  GetClearFliterAPI() {
    $(".filterWapper").find("input[type='checkbox'], input[type='radio']").prop("checked", false);
    this.DonationAmount = [0, 500000];
    this.PercentageCompleted = [0, 100];
    this.locations = "Select";
    this.Region = "Select";
    if (this.TypeName == undefined) {
      this.GetNeeds(
        this.NeedTypes = [],
        this.NeedSector = [],
        this.ADPREGION = '',
        this.ADPStateId = '',
        this.NeedAmountFrom = [],
        this.NeedAmountTo = [],
        this.PercentageCompletedFrom = [],
        this.PercentageCompletedTo = [],
        this.AdditionalFilter = [],
        this.DesignationId,
        this.PageNo,
        this.PageSize
      );
      this.Search()
    } else {
      this.GetNeeds(
        this.NeedTypes,
        this.NeedSector = [],
        this.ADPREGION = '',
        this.ADPStateId = '',
        this.NeedAmountFrom = [],
        this.NeedAmountTo = [],
        this.PercentageCompletedFrom = [],
        this.PercentageCompletedTo = [],
        this.AdditionalFilter = [],
        this.DesignationId,
        this.PageNo,
        this.PageSize
      );
      this.Search()
    }
    this.RadioButtonControl();
  }

  GetNeedDataByType(typeID) {
    this.PageNo = 1;
    this.nds = [];
    $(".filterWapper").find("input[type='checkbox'], input[type='radio']").prop("checked", false);
    this.DonationAmount = [0, 500000];
    this.PercentageCompleted = [0, 100];
    this.GetNeeds(
      this.NeedTypes = typeID,
      this.NeedSector = [],
      this.ADPREGION,
      this.ADPStateId,
      this.NeedAmountFrom = [],
      this.NeedAmountTo = [],
      this.PercentageCompletedFrom = [],
      this.PercentageCompletedTo = [],
      this.AdditionalFilter = [],
      this.DesignationId,
      this.PageNo,
      this.PageSize
    );
  }
  GetNeedDataByCategories(CategorieID) {
    $(".filterWapper").find("input[type='checkbox'], input[type='radio']").prop("checked", false);
    this.DonationAmount = [0, 10000000];
    this.PercentageCompleted = [0, 100];
    this.GetNeeds(
      this.NeedTypes = [],
      this.NeedSector = CategorieID,
      this.ADPREGION,
      this.ADPStateId,
      this.NeedAmountFrom = [],
      this.NeedAmountTo = [],
      this.PercentageCompletedFrom = [],
      this.PercentageCompletedTo = [],
      this.AdditionalFilter = [],
      this.DesignationId,
      this.PageNo,
      this.PageSize
    );
  }

  Search() {
    $("#no_recordsfound").hide();
      
    if(this.ActiveListTab){
      this.PageNo = 1;
      this.nds = [];
      this.GetReloadAPI();
    }else{
      this.PageNo = 1;
      this.PageSize = '';
      this.agmMarker = [];
      this.GetReloadMapAPI()
    }
  };
  GetReloadAPI() {
    this.GetNeeds(
      this.NeedTypes,
      this.NeedSector,
      this.ADPREGION,
      this.ADPStateId,
      this.NeedAmountFrom,
      this.NeedAmountTo,
      this.PercentageCompletedFrom,
      this.PercentageCompletedTo,
      this.AdditionalFilter,
      this.DesignationId,
      this.PageNo,
      this.PageSize
    );
  }

  GetReloadMapAPI() {
    this.GetMapNeeds(
      this.NeedTypes,
      this.NeedSector,
      this.ADPREGION,
      this.ADPStateId,
      this.NeedAmountFrom,
      this.NeedAmountTo,
      this.PercentageCompletedFrom,
      this.PercentageCompletedTo,
      this.AdditionalFilter,
      this.DesignationId,
      this.PageNo,
      this.PageSize
    );
  }


  GetNeeds(NeedTypes, NeedSector, ADPREGION, ADPStateId, NeedAmountFrom, NeedAmountTo, PercentageCompletedFrom, PercentageCompletedTo, AdditionalFilter, DesignationId, PageNo, PageSize) {
    //this.nds = null;
    // console.log(this.GetNeeds);
    this.ns.getNeeds("", "", "", "", "", "", "", "", "", NeedTypes, NeedSector, "", "", "", "", "", ADPREGION, ADPStateId,
      "", NeedAmountFrom, NeedAmountTo, "", "", "", "", DesignationId, "", PercentageCompletedFrom, PercentageCompletedTo, AdditionalFilter, PageNo, PageSize, "").subscribe((rtn_nds) => {
        
        if (rtn_nds.length > 0) {
          console.log(this.GetNeeds);
          if (rtn_nds[0].NEEDID > 0) {
            //this.nds = nds;
            rtn_nds.forEach(element => {
              if (element.NEEDS_CHILD.length > 0) {
                this.TOTAL_NEED_AMOUNT_FOR_LARGE_NEED = 0;
                this.DONATION_AMOUNT_FOR_LARGE_NEED = 0;
                this.DAYS_LEFT_FOR_LARGE_NEED = 0;
                element.NEEDS_CHILD = element.NEEDS_CHILD.filter(ele => ele.STATUS_INFORMATION === 'Approved')
                element.NEEDS_CHILD.forEach(elem => {                 
                  this.TOTAL_NEED_AMOUNT_FOR_LARGE_NEED = parseFloat(this.TOTAL_NEED_AMOUNT_FOR_LARGE_NEED + elem.TOTAL_NEED_AMOUNT);
                  element.TOTAL_NEED_AMOUNT_FOR_LARGE_NEED = Math.round(this.TOTAL_NEED_AMOUNT_FOR_LARGE_NEED);
                  this.DONATION_AMOUNT_FOR_LARGE_NEED = parseFloat(this.DONATION_AMOUNT_FOR_LARGE_NEED + elem.DONATION_AMOUNT)
                  element.DONATION_AMOUNT_FOR_LARGE_NEED = this.DONATION_AMOUNT_FOR_LARGE_NEED;

                  if (this.DAYS_LEFT_FOR_LARGE_NEED < this.CalculateDays(elem.END_DATE)) {
                    this.DAYS_LEFT_FOR_LARGE_NEED = this.CalculateDays(elem.END_DATE)
                  }
                  element.DAYS_LEFT_FOR_LARGE_NEED = this.DAYS_LEFT_FOR_LARGE_NEED                  
                });
              }
              if (element.SHOW_IN_WEBSITE == 1) {                
               
                if (element.NEEDTYPEID !== 2 && element.NEEDTYPEID !== 5) {                
                  this.nds.push(element);
                }else{
                  if(element.NEEDS_CHILD.length > 0){
                    this.nds.push(element);
                  }
                }
              }
             
            });

            if (this.NotShowOnFundraise == false) {
              //console.log("NotShowOnFundraise == false")
              var newNeed = []
              this.nds.forEach(element => {
                if (element.NEEDTYPEID !== 4) {
                  newNeed.push(element)
                }
              });
              this.nds = newNeed
              
            } else {
              //console.log("NotShowOnFundraise == true")
            }


            
            if (this.DONORID > 0) {
              this.GetCartNeedItem(this.DONORID)
            }
            if(this.isBrowser){
              this.divEqualheight();
              this.slickSlider();
              this.commaSeparater();
              this.getCookie()
              this.selectCtrl();
            }
            this.GetFundraiseDetails(this.ResultID)           
          }
          //console.log("sort", this.nds);
          //this.nds = this.nds.sort(function(a,b){return a.SEQUENCE - b.SEQUENCE});
          //console.log("sort", this.nds.sort(function(a,b){return a.SEQUENCE - b.SEQUENCE}));
          //this.nds.sort(function(a, b){return a.SEQUENCE - b.SEQUENCE})

          $("#dataLoader").hide();
          this.isLoading = false;
          this.isDataAvailable = true;
          $("#no_recordsfound").hide();
        } else {
          this.isDataAvailable = false;
          $("#no_recordsfound").show();
          $("#dataLoader").hide();
        }
        //console.log("NDS ", this.nds)
      });
  }
 
  GetMapNeeds(NeedTypes, NeedSector, ADPREGION, ADPStateId, NeedAmountFrom, NeedAmountTo, PercentageCompletedFrom, PercentageCompletedTo, AdditionalFilter, DesignationId, PageNo, PageSize) {
    //this.nds = null;
    this.ns.getNeeds("", "", "", "", "", "", "", "", "", NeedTypes, NeedSector, "", "", "", "", "", ADPREGION, ADPStateId,
    "", NeedAmountFrom, NeedAmountTo, "", "", "", "", DesignationId, "", PercentageCompletedFrom, PercentageCompletedTo, AdditionalFilter, PageNo, PageSize, "").subscribe((rtn_nds) => {

        if (rtn_nds.length > 0) {
          if (rtn_nds[0].NEEDID > 0) {
            //this.nds = nds;
            rtn_nds.forEach(element => {
              if (element.NEEDS_CHILD.length > 0 || element.ADP_LATITUDE != "") {
                this.TOTAL_NEED_AMOUNT_FOR_LARGE_NEED = 0;
                this.DONATION_AMOUNT_FOR_LARGE_NEED = 0;
                this.DAYS_LEFT_FOR_LARGE_NEED = 0;
                element.NEEDS_CHILD = element.NEEDS_CHILD.filter(ele => ele.STATUS_INFORMATION === 'Approved')
                element.NEEDS_CHILD.forEach(elem => {
                  this.TOTAL_NEED_AMOUNT_FOR_LARGE_NEED = parseFloat(this.TOTAL_NEED_AMOUNT_FOR_LARGE_NEED + elem.TOTAL_NEED_AMOUNT);
                  element.TOTAL_NEED_AMOUNT_FOR_LARGE_NEED = Math.round(this.TOTAL_NEED_AMOUNT_FOR_LARGE_NEED);
                  this.DONATION_AMOUNT_FOR_LARGE_NEED = parseFloat(this.DONATION_AMOUNT_FOR_LARGE_NEED + elem.DONATION_AMOUNT)
                  element.DONATION_AMOUNT_FOR_LARGE_NEED = this.DONATION_AMOUNT_FOR_LARGE_NEED;

                  if (this.DAYS_LEFT_FOR_LARGE_NEED < this.CalculateDays(element.END_DATE)) {
                    this.DAYS_LEFT_FOR_LARGE_NEED = this.CalculateDays(element.END_DATE)
                  }
                  element.DAYS_LEFT_FOR_LARGE_NEED = this.DAYS_LEFT_FOR_LARGE_NEED
                });
              }
              if (element.SHOW_IN_WEBSITE == 1) {
                this.agmMarker.push(element);
              }
            });
            //console.log('marker all', this.agmMarker)
            if(this.isBrowser){
              this.divEqualheight();
              this.slickSlider();
              this.commaSeparater();
              this.getCookie()
              this.selectCtrl();
            }
            
            if (this.DONORID > 0) {
              this.GetCartNeedItem(this.DONORID)
            }            
            this.GetFundraiseDetails(this.ResultID)            
            var thisO = this            
              initializeMap(this.agmMarker, thisO);            
            this.SetLegends()
          }
        }
      });
  }

  public legends = [];
  SetLegends() {
    var legend_list = [];
    for (var i = 0; i < this.agmMarker.length; i++) {
      let isPresent = false;
      legend_list.forEach(element => { 
        if (element["sector"] === this.agmMarker[i].SECTOR) {
          isPresent = true;
        }
      });
      if (!isPresent) {
        legend_list.push({ 'sector': this.agmMarker[i].SECTOR, 'sectorIcon': this.agmMarker[i].SECTOR_ICON_FILEPATH });
      }
    }
    this.legends = legend_list;
    //console.log("legends", legend_list)
  }


  goleAmountForLargeNeed(childItem) {
    var totalA = 0;
    for (totalA = 0; totalA < childItem.length; totalA++) {

    }
  }

  GetLocation(RegionId) {
    this.Location_STATE_NAME = [];
    this.LocatAr.GetLocation(RegionId).subscribe((Location_STATE_NAME) => {
      if (Location_STATE_NAME.length > 0) {
        this.Location_STATE_NAME = Location_STATE_NAME;
        //console.log("Location_STATE_NAME", this.Location_STATE_NAME)
      }
    });
  }

  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    var footerHeight = document.getElementById("footerSection").offsetHeight
    const windowScrollTop = $(window).scrollTop()
    const windowHeight = (window.innerHeight + footerHeight) - 100;
    const documentHeight = document.documentElement.scrollHeight;
    if ((windowScrollTop > documentHeight - windowHeight) && this.isLoading === false && this.isDataAvailable === true) {
      $("#dataLoader").show();
      this.isLoading = true;
      this.PageNo = this.PageNo + 1;
      this.GetReloadAPI();
    }
  }

  public typeID: any;
  // getUrl(TypeName) {
  //   this.typeID = 0;
  //   this.TypeName = TypeName
  //   switch (this.TypeName) {
  //     case 'individual-needs':
  //       this.typeID = 1;
  //       this.GetNeedDataByType(this.typeID)
  //       break;
  //     case 'community-needs':
  //       this.typeID = 2;
  //       this.GetNeedDataByType(this.typeID)
  //       break;
  //     case 'gift-catalogue':
  //       this.typeID = 3;
  //       this.GetNeedDataByType(this.typeID)
  //       break;
  //     case 'recurring-gift':
  //       this.typeID = 4;
  //       this.GetNeedDataByType(this.typeID)
  //       break;
  //     case 'disaster-relief':
  //       this.typeID = 5;
  //       this.GetNeedDataByType(this.typeID)
  //       break;
  //     default:
  //   }
  // }

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
  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true });
  }
  open(content) {
    this.modalService.open(content, { size: 'lg', backdropClass: 'light-blue-backdrop', windowClass: 'dark-modal' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  CWithUs(content) {
    this.CWUS_NAME = '';
    this.CWUS_FILE = '';
    this.CWUS_FILE_NAME = '';
    this.CWUS_FILE_PATH = '';
    this.CWUS_EMAIL = '';
    this.CWUS_CONTECTNO = '';
    this.CWUS_CPNAME = '';
    this.CWUS_SCHEDULE = '';
    this.CWUS_MESSAGE = '';
    this.CWUS_State = '';
    this.CWUS_CITY = '';

    this.DONORID = Globalvar.getDonorId();
    //if (this.DONORID > 0) {
    this.GetState()
    this.modalService.open(content, { backdropClass: 'light-blue-backdrop', windowClass: 'cwus-modal CWUSWapper' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    this.SaveCWithUsOnSuccess = false
    //} else {
    //alert('Please Login')
    // document.getElementById("signupBtn").click()
    //}
  }

  fileToUpload: File = null;
  private formSubmitAttempt: boolean;
  public CWUS_NAME;
  public CWUS_FILE;
  public CWUS_FILE_NAME = '';
  public CWUS_FILE_PATH = '';
  public CWUS_EMAIL;
  public CWUS_CONTECTNO;
  public CWUS_CPNAME;
  public CWUS_SCHEDULE;
  public CWUS_MESSAGE;
  public CWUS_State;
  public CWUS_CITY;
  public needID_PartnerNow;
  public SaveCWithUsOnSuccess = false;

  SaveCWithUs(ngForm) {
    this.formSubmitAttempt = true;
    if (ngForm.valid) {
      var body = {
        'NEEDID': this.needID_PartnerNow,
        'DONORID': this.CartDonorID,
        'MEETING_SCHEDULED_DATE': null,
        'ORGANISATION_NAME': this.CWUS_NAME,
        'COMPANY_LOGO': this.CWUS_FILE_NAME,
        'EMAILID': this.CWUS_EMAIL,
        'CONTACT_NUMBER': this.CWUS_CONTECTNO,
        'CONTACT_PERSON': this.CWUS_CPNAME,
        'MESSAGE': this.CWUS_MESSAGE,
        'STATUS': 1,
        'STATEID': null,
        'CITYID': null,
        'STATE_NAME': this.CWUS_State,
        'CITY_NAME' : this.CWUS_CITY
      };
      //console.log("PostNeedsConnectNow body", body);
      this.http.post(Globalvar.ApiUrl + "/PostNeedsConnectNow", body).subscribe((data) => {
        this.SaveCWithUsOnSuccess = true
        //console.log("PostNeedsConnectNow Data", data);
        if (data[0].STATUSES[0].ResultId > 0) {
          $('.ConnectWithUsThankU').html('Thank you for connecting with us')
        } else {
          $('.ConnectWithUsThankU').html("All ready you connect with us ");
        }
        this.CWUS_FILE_NAME = "";
        this.CWUS_FILE_PATH = "";
        $('.nameuploadfile').empty().html("Upload Company Logo");
        ngForm.reset();
        this.spinner.hide();
      });
    }
  }

  SectorImageChange(files: any) {
    if (files.target.files.length > 0) {
      $('.nameuploadfile').html('<img src="assets/images/ajax-loader.gif" alt="" />');
      const fileSelected: File = files.target.files[0];

      var ext = fileSelected.name.match(/\.([^\.]+)$/)[1];

      if (ext == "jpg" || ext == "jpeg" || ext == "png" || ext == "bmp" || ext == "gif") {
        this.nsf.UploadConnectNowCompanyLogo(fileSelected).subscribe(res => {
          //console.log(res);
          this.CWUS_FILE_NAME = String(res).split('|')[0];
          this.CWUS_FILE_PATH = String(res).split('|')[1];
          $('.nameuploadfile').empty().html(' <img src="' + this.CWUS_FILE_PATH + '" width="35px" height="30px" alt="" />  ' + this.CWUS_FILE_NAME);
          //this.IMAGEFILEPATH = String(res).split('|')[1];
        },
          err => {
            alert("Error occured. Please try after sometime.");
          });
      }
      else {
        alert("Please upload a valid image file.");
        $('.nameuploadfile').html('Upload Company Logo');
      }
    }
  }

  public States = []
  GetState() {
    this.StateCity.GetState().subscribe((Stats) => {
      this.CWUS_State = '';
      this.CWUS_CITY = '';
      this.States = Stats;

      //console.log("State Data", this.States)
    })
  }

  public Cities: any = []
  GetCity(stateID) {
    //console.log("stateID", stateID)
    if (stateID != '') {
      this.StateCity.GetCity(stateID).subscribe((city) => {
        this.CWUS_CITY = '';
        this.Cities = city
      })
    }
    else {
      // this.CWUS_City = '';
      this.Cities = null;
    }
  }

  GetID(id) {
    //console.log("Need ID For Partner now ", id)
    this.needID_PartnerNow = id
  }

  populateData() {
    var sectorType = this.ndss;
    console.log(sectorType+"sectordis")
    var NeedType = this.ndt;
    let typeName = this._route.snapshot.params['type'];
    console.log(typeName+"dfghj");
    let subTypeName = this._route.snapshot.params['subtype'];
    console.log(subTypeName+"dfghj");
    let filter = this._route.snapshot.params['filter'];
    if (typeName !== null && typeName !== undefined) {
      if (typeName.includes("need-")) {
        this.needSearch(typeName, NeedType);
      }
       else if (typeName.includes("cat-") ) {
        this.sectorSearch(typeName, sectorType);
      } 
      else if (typeName.includes("filter-")) {
        this.filterSearch(typeName);
      } 
      else if (typeName.includes("-")) {
       this.needSingleSearch(typeName, NeedType);
       console.log("community");
      } 
    
      else {
        console.log("funwrkfn");
        this.sectorSearch(typeName, sectorType);
        //this.needSingleSearch(typeName, NeedType);
      }
    }
    if (subTypeName !== null && subTypeName !== undefined) {
      if (subTypeName.includes("cat-")) {
        this.sectorSearch(subTypeName, sectorType);
      } else if (subTypeName.includes("filter-")) {
        this.filterSearch(subTypeName);
      }
    }
    if (filter !== null && filter !== undefined) {
      if (filter.includes("cat-")) {
        this.filterSearch(filter);
      }
    }
    if (typeName === null || typeName === undefined) {
      this.GetNeeds("", "", "", "", "", "", "", "", "", "", this.PageNo, this.PageSize);
    } else {
      setTimeout(() => {
        this.Search();
      }, 500);
    }

  }
  needSearch(typeName, needType) {
    let catname = typeName.split("-");
    var cnt = 0;
    var NeedTypes = [];
    catname.forEach(function (element) {
      if (cnt > 0) {
        var nameVal = needType.find(c => c.NEEDTYPE_SLUG === element);
        if (nameVal !== undefined) {
          $("#" + nameVal.NEEDTYPEID).prop('checked', true);
          NeedTypes.push(nameVal.NEEDTYPEID);
        }
      }
      cnt++;
    });
    this.NeedTypes = NeedTypes;
  }
  sectorSearch(typeName, sectorType) {
    this.ActiveTypeName=typeName.replace("cat-", "").replace(/-/g, ' ');
    var cnt = 0;
    var SectorTypes = [];
    var nameVal = sectorType.find(c => c.SECTOR.toLowerCase() === this.ActiveTypeName);
    if (nameVal !== undefined) {
      $("#Categories" + nameVal.SECTORID).prop('checked', true);
      SectorTypes.push(nameVal.SECTORID);
    }
    this.NeedSector = SectorTypes;
  }
  filterSearch(filterName) {
    if (filterName !== undefined) {
      filterName = filterName.replace("filter-", "");
      $("#" + filterName).prop('checked', true);
      this.AdditionalFilter = $("#" + filterName).val();
      this.RadioButtonControl()
    }
  }
  public ActiveTypeName = 'All Needs'
  needSingleSearch(typeName, needTypeVal) {
    console.log("needTypeVal", needTypeVal)
    
    this.NeedTypes = [];
    typeName = typeName.replace(/-/g, ' ');
    console.log(typeName+"type");
    var nameVal = needTypeVal.find(c => c.NEEDTYPE.toLowerCase() === typeName.toLowerCase());
    this.ActiveTypeName = typeName
    if (nameVal !== undefined) {
      $("#" + nameVal.NEEDTYPEID).prop('checked', true);
      this.NeedTypes.push(nameVal.NEEDTYPEID);
    }
  }

  public NotShowOnFundraise = true

  capitalize(str){
    str = str.split(" ");
    for (var i = 0, x = str.length; i < x; i++) {
        str[i] = str[i][0].toUpperCase() + str[i].substr(1);
    }
    return str.join(" ");
  }

  ngOnInit() {
    let typeName = this._route.snapshot.params['type'];

    if( typeName != null && typeName != undefined ){
      let name = this.capitalize(typeName.replace("cat-", "").replace("filter-", "").replace("need-", "").replace(/-/g, ' '));
      this.title = "HoSh - Donate Money Online For "+name;
      this.description = "HoSh, the online fundraising and donation platform in India for raising money for "+name;
    }
    
    this.titleService.setTitle(this.title);
    this.metaService.updateTag({name:'title', content:this.title});
    this.metaService.updateTag({name:'description', content:this.description});
    this.metaService.updateTag({name:'twitter:title', content:this.title});
    this.metaService.updateTag({name:'twitter:description', content:this.description});
    this.metaService.updateTag({property:'og:title', content:this.title});
    this.metaService.updateTag({property:'og:description', content:this.description});

    var checkFundrase = this.router.url.includes("/fundraising");
    if (checkFundrase == true) {
      this.NotShowOnFundraise = false
      this.ActiveTypeName = 'Fundraising'
    }else{
      this.NotShowOnFundraise = true;
    }
    //console.log("ngOnInit", checkFundrase);
    //this.GetMapNeeds("", "", "", "", "", "", "", "", "", "", "", "");
    this.fundraiseBtnFloting()
    Globalvar.donorIdChanged.subscribe(
      (id: number) => {
        this.DONORID = id;
        //this.GetMapNeeds("", "", "", "", "", "", "", "", "", "", "");
        if (this.DonateAmountIDBeforeLogin) {
          this.donateNow(this.DonateAmountIDBeforeLogin)
        }
        if (this.FundraisBtnClick) {
          this.postFundraising()
        }
      }
    );


    //console.log("ResultID", this.ResultID)
    this.DONORID = Globalvar.getDonorId()
    //console.log("this.DONORID =", this.DONORID)
    if (this.DONORID > 0) {
      //this.GetCartNeedItem(this.DONORID)
    }


    // var thisO = this
    // var DONOR_O = 0
    // var checkUserLogin = setInterval(function(){
    //   thisO.DONORID = Globalvar.getDonorId() //localStorage.getItem('DONORID')
    //   if(thisO.DONORID !== DONOR_O){ 
    //     DONOR_O =  thisO.DONORID 
    //     thisO.DONORID = thisO.DONORID             
    //     console.log("this.DONORID =", thisO.DONORID)
    //     clearInterval(checkUserLogin)
    //   }
    //   console.log("this.DONORID =", thisO.DONORID)      
    // },500)


    $(document).on('keydown', '.typeNumberOnly', function (e) { -1 !== $.inArray(e.keyCode, [46, 8, 9, 27, 13]) || /65|67|86|88/.test(e.keyCode) && (!0 === e.ctrlKey || !0 === e.metaKey) || 35 <= e.keyCode && 40 >= e.keyCode || (e.shiftKey || 48 > e.keyCode || 57 < e.keyCode) && (96 > e.keyCode || 105 < e.keyCode) && e.preventDefault() });
    $(document).on('keydown', '.typeNumber', function (e) { -1 !== $.inArray(e.keyCode, [46, 8, 9, 27, 13]) || /65|67|86|88/.test(e.keyCode) && (!0 === e.ctrlKey || !0 === e.metaKey) || 35 <= e.keyCode && 40 >= e.keyCode || (e.shiftKey || 48 > e.keyCode || 57 < e.keyCode) && (96 > e.keyCode || 105 < e.keyCode) && e.preventDefault() });
    if(this.isBrowser){
      this.getCookie()
    }
    

    this.checkScroll();
    // if (this.TypeName == undefined) {
    //   $(".needTypeBox").show();
    //   this.GetNeeds("", "", "", "", "", "", "", "", "", this.PageNo, this.PageSize);
    // } else {
    //   $(".needTypeBox").hide();
    // }
    this.GetLocation("");
    this.nt.GetNeedTypes("").subscribe((ndt) => {
      if (ndt.length > 0) {
        if (ndt[0].NEEDTYPEID > 0) {
          this.ndt = ndt;
          if (this.NotShowOnFundraise == false) {
            var newType = []
            this.ndt.forEach(element => {
              if (element.NEEDTYPEID !== 4) {
                newType.push(element)
              }
            });
            this.ndt = newType
          }

          this.checkBoxCtrl();
        }
      }
    });
    this.nss.GetNeedSector("").subscribe((ndss) => {
      if (ndss.length > 0) {
        if (ndss[0].SECTORID > 0) {
          var sectorItems = []
          ndss.forEach(element => {
            if (element.HIDE_SECTOR === 0) {
              sectorItems.push(element)
            }
          });
          this.ndss = sectorItems
          setTimeout(() => {
            this.populateData();
          }, 100);
          this.checkBoxCtrl();
        }
      }
    });
    checkBoxStyle();
    
  }
  fundraiseBtnFloting() {
    $(window).scroll(function (e) {
      if ($(".fundraiseAndCartBtnW").length > 0) {
        stickerDiv();
      }
    });

    function stickerDiv() {
      var offsetTop = $(".fundraiseAndCartBtnW").offset().top - 35
      var windowScrollTop = $(window).scrollTop();
      if (windowScrollTop > offsetTop) {
        $("#sticker").css({ "top": (windowScrollTop - offsetTop) + "px" })
      } else {
        $("#sticker").css({ "top": "0px" })
      }
    }
  }


  slickSlider() {
    setTimeout(function () {
      if ($('.imgSlider').length > 0) {
        $('.imgSlider').not('.slick-initialized').slick({
          arrows: false,
          dots: true,
          infinite: false,
          speed: 300,
          slidesToShow: 1,
          slidesToScroll: 1,
          adaptiveHeight: true
        });
        //console.log("slick larg need imgSlider")
      }
    }, 600)
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

  selectCtrl() {
    $(function () {
      setTimeout(function () {
        $(".selectCtrl").each(function () {
          $(this).siblings(".selectVal").text($(":selected", this).text())
          var thisID;
          if ($(this).attr("name")) {
            thisID = $(this).attr("name")
            var NewthisID = thisID.toString().replace(/\D/g, '');
            var UpdatedA = $("#donateA" + NewthisID).val();
            if ($(":selected", this).val() !== UpdatedA && UpdatedA > 0) {
              $("#donateA" + NewthisID).val(UpdatedA);
            } else {
              //$("#donateA" + NewthisID).val($(":selected", this).val());
              //$("#donateA" + NewthisID).val($(":selected", this).val());
            }
            $("#actualA" + NewthisID).val($(":selected", this).val());
          }
          $(this).change(function () {
            $(this).siblings(".selectVal").text($(":selected", this).text())
          });
        })
        //console.log('aaa')
      }, 1)
    })
  }

  divEqualheight() {
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


  convertToDate(str) {
    var mnths = {
      Jan: "01", Feb: "02", Mar: "03", Apr: "04", May: "05", Jun: "06",
      Jul: "07", Aug: "08", Sep: "09", Oct: "10", Nov: "11", Dec: "12"
    },
      date = String(str).split(' ');
    return [date[3], mnths[date[1]], date[2]].join("-");
  }



  plainValueChanged(event, container: any) {
    var el = this.getElement(container);
    el.innerHTML = event.startValue;
  }

  getElement(data) {
    if (typeof (data) == 'string') {
      return document.getElementById(data);
    }
    if (typeof (data) == 'object' && data instanceof Element) {
      return data;
    }
    return null;
  }

  CalculateDays(END_DATE) {
    var end_Date = this.convertToDate(new Date(END_DATE));
    var current_Date = new Date().toISOString().split('T')[0];
    var fBDate = new Date(end_Date.replace(/-/g, ","));
    var fEDate = new Date(current_Date.replace(/-/g, ","));
    var oneDay = 24 * 60 * 60 * 1000;
    var diffDays = Math.round(Math.abs((fBDate.getTime() - fEDate.getTime()) / (oneDay)));
    return diffDays;
  };

  CalculateRemaingAmt(NEED_AMOUNT, ADMINISTRATION_CHARGES) {
    return (NEED_AMOUNT - ADMINISTRATION_CHARGES).toFixed(2);
  };

  CalculatePercentage(NEED_AMOUNT, ADMINISTRATION_CHARGES) {
    if (NEED_AMOUNT == 0 || NEED_AMOUNT == undefined) {
      return 0;
    } else {
      return Math.round((100 - (((NEED_AMOUNT - ADMINISTRATION_CHARGES) / NEED_AMOUNT) * 100)));
    }
  };

  public amount;
  donationAmount(reminingAmount, minimumAmount, e) {
    
    if(e.target.value !== '' && e.target.value !== undefined){
    //console.log("reminingA", reminingAmount, "minimumA", reminingAmount)
    var reminingA = Math.round(reminingAmount), minimumA = Math.round(minimumAmount)
    var thisObj = e.target.id
    var thisValue = e.target.value

    thisValue = Math.round(thisValue.replace(/\,/g, ''));
    //console.log("reminingA", reminingA, "minimumA", minimumA, "this amount", thisValue)

    if (reminingA < minimumA) {
      if (thisValue > reminingA) {
        alert(' Contribution amount should be less than equal to ' + reminingA)
        $("#" + thisObj).val(this.ReplaceWithComa(reminingA))
        //$("#" + thisObj).val('')
      } else {
        this.amount = thisValue
      }
    } else {
      if (reminingA >= thisValue && minimumA <= thisValue) {
        this.amount = thisValue
      } else {
        if (thisValue > reminingA) {
          alert(' Contribution amount should be less than equal to ' + reminingA)
          //$("#" + thisObj).val(this.ReplaceWithComa(reminingA))
          $("#" + thisObj).val('')
        } else if (thisValue < minimumA) {
          alert(' Contribution amount should be greater than equal to ' + minimumA)
          // $("#" + thisObj).val(this.ReplaceWithComa(reminingA))
          $("#" + thisObj).val('')
        }
      }
    }
  }
  }

  ReplaceWithComa(value) {
    var thisVWithComa, value = value.toString()
    thisVWithComa = value.replace(/[\D\s\._\-]+/g, "");
    thisVWithComa = thisVWithComa ? parseInt(thisVWithComa, 10) : 0;
    return thisVWithComa = (thisVWithComa === 0) ? "" : thisVWithComa.toLocaleString("en-US");
  }

  donationAmountForGift(minimumA, e) {
    if(e.target.value !== '' && e.target.value !== undefined){
    var thisObj = e.target.id
    if (e.target.value == undefined) {
      alert('Please Select Gift Quantity')
    } else {
      if (minimumA > e.target.value) {
        alert(' Contribution amount should be greater than ' + minimumA)
        $("#" + thisObj).val(this.ReplaceWithComa(minimumA))
      }
    }
  }
  }

  RadioButtonControl() {
    $("input[type='radio']").each(function () {
      if ($(this).prop("checked") == true) {
        $(this).parents(".radioBtnBox").addClass("active")
      } else {
        $(this).parents(".radioBtnBox").removeClass("active")
      }
    })
  } 



  giftAmountCalc(giftAmount, targetCtrl, e) {
    var thisVN = (giftAmount * e.target.value).toString()
    var thisVWithComa: any = thisVN.replace(/[\D\s\._\-]+/g, "");
    thisVWithComa = thisVWithComa ? parseInt(thisVWithComa, 10) : 0;
    thisVWithComa = (thisVWithComa === 0) ? "" : thisVWithComa.toLocaleString("en-US");
    $("#donateA" + targetCtrl).val(thisVWithComa)
    $("#actualA" + targetCtrl).val(e.target.value)
    $("#defaultA" + targetCtrl).val(e.target.value);
  }

  customeSelectControl(DA, nID, e) {
    var dAmount = DA, thisV = e.target.value, targetID = nID, thisVWithComa
    thisVWithComa = thisV.replace(/[\D\s\._\-]+/g, "");
    thisVWithComa = thisVWithComa ? parseInt(thisVWithComa, 10) : 0;
    thisVWithComa = (thisVWithComa === 0) ? "" : thisVWithComa.toLocaleString("en-US");
    $("#donateA" + targetID).val(thisVWithComa)
    $("#actualA" + targetID).val(thisV)
  }
  // customeSelectControl(DA, nID, event) {
  //   var dAmount = DA, thisV = event.target.value, targetID = nID;
  //   $("#donateA" + targetID).val(event.target.value);
  //   $("#defaultA" + targetID).val(event.target.value);
  //   $("#actualA" + targetID).val(event.target.value);
  //   //rk commseprator
  //   setTimeout(function () {
  //     $('.typeNumberOnly').each(function (index, element) {
  //       var selection = window.getSelection().toString();
  //       if (selection !== '') {
  //         return;
  //       }
  //       if ($.inArray(event.keyCode, [38, 40, 37, 39]) !== -1) {
  //         return;
  //       }
  //       var $this = $(this);
  //       var input = $this.val();
  //       var input = input.replace(/[\D\s\._\-]+/g, "");
  //       input = input ? parseInt(input, 10) : 0;
  //       $this.val(function () {
  //         return (input === 0) ? "" : input.toLocaleString("en-US");
  //       });


  //     });
  //   }, 100);
  // }

} // END ngOnInit



function checkBoxStyle() {
  $(".BtnBox.minus").hide();
  $("body").on("click", ".BtnBox", function () {
    if ($(this).hasClass("plus")) {
      $(".AdvanceFilter").slideDown("slow");
      $(".BtnBox.plus").hide();
      $(".BtnBox.minus").show();
    } else if ($(this).hasClass("minus")) {
      $(".AdvanceFilter").slideUp("slow");
      $(".BtnBox.plus").show();
      $(".BtnBox.minus").hide();
    }
  })


  $(".filterBTN").click(function () {
    $(".filterWapper").slideToggle();
    $(".filterBTN").toggleClass("CloseBTN");
  });
}




function initializeMap(MarkersData, thisO) {
  //console.log('initializeMap array', MarkersData);
  var marker, i, gm_map, clusterMarkers, options_markerclusterer, infoWindow = new google.maps.InfoWindow();
  var styledMapType = new google.maps.StyledMapType([
    { elementType: 'geometry', stylers: [{ color: '#ebe3cd' }] },
    { elementType: 'labels.text.fill', stylers: [{ color: '#523735' }] },
    { elementType: 'labels.text.stroke', stylers: [{ color: '#f5f1e6' }] },
    { featureType: 'administrative', elementType: 'geometry.stroke', stylers: [{ color: '#c9b2a6' }] },
    { featureType: 'administrative.land_parcel', elementType: 'geometry.stroke', stylers: [{ color: '#dcd2be' }] },
    { featureType: 'administrative.land_parcel', elementType: 'labels.text.fill', stylers: [{ color: '#ae9e90' }] },
    { featureType: 'landscape.natural', elementType: 'geometry', stylers: [{ color: '#dfd2ae' }] },
    { featureType: 'poi', elementType: 'geometry', stylers: [{ color: '#dfd2ae' }] },
    { featureType: 'poi', elementType: 'labels.text.fill', stylers: [{ color: '#93817c' }] },
    { featureType: 'poi.park', elementType: 'geometry.fill', stylers: [{ color: '#a5b076' }] },
    { featureType: 'poi.park', elementType: 'labels.text.fill', stylers: [{ color: '#447530' }] },
    { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#f5f1e6' }] },
    { featureType: 'road.arterial', elementType: 'geometry', stylers: [{ color: '#fdfcf8' }] },
    { featureType: 'road.highway', elementType: 'geometry', stylers: [{ color: '#f8c967' }] },
    { featureType: 'road.highway', elementType: 'geometry.stroke', stylers: [{ color: '#e9bc62' }] },
    { featureType: 'road.highway.controlled_access', elementType: 'geometry', stylers: [{ color: '#e98d58' }] },
    { featureType: 'road.highway.controlled_access', elementType: 'geometry.stroke', stylers: [{ color: '#db8555' }] },
    { featureType: 'road.local', elementType: 'labels.text.fill', stylers: [{ color: '#806b63' }] },
    { featureType: 'transit.line', elementType: 'geometry', stylers: [{ color: '#dfd2ae' }] },
    { featureType: 'transit.line', elementType: 'labels.text.fill', stylers: [{ color: '#8f7d77' }] },
    { featureType: 'transit.line', elementType: 'labels.text.stroke', stylers: [{ color: '#ebe3cd' }] },
    { featureType: 'transit.station', elementType: 'geometry', stylers: [{ color: '#dfd2ae' }] },
    { featureType: 'water', elementType: 'geometry.fill', stylers: [{ color: '#b9d3c2' }] },
    { featureType: 'water', elementType: 'labels.text.fill', stylers: [{ color: '#92998d' }] },
    { featureType: 'transit', elementType: 'labels.icon', stylers: [{ visibility: 'off' }] },
    { featureType: 'poi.business', stylers: [{ visibility: 'off' }] }
  ], { name: 'Styled Map' });

  clusterMarkers = [];
  for (i = 0; i < MarkersData.length; i++) {
    var marker = new google.maps.Marker({
      animation: google.maps.Animation.DROP,
      position: new google.maps.LatLng(MarkersData[i].ADP_LATITUDE, MarkersData[i].ADP_LONGITUDE),
      map: gm_map,
      title: MarkersData[i].NEED_NAME,
      icon: MarkersData[i].SECTOR_ICON_FILEPATH,
      need_id: MarkersData[i].NEEDID,
      need_address: MarkersData[i].NEED_STATE_NAME,
      need_type: MarkersData[i].NEEDTYPE,
      need_thumb: MarkersData[i].NEEDTYPE_IMAGE_FILEPATH,
     
    });
    
    clusterMarkers.push(marker);
  }


  var options_googlemaps = {
    minZoom: 4, zoom: 5,
    center: new google.maps.LatLng(22.431340535555012, 78.66210912500003),
    maxZoom: 18,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    streetViewControl: false,
    mapTypeControlOptions: {
      mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain', 'styled_map']
    },
    mapTypeControl: false
  }
  gm_map = new google.maps.Map(document.getElementById('google-maps'), options_googlemaps);
  gm_map.mapTypes.set('styled_map', styledMapType);
  gm_map.setMapTypeId('styled_map');

  google.maps.event.addListener(infoWindow, 'domready', function () {
    var iwOuter = $('.gm-style-iw');
    var iwBackground = iwOuter.prev();
    iwBackground.children(':nth-child(2)').css({ 'display': 'none' });
    iwBackground.children(':nth-child(4)').css({ 'display': 'none' });
    //iwOuter.parent().parent().css({left: '115px'});
    iwOuter.parent().addClass('ArrowClass');
    //iwBackground.children(':nth-child(1)').attr('style', function(i,s){ return s + 'left: 76px !important;'});
    //iwBackground.children(':nth-child(3)').attr('style', function(i,s){ return s + 'left: 76px !important;'});
    iwBackground.children(':nth-child(3)').find('div').children().css({ 'box-shadow': 'rgba(72, 181, 233, 0.6) 0px 1px 6px', 'z-index': '1' });

  });


  options_markerclusterer = {
    gridSize: 20, maxZoom: 18, zoomOnClick: false,
    imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
  };
  var markerCluster = new MarkerClusterer(gm_map, clusterMarkers, options_markerclusterer);
  google.maps.event.addListener(markerCluster, 'clusterclick', function (cluster) {
    var markers = cluster.getMarkers(), array = [], markersId = [], markersTitle = [];
    for (i = 0; i < markers.length; i++) {
      array.push("<a href='javascript:void(0)' class='markerLiks' id='" + markers[i].get('store_id') + "'>" + markers[i].getTitle() + '</a>');
      markersId.push(markers[i].get('need_id'));
      markersTitle.push({ 'needID': markers[i].get('need_id'), 'Image': markers[i].get('need_thumb'), 'Title': markers[i].getTitle() });
    }
    var MarkersList = makeUL(markersTitle);
    if (gm_map.getZoom() <= markerCluster.getMaxZoom()) {
      infoWindow.setContent("<h3> List of Needs (" + markers.length + ") </h3>" + MarkersList);
      infoWindow.setPosition(cluster.getCenter());
      infoWindow.open(gm_map);

      //this.clickedMarker(markers[i].get('need_id'));
      // window['donateComponentRef'].zone.run(() => {window['donateComponentRef'].component.clickedMarker(markersId);})

      setTimeout(() => {
        var tabHtml = $(".markerLists").html();
        $(".markerLists").html(tabHtml.replace(/,/g, ''));
        $('.markerLists li').each(function (index, element) {
          $(this).click(function () {
            var mId = $(this).find('a').attr('id');            
              window['donateComponentRef'].zone.run(() => { window['donateComponentRef'].component.clickedMarker(mId); })
          });
        });
        $(".markerLists li").each(function () {
          $(this).mouseover(function () {
            $(this).css("background", "#f1f1f1");
          });
          $(this).mouseout(function () {
            $(this).css("background", "#FFF");
          });
        });
      }, 200);
    }
  });

  for (i = 0; i < clusterMarkers.length; i++) {
    var marker = clusterMarkers[i];
    google.maps.event.addListener(marker, 'click', (function (marker, i) {
      return function () {
        //if(this.isBrowser){
          window['donateComponentRef'].zone.run(() => { window['donateComponentRef'].component.clickedMarker(marker.need_id); });
        //}

        
        //infoWindow.setContent("Title="+this.getTitle()+"<br> ID="+marker.need_id);        
        //infoWindow.open(gm_map, this);   

      }
    })(marker));
  }
  
}
function makeUL(array) {
  var m = [];
  for (var i = 0; i < array.length; i++) {
    m[i] = "<li><img src='" + array[i].Image + "'alt=''/><a href='javascript:void(0)' class='markerLiks' id='" + array[i].needID + "'>" + array[i].Title + "</a></li>";
  }
  var list = "<ul class='markerLists'>" + m + "</ul>";
  return list;
}