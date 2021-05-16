import { PLATFORM_ID, Inject, Injectable, Component, OnInit, AfterViewInit, ElementRef, Input, ViewChild, ViewEncapsulation, NgZone } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Pipe } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { Needs } from '../classes/needs';
import { needsService } from '../services/needs.service';
import { ActivatedRoute, Router, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Testimonial } from '../classes/testimonial';
import { TestimonialsService } from '../services/testimonials.service';
import { SStories } from '../classes/s-stories';
import { SStoriesService } from '../services/s-stories.service';
import { Tagsmap } from '../classes/tagsmap';
import { TagsmapService } from '../services/tagsmap.service';
import { SimilarNeedsService } from '../services/similar-needs.service';
import { LneedLisiting } from '../classes/lneed-lisiting';
import { LneedLisitingService } from '../services/lneed-lisiting.service';
import { NguCarouselStore, NguCarouselConfig } from '@ngu/carousel';
import { Needcomment } from '../classes/needcomment';
import { NeedCommentService } from '../services/needcomment.service';
import { Donorsupporter } from '../classes/donorsupporter';
import { DonorsupporterService } from '../services/donorsupporter.service';
import { Largeneedlatestimage } from '../classes/largeneedlatestimage';
import { LargeneedlatestimageService } from '../services/largeneedlatestimage.service';
import { Smalldocument } from '../classes/smalldocument';
import { SmalldocumentService } from '../services/smalldocument.service';
import { Globalvar } from '../classes/globalvar';
import { GetFundRaiseNeedMappingDetailsService } from '../services/get-fund-raise-need-mapping-details.service';
import { DeleteFundRaiseNeedMapping } from '../services/delete-fund-raise-need-mapping.service';
import { Campaigners } from '../classes/campaigners';
import { CampaignersService } from '../services/campaigners.service';
import { Partners } from '../classes/partners';
import { PartnersService } from '../services/partners.service';
import { ConnectnowService } from '../services/connectnow.service';
import { CartService } from '../services/cart.service';
import { HomepageFactsFiguresService } from '../services/homepage-facts-figures.service';
import { StateCityService } from '../services/state-city.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Title, Meta } from '@angular/platform-browser';
import { LinkService } from '../services/link.service';
import { faMapMarkerAlt, faRupeeSign } from '@fortawesome/free-solid-svg-icons';
declare var needShareDropdown: any;
declare var $: any;
declare var require: any;
let ArrayTAGID = [];
let options: NgbModalOptions = {
    size: 'lg'
};
//let element = document.getElementById('#commentsBox');
//element.className

@Injectable()

@Pipe({
    name: 'limitTo',
})
@Component({
    selector: 'need-details',
    templateUrl: './need-details.component.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./need-details.component.css']
})

export class NeedDetailsComponent implements OnInit, AfterViewInit {
    faMapMarkerAlt = faMapMarkerAlt;
    faRupeeSign = faRupeeSign;
    defaultImage = '../assets/images/image_not_available.jpg';
    public shareTitle
    public shareMedia
    public shareText

    transform(value: string, limit: number): string {
        let trail = '...';
        return value.length > limit ? value.substring(0, limit) + trail : value;

    }

    closeResult: string;
    public nds: Needs[];
    public tsNds: Testimonial[];
    public ssNds: SStories[];
    public NdTagMap: Tagsmap[];
    public sNeeds: Needs[];
    public lNeedList: LneedLisiting[];
    public NeedComments: Needcomment[];
    public DonorSupporter: Donorsupporter[];
    public LargeNeedLatestImage: Largeneedlatestimage[];
    public Smalldocument: Smalldocument[];
    public GetCNers: Campaigners[];
    public GetPartnersD: Partners[];
    public TMNeedId = "";
    public NeedTypesID = "";
    public needID = "";
    public END_DATE = "";
    public NEED_AMOUNT;
    public ADMINISTRATION_CHARGES;
    productID: string;
    isProdEnvironment: string;
    public largeNeedCarausal: NguCarouselConfig;
    public SNeedsCarausal: NguCarouselConfig;
    //public carouselOne: NguCarouselConfig;
    //public carouselTwo: NguCarouselConfig;
    public carouselThree: NguCarouselConfig;
    public vURL;
    public GiftQuantity = [];
    selectedValue = 1;
    isBrowser: boolean;
    public NEEDTYPEID;
    public NEEDTYPE;
    public NEEDNAME;
    public SECTOR_NAMES;
    public SECTOR_SLUG;
    public NEED_GALLERY = [];
    public jsonObj = [];

    public COMMENT: string = '';
    public needIDComment;
    public USERAGENT: string = '';
    public IPADDRESS: string = '';

    public ProjectsCost;
    public myImgUrl: string = './assets/images/image_not_available.jpg';
    public TOTAL_NEED_AMOUNT_FOR_LARGE_NEED: number;
    public DONATION_AMOUNT_FOR_LARGE_NEED: number;
    public DAYS_LEFT_FOR_LARGE_NEED: number;
    public needIdForFundraising = [];
    public setNoOFNeeds;
    public SimilarNeeds = [];
    public ResultID: any;
    public FUND_RAISE_DATA = [];
    public ScrollPageHt: any;

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

    public DONORID;


    public SD_EMAILID;
    public SD_CONTACT_NUMBER;
    public SD_CONTACT_PERSON;
    public SD_MESSAGE;

    // for cart 

    //public elementArry = [];
    public CartDonorID;
    public data=[];

    constructor(
        private getFactsFigures: HomepageFactsFiguresService,
        private nsf: ConnectnowService,
        private PartnersData: PartnersService,
        private CampaignerData: CampaignersService,
        private FundRiseS: GetFundRaiseNeedMappingDetailsService,
        private DeleteFundRaiseN: DeleteFundRaiseNeedMapping,
        private SDoc: SmalldocumentService,
        private LatestImage: LargeneedlatestimageService,
        private DSArray: DonorsupporterService,
        private nedComt: NeedCommentService,
        private lNdList: LneedLisitingService,
        private sNds: SimilarNeedsService,
        private ndTagM: TagsmapService,
        private ssNd: SStoriesService,
        private tmNs: TestimonialsService,
        private StateCity: StateCityService,
        private ns: needsService,
        private activeRoute: ActivatedRoute,
        private router: Router,
        private spinner: NgxSpinnerService,
        private modalService: NgbModal,
        // private carousel: NguCarouselService,
        private http: HttpClient,
        private CartS: CartService,
        private sanitizer: DomSanitizer,
        private titleService: Title,
        private metaService: Meta,
        private linkService: LinkService,
        private _ngZone: NgZone,
        @Inject(PLATFORM_ID) platformId: string) {
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
        }

    }



    sentenceCase(str) {
        if ((str === null) || (str === ''))
            return false;
        else
            str = str.toString();
        return str.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
    }

    public getSantizeUrl(url) {
        if (!url) return null;
        return this.sanitizer.bypassSecurityTrustUrl(url);
    }

    public FundraisBtnClick = false;
    public FundraisID = 0;
    postFundraising(needID) {
        if (this.DONORID > 0) {
            var index = this.needIdForFundraising.indexOf(needID);
            var targetElement = $("#fundraiseNeed" + needID)
            if (targetElement.is(':checked')) {
                this.needIdForFundraising.push(needID)
                targetElement.parents('.btnStartFundraising').find('span').text('Added your Fundraising');
            } else {
                this.needIdForFundraising.splice(index, 1);
                targetElement.parents('.btnStartFundraising').find('span').text('Start Fundraising');
            }
            this.setNoOFNeeds = this.needIdForFundraising.length
            if (this.ResultID > 0) {
                this.postNeedIDForFundraising()
            } else {
                var body = {
                    'DONORID': this.CartDonorID,
                    'FUNDRAISE_NAME': '',
                    'PARENT_COMMENTID': '0',
                    'FUNDRAISE_AMOUNT': '',
                    'DESCRIPTION': ''
                };
                this.http.post(Globalvar.ApiUrl + "/PostFundRaise", body).subscribe((data) => {
                    this.ResultID = data[0].STATUSES[0].ResultId;
                    this.ResultID = this.ResultID;
                    this.postNeedIDForFundraising();
                });
            }
        } else {
            this.FundraisBtnClick = true
            this.FundraisID = needID
            document.getElementById("signupBtn").click()
        }
    }
    postNeedIDForFundraising() {
        this.DeleteFundRaiseN.DeleteFundRaiseNeedMapping(this.ResultID).subscribe((NewfundRaiseData) => {
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
                            this.router.navigate(['/my-fundraisers']);
                        }
                    })
                });
            }
        })
    }

    GetFundraiseDetails(ResultID) {
        if (ResultID > 0) {
            //console.log(ResultID)
            if (this.FUND_RAISE_DATA.length < 1) {
                this.FundRiseS.GetFundRaiseNeedMappingDetailsService(ResultID).subscribe((fundRaiseData) => {
                    if (fundRaiseData.length >= 0) {
                        this.FUND_RAISE_DATA = fundRaiseData;
                        //console.log('fundRaiseData')
                        //console.log(fundRaiseData);
                        var count = 0;
                        this.FUND_RAISE_DATA.forEach(element => {
                            var activeCheckbox = "need" + element.NEEDID
                            //console.log(activeCheckbox)
                            $("#" + activeCheckbox).prop("checked", "checked")
                            $("#" + activeCheckbox).parents('.btnStartFundraising').find('span').text('Added your Fundraising');
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
                        $("#" + activeCheckbox).prop("checked", "checked");
                        $("#" + activeCheckbox).parents('.btnStartFundraising').find('span').text('Start Fundraising');
                    }, 200)

                })
            }
        }
    }

    public factsFigureData = [];
    GetFactsFigures() {
        this.getFactsFigures.HomepageFactsFiguresService().subscribe((factsFigureData) => {
            this.factsFigureData = factsFigureData;
            //console.log("factsFigureData = ", factsFigureData)
        })
    }

    getCookie() {
        this.ResultID = parseFloat(Globalvar.readCookie('ResultID'))
        //console.log("ResultID2=" + this.ResultID)
    }
    postComment(ngForm) {
        if (this.DONORID > 0) {
            if (ngForm.valid) {
                this.spinner.show();
                //console.log(ngForm)
                var body = {
                    'NEEDID': this.needIDComment,
                    'COMMENTS': ngForm.value.cumment,
                    'PARENT_COMMENTID': '0',
                    'IPADDRESS': ngForm.value.ipAddress,
                    'USERAGENT': ngForm.value.UserAgent,
                    'ISPUBLISHED': '0',
                    'DONORID': this.DONORID,
                    'USERID': ''
                };
                //console.log("body comment } ", body)
                this.http.post(Globalvar.ApiUrl + "/PostWebsiteComments", body).subscribe((data) => {
                    this.spinner.hide();
                    this.COMMENT = "";
                    setTimeout(() => {
                        alert("Thank you. Your comment will be displayed after review.")
                    }, 200)
                });
            } else {
                alert('Write a comment')
            }
        } else {
            //alert("Please Login")
            document.getElementById("signupBtn").click()
        }
    }

    GetLNeedLImage(LINeedId) {
        this.LatestImage.GetLNeedLImage(LINeedId).subscribe((LargeNeedLatestImage) => {
            this.LargeNeedLatestImage = LargeNeedLatestImage;
            //console.log("Large Need Latest Image:");
            //console.log("LargeNeedLatestImage }", this.LargeNeedLatestImage);

            LargeNeedLatestImage.forEach(element => {
                // console.log(element.NEEDID)
                this.GetSmallDocuments(element.NEEDID, 0)
            })
            // }

        });
    }

    GetSmallDocuments(SINeedId, type) {
        this.SDoc.GetSmallDocuments(SINeedId).subscribe((Smalldocument) => {
            if (Smalldocument.length >= 0) {
                //this.Smalldocument = Smalldocument;
                var needList = []
                Smalldocument.forEach(element => {
                    var type = element.DOCUMENT_TYPE
                    if (type.includes("Image") && !type.includes("Impacted Lives Image") || type.includes("Video") && !type.includes("Impacted Lives Video")) {
                        if (element.DOCUMENT_URL_9 == '') {
                            element.DOCUMENT_URL_9_FILEPATH = Globalvar.ApiUrl + 'assets/images/image_not_available.jpg'
                        }
                        needList.push(element)
                    }
                });

                this.Smalldocument = needList
                this.NEED_GALLERY = this.Smalldocument;
                //console.log("Smalldocument = ", this.Smalldocument)
                if (type === 1) {
                    this.getGallery(this.NEED_GALLERY);
                }
                this.SlickSliderLargeNeedlider();
                this.SlickSliderIndividualNeeds()
            }
        });
    }

    GetCampaigners(cNeedID) {
        this.CampaignerData.GetCampaigners(cNeedID).subscribe((GetCNers) => {
            if (GetCNers.length >= 0) {
                this.GetCNers = GetCNers;
                PagerNav();
                //console.log('Campaigners');
                //console.log(this.GetCNers);
            }
        });
    }
    GetDonorSupporter(DSNedId) {
        this.DSArray.GetDonorSupporter(DSNedId).subscribe((DonorSupporter) => {
            if (DonorSupporter.length >= 0) {
                this.DonorSupporter = DonorSupporter;
                PagerNav();
                //console.log("Doner Supporter:");
                //console.log(this.DonorSupporter);
            }
        });
    }
    GetPartners(GetPId) {
        this.PartnersData.GetPartners(GetPId).subscribe((GetPartnersD) => {
            // debugger;
            if (GetPartnersD.length >= 0) {

                this.GetPartnersD = GetPartnersD;
                PartnersSlider();
                //console.log('GetPartnersData');
                //console.log(this.GetPartnersD);
            }
        });
    }


    getGallery(e) {
        //console.log(e)
        var IMG_LIST = [];
        e.forEach(element => {
            var src = "";
            var thumb;
            if (element.DOCUMENT_TYPE == "Need Video" || element.DOCUMENT_TYPE == "Need Image") {
                if (element.DOCUMENT_TYPE == "Need Video") {
                    src = element.DOCUMENT_URL;
                    thumb = this.getScreen(element.DOCUMENT_URL, "")
                } else if (element.DOCUMENT_TYPE == "Need Image") {
                    src = element.DOCUMENT_URL_9_FILEPATH;
                    thumb = element.DOCUMENT_URL_2_FILEPATH
                }
                //console.log(thumb)
                IMG_LIST.push({ src: src, opts: { caption: element.DOCUMENT_TITLE, thumb: thumb } })
            }
        });
        if (IMG_LIST.length > 0) {
            $.fancybox.open(IMG_LIST, {
                loop: true,
                thumbs: {
                    autoStart: true
                }
            });
        }

    }

    GetLNeedList(lNeedId) {
        this.lNdList.GetLNeedList(lNeedId).subscribe((lNeedList) => {
            if (lNeedList.length >= 0) {
                this.lNeedList = lNeedList;
                //console.log("Large Need List: } ", lNeedList);
                //console.log(this.lNeedList);
            }
        });
    }
    GetNeedComment(NedID) {
    
        this.nedComt.GetNeedComment(NedID).subscribe((NeedComments) => {
            if (NeedComments.length >= 0) {
                this.NeedComments = NeedComments;
                //console.log("Comments");
                //console.log(this.NeedComments)
            }
        });
    }


    setCartVal(dNeedId, dAmount) {
        for (var i = 0; i < this.jsonObj.length; i++) {
            if (this.jsonObj[i].id == dNeedId) {
                this.jsonObj[i].type = dAmount;
                return this.jsonObj;
            }
        }
    }
    // DonateNow(id) {
    //     $('.LNthumbnailWrp input').each(function (element, index) {
    //         if ($(this).val() != "") {
    //             this.setCartVal(id, "200")
    //             console.log($(this).attr('id'), $(this).val());
    //         }
    //     })
    // }

    public DonateAmountIDBeforeLogin = false
    DonateNow(item) {
        if (this.DONORID > 0) {
            var count = 0;
            //var noOfElement = $("."+item).filter(function() { return $(this).val(); }).length;
            // console.log("noOfElement", noOfElement)
            var elementArry = []
            var thisO = this
            $("." + item).each(function () {
                var cAMOUNT = $(this).val();
                cAMOUNT = cAMOUNT.replace(/\,/g, '');
                if (cAMOUNT > 0 && cAMOUNT !== '') {
                    var cartNeedId = parseInt($(this).attr("id").replace('donateA', ''));
                    var cartAMOUNT = cAMOUNT;
                    var cartQuantity = parseInt($("#giftQuantity" + cartNeedId).find("option:selected").text());
                    var cartFrequency = $("#frequency" + cartNeedId).find("option:selected").text();
                    var actualA = parseInt($("#actualA" + cartNeedId).val()) ? parseInt($("#actualA" + cartNeedId).val()) : '';
                    var cartItem = {
                        'NEEDID': cartNeedId,
                        'DONORID': thisO.DONORID,
                        'QUANTITY': cartQuantity > 0 ? cartQuantity : '',
                        'CART_PAYMENT_FREQUENCY': cartFrequency,
                        'AMOUNT': cartAMOUNT,
                        'ACTUAL_AMOUNT': actualA
                    };
                    elementArry.push(cartItem)
                    //console.log("cartItem }= ", thisO.DONORID, cartItem)
                    count = count + 1
                }
            })
            elementArry.length < 1 ? alert("Please enter contribution amount.") : '';
            $(".CalcDonateAmount:first").focus();

            //console.log("elementArry }= ", elementArry)
            elementArry.forEach(element => {
                var cartItem = {
                    'NEEDID': element.NEEDID,
                    'DONORID': element.DONORID,
                    'QUANTITY': element.QUANTITY,
                    'CART_PAYMENT_FREQUENCY': element.CART_PAYMENT_FREQUENCY,
                    'AMOUNT': element.AMOUNT,
                    'ACTUAL_AMOUNT': element.ACTUAL_AMOUNT
                };
                this.http.post(Globalvar.ApiUrl + "/PostDonorCart", cartItem).subscribe((cartData) => {
                    if (count == elementArry.length) {
                        this.router.navigate(['/payment']);
                        this.DonateAmountIDBeforeLogin = false
                    }
                })
            });
        } else {
            var thisO = this, countItem = 0
            $("." + item).each(function () {
                if ($(this).val()) {
                    countItem++
                }
            })
            if (countItem > 0) {
                thisO.DonateAmountIDBeforeLogin = true
            }
            //alert('Please Login')
            document.getElementById("signupBtn").click()
        }
    }

    public DonateBtnActive = true;
    GetCartNeedItem() {
        var thisO = this
        this.CartS.CartService(this.CartDonorID).subscribe((CartNeedData) => {
            CartNeedData.forEach(element => {
                setTimeout(function () {
                    $("#donateA" + element.NEEDID).val(element.AMOUNT)
                    $("#giftQuantity" + element.NEEDID).val(element.ACTUAL_AMOUNT)
                    $("#actualA" + element.NEEDID).val(element.ACTUAL_AMOUNT)
                    $("#frequency" + element.NEEDID).val(element.ACTUAL_AMOUNT)

                    //console.log("AMOUNT", element.AMOUNT, "ACTUAL_AMOUNT", element.ACTUAL_AMOUNT)



                    var cartItems = 0;
                    $(".CalcDonateAmount").each(function () {
                        if ($(this).val() > 0) {
                            cartItems = cartItems + 1;
                        }
                    })
                    //console.log("cartItems", cartItems)
                    if (cartItems > 0) {
                        $(".cartItemAdded").addClass("active").text(cartItems + ' Need Added to Cart')
                    } else {
                        $(".cartItemAdded").removeClass("active").text('Add to Cart')
                    }
                }, 200)

            });
            //console.log("CartNeedData = ", CartNeedData)
        })
    }
    GetNeeds(needID) {
        this.nds = null;
        this.ns.getNeeds(needID, "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "").subscribe((nds) => {
            console.log(needID);
            if (nds.length > 0) {
                if (nds[0].NEEDID > 0) {
                    this.nds = nds;
                    let title = "HoSh - "+nds[0].NEED_NAME;
                    let description = ( nds[0].META_DESCRIPTION !=null && nds[0].META_DESCRIPTION.toLowerCase() != 'null' && nds[0].META_DESCRIPTION != "" ) ? nds[0].META_DESCRIPTION : nds[0].NEED_SHORT_DESCRIPTION;
                    let keywords = nds[0].META_KEYWORD;
                    let robots = nds[0].META_ROBOT;
                    let canonical = nds[0].META_CANONICAL; 
                    let image = nds[0].NEED_THUMBNAIL_IMAGE_6_FILEPATH;
                    this.titleService.setTitle(title);
                    this.metaService.updateTag({name:'title', content:title});
                    this.metaService.updateTag({name:'description', content:description});
                    this.metaService.updateTag({name:'twitter:title', content:title});
                    this.metaService.updateTag({name:'twitter:description', content:description});
                    this.metaService.updateTag({property:'og:title', content:title});
                    this.metaService.updateTag({property:'og:description', content:description});
                    if( keywords != null && keywords.toLowerCase() != 'null' &&  keywords != ""){
                        this.metaService.updateTag({name:'keywords', content:keywords});
                    }
                    if( image != null && image.toLowerCase() != 'null' &&  image != ""){
                        this.metaService.updateTag({name:'twitter:image', content:image});
                        this.metaService.updateTag({property:'og:image', content:image});
                    }
                    if( canonical != null && canonical.toLowerCase() != 'null' &&  canonical != ""){
                        this.linkService.addTag( { rel: 'canonical', href:  canonical} );
                    }
                    if( robots != null && robots.toLowerCase() != 'null' &&  robots != ""){
                        this.metaService.addTag({name:'robots', content:robots});
                    }
                    this.needIDComment = nds[0].NEEDID;
                    this.NEEDTYPEID = nds[0].NEEDTYPEID;
                    this.NEEDTYPE = nds[0].NEEDTYPE;
                    this.NEEDNAME = nds[0].NEED_NAME;
                    this.SECTOR_NAMES=nds[0].SECTOR;
                    this.SECTOR_SLUG=nds[0].SECTOR_SLUG;
                    this.GetLNeedList(nds[0].NEEDID);
                    this.GetNeedComment(nds[0].NEEDID);
                    this.GetDonorSupporter(nds[0].NEEDID);
                    this.GetLNeedLImage(nds[0].NEEDID);
                    this.GetSmallDocuments(nds[0].NEEDID, 0);
                    this.GetFundraiseDetails(this.ResultID);
                    this.GetCampaigners(nds[0].NEEDID);
                    this.GetPartners(nds[0].NEEDID);
                    this.ProjectsCost = 100 - nds[0].ADMINISTRATION_CHARGES;
                    this.shareTitle = nds[0].NEED_NAME;
                    this.shareText = Globalvar.WebUrl + this.router.url;
                    this.shareMedia = nds[0].NEED_THUMBNAIL_ACTUAL_IMAGE_FILEPATH;
                    this.needShareDropdownF(this.shareTitle, this.shareText, this.shareMedia);
                    //console.log("needShareDropdown")
                   
                    this.eachCommaSeparater();
                    if (this.DONORID) {
                        this.GetCartNeedItem();
                    }
                    var thisO = this
                    setTimeout(() => {
                        if ($(".CalcDonateAmount").length < 1) {
                            thisO.DonateBtnActive = false
                        }
                    }, 300);

                }
            } else {
                this.router.navigate(['/donate']);
            }
        });
    }
    needShareDropdownF(title, text, media) {
        // console.log(title);
        // console.log(text);
        // console.log(media);
       
        var id = document.getElementById('shareButton');
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

    GetTMNeedId(TMNeedId) {
        this.tmNs.GetTMNeedId(TMNeedId).subscribe((tsNds) => {
            if (tsNds.length >= 0) {
                this.tsNds = tsNds;
                if (this.tsNds.length <= 3) {
                    $('.TestimonialsWapper').find('.hleftRs').hide();
                    $('.TestimonialsWapper').find('.hrightRs').hide();
                }
                this.SlickSliderTestimonials()
                this.divEqualheight();
            }
        });
    }
    GetSStoriesId(SSId) {
        this.ssNd.GetSStoriesId(SSId).subscribe((data) => {
            if (data.length >= 0) {
                var newData = []
                data.forEach(element => {
                    if (element.SUPPORTING_DOCUMENT_TYPE_1 !== 'Link') {
                        newData.push(element)
                    }
                });
                this.ssNds = newData;
                this.SlickSliderSuccessStories()
                this.divEqualheight()
                //console.log("Success Stories", this.ssNds);
            }
        });
    }

    GetSimilarNeeds(SNeedId) {
        this.sNds.GetSimilarNeedsMyWorld(SNeedId).subscribe((sNeeds) => {
            if (sNeeds.length > 0) {
                var needData = []
                sNeeds.forEach(element => {
                    if (element.SHOW_IN_WEBSITE === 1) {
                        needData.push(element)
                    }
                });
                this.SimilarNeeds = needData
                console.log('SimilarNeeds', this.SimilarNeeds);
                this.SlickSliderSimilarNeeds();
                this.divEqualheight();
                this.eachCommaSeparater();
            }

        });
    }

    public TAGIDs;
    public TAGIDsInComa: String;

    GetNeedTagId(NId) {
        this.ndTagM.GetNeedTagId(NId).subscribe((NdTagMap) => {
            if (NdTagMap.length >= 0) {
                this.NdTagMap = NdTagMap;

                NdTagMap.map(item => {
                    return item.TAGID
                }).forEach(item => ArrayTAGID.push(item));
                this.TAGIDsInComa = ArrayTAGID.join(",");
                //console.log(this.NdTagMap);
                //console.log(this.TAGIDsInComa);
                //this.GetSimilarNeeds(this.TAGIDsInComa);
            }
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
    public SaveCWithUsOnSuccess = false
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
        // if (this.DONORID > 0) {
        this.GetState()
        this.modalService.open(content, { backdropClass: 'light-blue-backdrop', windowClass: 'cwus-modal CWUSWapper' }).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
        this.SaveCWithUsOnSuccess = false
        // } else {
        //alert('Please Login')
        //     document.getElementById("signupBtn").click()
        // }
    }


    SaveCWithUs(ngForm) {
        this.formSubmitAttempt = true;
        if (ngForm.valid) {
            this.spinner.show();
            var body = {
                'NEEDID': this.needIDComment,
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
                    $('.ConnectWithUsThankU').html("All ready you connect with us");
                }
                this.CWUS_FILE_NAME = "";
                this.CWUS_FILE_PATH = "";
                $('.nameuploadfile').empty().html("Upload Company Logo");
                ngForm.reset();
                this.spinner.hide();
            });
        }
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


    public clp = "";

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

    convertTDate(str) {
        var mnths = {
            Jan: "01", Feb: "02", Mar: "03", Apr: "04", May: "05", Jun: "06",
            Jul: "07", Aug: "08", Sep: "09", Oct: "10", Nov: "11", Dec: "12"
        },
            date = String(str).split(' ');

        return [date[3], mnths[date[1]], date[2]].join("-");
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



    SaveSocialDonation(ngForm) {
        this.formSubmitAttempt = true;
        if (ngForm.valid) {
            var body = {
                'NEEDID': this.needIDComment,
                'DONORID': this.CartDonorID,
                'EMAILID': this.SD_EMAILID,
                'CONTACT_NUMBER': this.SD_CONTACT_NUMBER,
                'CONTACT_PERSON': this.SD_CONTACT_PERSON,
                'MESSAGE': this.SD_MESSAGE,
                'STATUS': ''
            };
            //console.log("ConnectNowSocial", body);
            this.http.post(Globalvar.ApiUrl + "/PostNeedsConnectNowSocial", body).subscribe((data) => {
                //console.log("ConnectNowSocial",data)
                if (data[0].STATUSES[0].ResultId > 0) {
                    $('.ConnectWithUsThankU').show();
                    $('.ConnectWithUs').hide();
                    this.SD_EMAILID = ''
                    this.SD_CONTACT_NUMBER = ''
                    this.SD_CONTACT_PERSON = ''
                    this.SD_MESSAGE = ''
                    ngForm.reset();
                } else {
                    $('.ConnectWithUsThankU').show();
                    $('.ConnectWithUs').hide();
                    this.SD_EMAILID = ''
                    this.SD_CONTACT_NUMBER = ''
                    this.SD_CONTACT_PERSON = ''
                    this.SD_MESSAGE = ''
                    ngForm.reset();
                }
            });
        }

    }

    SlickSliderSimilarNeeds() {
        setTimeout(function () {
            $('.SimilarNeedsSlider').not('.slick-initialized').slick({
                dots: false,
                infinite: false,
                centerMode: false,
                speed: 300,
                slidesToShow: 3,
                slidesToScroll: 3,
                responsive: [
                    {
                        breakpoint: 1024,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 3,
                            infinite: true,
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
        }, 480)
        setTimeout(function () {
            $('.imgSlider').not('.slick-initialized').slick({
                arrows: false,
                dots: true,
                infinite: true,
                speed: 300,
                slidesToShow: 1,
                slidesToScroll: 1,
                adaptiveHeight: true
            });
        }, 1000)

    }
    SlickSliderTestimonials() {
        setTimeout(function () {
            $('.Testimonials').not('.slick-initialized').slick({
                dots: false,
                infinite: false,
                centerMode: false,
                speed: 300,
                slidesToShow: 3,
                slidesToScroll: 3,
                responsive: [
                    {
                        breakpoint: 1024,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 3,
                            infinite: true,
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
        }, 480)

    }
    SlickSliderSuccessStories() {
        setTimeout(function () {
            $('.SuccessStories').not('.slick-initialized').slick({
                dots: false,
                infinite: false,
                centerMode: false,
                speed: 300,
                slidesToShow: 3,
                slidesToScroll: 3,
                responsive: [
                    {
                        breakpoint: 1024,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 3,
                            infinite: true,
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
        }, 480)

    }
    SlickSliderLargeNeedlider() {
        setTimeout(function () {
            $('.LargeNeedlider').not('.slick-initialized').slick({
                dots: false,
                infinite: false,
                centerMode: false,
                speed: 300,
                slidesToShow: 2,
                slidesToScroll: 2,
                responsive: [
                    {
                        breakpoint: 1024,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 2,
                            infinite: true,
                            dots: true
                        }
                    },
                    {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1
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
        }, 480)

    }
    SlickSliderIndividualNeeds() {
        setTimeout(function () {
            $('.IndividualNeeds').not('.slick-initialized').slick({
                dots: false,
                infinite: false,
                centerMode: false,
                speed: 300,
                slidesToShow: 2,
                slidesToScroll: 2,
                responsive: [
                    {
                        breakpoint: 1024,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 2,
                            infinite: true,
                            dots: true
                        }
                    },
                    {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1
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
        }, 480)

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

    uploadLogoFile() {

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
        }, 300)

    }
    eachCommaSeparater() {
        setTimeout(function () {
            $('.typeNumberOnly').each(function (index, element) {
                var $this = $(this);
                var input = $this.val();
                var input = input.replace(/[\D\s\._\-]+/g, "");
                input = input ? parseInt(input, 10) : 0;
                $this.val(function () {
                    return (input === 0) ? "" : input.toLocaleString("en-US");
                });
            });
        }, 500);
    }


    RunOnInit() {

        this.needID = this.activeRoute.snapshot.paramMap.get('id');
        
        $(".SuccessStories, .Testimonials, .SimilarNeedsSlider, .LargeNeedlider, .IndividualNeeds, .imgSlider").each(function () {
            if ($(this).hasClass("slick-initialized")) {
                $(this).slick('unslick');
            }
        })

        this.commaSeparater();
        this.GetFactsFigures();
        this.CartDonorID = Globalvar.getDonorId()
        this.DONORID = Globalvar.getDonorId()

        $(document).on('keydown', '.typeNumberOnly', function (e) { -1 !== $.inArray(e.keyCode, [46, 8, 9, 27, 13]) || /65|67|86|88/.test(e.keyCode) && (!0 === e.ctrlKey || !0 === e.metaKey) || 35 <= e.keyCode && 40 >= e.keyCode || (e.shiftKey || 48 > e.keyCode || 57 < e.keyCode) && (96 > e.keyCode || 105 < e.keyCode) && e.preventDefault() });

        this.getCookie();
        this.AddClass(this.clp);

        this.GetTMNeedId(this.needID);
        this.GetSStoriesId(this.needID);
        this.GetNeedTagId(this.needID);
        this.GetSimilarNeeds(this.needID);

        this.anchorControl()
        if (this.isBrowser) {
            $(document).ready(function (e) {
                var svgAnimation = setInterval(function () {
                    if ($("#svgCircleHeight").height() > 0) {
                        var attr = $(".svgCircle").find(".firstCrrcl").attr('stroke-width');
                        if (typeof attr !== typeof undefined && attr !== false) {
                            clearInterval(svgAnimation)
                        } else {
                            setCircle()
                        }
                    }
                }, 500)


                var wWidth = $(window).width()
                $(window).on("load resize", function (e) {
                    if (wWidth !== $(window).width()) {
                        setCircle()
                        wWidth = $(window).width()
                    }
                });
            });
        }


        function setCircle() {
            var cH, C_Center, c_Stroke, c_Redius, circumference, progress, half_Stroke, Animation = 0;
            $(".circle").each(function (index, element) {
                c_Stroke = 24;
                half_Stroke = (c_Stroke / 2)
                cH = Math.floor($(this).height());
                C_Center = cH / 2;
                c_Redius = Math.floor(C_Center - half_Stroke)
                circumference = Math.floor(3.14 * (c_Redius * 2))
                $(this).find("circle").attr('cx', C_Center).attr('cy', C_Center).attr('r', c_Redius).attr('stroke-width', c_Stroke).attr('stroke-dasharray', circumference).attr('stroke-dashoffset', 0)
                $(this).find(".prg").animate({ 'stroke-dashoffset': circumference }, 1)
            });

            $(".svgCircle").addClass("active")
            animateCircle()
            $(window).scroll(function (e) {
                animateCircle()
            });

            function animateCircle() {
                if ($(".svgCircle").length > 0) {
                    var objTop = $(".svgCircle").offset().top + $(".svgCircle").height()
                    var pageTop = $(window).scrollTop() + $(window).height()

                    if (objTop < pageTop) {
                        if (Animation == 0) {
                            if ($(".svgCircle").hasClass("active")) {
                                $(".svgCircle").removeClass("active")
                                $(".circle").each(function (index, element) {
                                    cH = $(this).height();
                                    C_Center = cH / 2;
                                    half_Stroke = (c_Stroke / 2)
                                    c_Redius = C_Center - half_Stroke
                                    circumference = 3.14 * (c_Redius * 2)

                                    progress = circumference - (circumference * $(".cIcon" + (index + 1)).text() / 100)
                                    $(this).find(".prg").animate({ 'stroke-dashoffset': progress }, 2000)
                                })
                                $(".circleIcon").each(function (index, element) {
                                    var prog = 360 / 100 * parseInt($(this).text())
                                    $(this).css({ 'transform': 'rotate(' + prog + 'deg)' })
                                });
                            }
                            Animation = 1;
                        }
                    }
                }
            }

        }

        this.largeNeedCarausal = {
            grid: { xs: 1, sm: 2, md: 2, lg: 2, all: 0 },
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
            touch: false,
            loop: true,
            custom: 'banner'
        }


        this.SNeedsCarausal = {
            grid: { xs: 1, sm: 2, md: 2, lg: 2, all: 0 },
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
            touch: false,
            loop: true,
            custom: 'banner'
        }

        if (this.DonateAmountIDBeforeLogin) {
            this.DonateNow('CalcDonateAmount')
        }
        if (this.FundraisBtnClick) {
            this.postFundraising(this.FundraisID)
        }

    }



    private carouselToken: string;
    ngOnInit() {

        this.needID = this.activeRoute.snapshot.paramMap.get('id');
        this.GetNeeds(this.needID);
        
        Globalvar.donorIdChanged.subscribe(
            (id: number) => {
                this.DONORID = id;
                this.CartDonorID = id
                this.RunOnInit()
            }
        );

    }
    ngAfterViewChecked() {


    }
    anchorControl() {
        $(document).on("click", ".anchorTab", function () {
            //console.log("anchorControl")
            var targetDiv = $(this).attr("data-scroll")
            $('body,html').animate({
                scrollTop: $("." + targetDiv).offset().top - 70
            }, 1000);
        })
    }


    ngAfterViewInit() {
        if ($(".PageName").length > 0) {
            $('body,html').animate({
                scrollTop: $(".PageName").offset().top - 90
            }, 1000);
        }

        $(document).ready(function () {
            $('#UserAgent').val(navigator.userAgent);
            // alert($('#UserAgent').val())
            $.getJSON("https://jsonip.com/?callback=?", function (data) {
                $('#ipAddress').val(data.ip);
            });
            checkBoxStyle();
            setTimeout(function () {
                needGallery();
                clacDA();
            }, 1000);
        });

    }
    onmoveFn(data: NguCarouselStore) {
        //console.log(data);
    }
    entryDate(datetime) {
        var eDate = new Date(datetime);
        var eGetDate = eDate.getDate();
        return eGetDate
    }
    entryMonth(datetime) {
        var entDate = new Date(datetime);
        var month = new Array();
        // month[0] = "January"; month[1] = "February"; month[2] = "March"; month[3] = "April"; month[4] = "May"; month[5] = "June";
        // month[6] = "July"; month[7] = "August"; month[8] = "September"; month[9] = "October"; month[10] = "November"; month[11] = "December";
        month[0] = "Jan"; month[1] = "Feb"; month[2] = "Mar"; month[3] = "Apr"; month[4] = "May"; month[5] = "Jun";
        month[6] = "Jul"; month[7] = "Aug"; month[8] = "Sep"; month[9] = "Oct"; month[10] = "Nov"; month[11] = "Dec";
        var eMonthName = month[entDate.getMonth()];
        return eMonthName
    }

    selectCtrl() {
        $(function () {
            $(".selectCtrl").each(function () {
                $(this).siblings(".selectVal").text($(":selected", this).val())
                $(this).change(function (e) {
                    $(this).siblings(".selectVal").text($(":selected", this).val())
                });
            })
        })
        setTimeout(function () {
            $(".frequency").each(function () {
                var thisID;
                if ($(this).attr("name")) {
                    thisID = $(this).attr("name")
                    var NewthisID = thisID.toString().replace(/\D/g, '');
                    $("#need" + NewthisID).val($(":selected", this).val())
                    $("#actualA" + NewthisID).val($(":selected", this).val())
                }
                $(this).change(function () {
                    thisID = $(this).attr("name")
                    var NewthisID = thisID.toString().replace(/\D/g, '');
                    $("#need" + NewthisID).val($(":selected", this).val())
                    $("#actualA" + NewthisID).val($(":selected", this).val())
                })
            })
        }, 200)
    }
    getVideoId(url) {
        var url = url;
        //var videoid = url.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
        var videoid = url.match(/(?:youtube(?:-nocookie)?\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
        if (videoid != null) {
            return videoid[1];
        } else {
            //console.log("The youtube url is not valid.");
        }
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
        }, 500)
    }
    convertToDate(str) {
        var mnths = {
            Jan: "01", Feb: "02", Mar: "03", Apr: "04", May: "05", Jun: "06",
            Jul: "07", Aug: "08", Sep: "09", Oct: "10", Nov: "11", Dec: "12"
        },
            date = String(str).split(' ');
        return [date[3], mnths[date[1]], date[2]].join("-");
    }
    // CalculateRemaingAmt(NEED_AMOUNT, ADMINISTRATION_CHARGES) {
    //     return (NEED_AMOUNT - ADMINISTRATION_CHARGES).toFixed(2);
    //   };

    //   CalculatePercentage(NEED_AMOUNT, ADMINISTRATION_CHARGES) {
    //     if (NEED_AMOUNT == 0 || NEED_AMOUNT == undefined) {
    //       return 0;
    //     } else {
    //       return Math.round((100 - (((NEED_AMOUNT - ADMINISTRATION_CHARGES) / NEED_AMOUNT) * 100)));
    //     }
    //   };

    public pclp;
    ProgressPErcentage(DONATION_AMOUNT, NEED_AMOUNT) {
        this.pclp = ((DONATION_AMOUNT / NEED_AMOUNT) * 100).toFixed(0);
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

    getScreen(url, size) {
        url = this.getVideoId(url);
        if (url === null) {
            return "";
        }
        size = (size === null) ? "big" : size;
        var vid, results;
        results = url.match("[\\?&]v=([^&#]*)");
        vid = (results === null) ? url : results[1];
        if (size == "small") {
            return "http://img.youtube.com/vi/" + vid + "/2.jpg";
        } else {
            return "http://img.youtube.com/vi/" + vid + "/1.jpg";
        }
    }

    smoothScrollingTo(targetHref) {
        var target = $(targetHref);
        if (target.length) {
            event.preventDefault();
            $('html, body').stop().animate({
                scrollTop: target.offset().top
            }, 1000);
        }
    }

}


function PagerNav() {
    setTimeout(function () {
        $('#Supporters').cPager({
            pageSize: 4,
            pageIndex: 1,
            pageid: "pager",
            itemClass: "DataWapper"
        });
        $('#Campaigner').cPager({
            pageSize: 4,
            pageIndex: 1,
            pageid: "CamPager",
            itemClass: "CamDataWapper"
        });
    }, 200);
}
function needGallery() {
    $('.needGallery').not('.slick-initialized').slick({
        centerMode: true,
        centerPadding: false,
        slidesToShow: 2,
        slide: '.galleryImgBox',
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: false,
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: false,
                    slidesToShow: 1
                }
            }
        ]
    });
}
function PartnersSlider() {
    setTimeout(function () {
        $(".PartnersSlider").removeClass("slick-slider").removeClass("slick-initialized").removeClass("slider");
        $('.PartnersSlider').not('.slick-initialized').slick({
            slidesToShow: 2,
            slide: '.item',
            arrows: true,
            responsive: [
                {
                    breakpoint: 768,
                    settings: {
                        arrows: false,
                        slidesToShow: 2
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        arrows: false,
                        slidesToShow: 1
                    }
                }
            ]
        });
    }, 500);
}
function clacDA() {
    $('.sctrls').each(function () {
        calcDAMout($(this))
        $(this).change(function () {
            calcDAMout($(this))
        })
        function calcDAMout(thisO) {
            var DAmout = thisO.parents('.selectedWrp').find('.NEED_AMOUNT').text();
            var thisval = thisO.val();
            //console.log("Amount:"+DAmout+" THis: "+thisval);
            thisO.parents('.selectedWrp').find('.CalcDonateAmount').val(DAmout * thisval);
        }
    })
}
function checkBoxStyle() {

    $(".BtnBox.plus").click(function () {
        $(".AdvanceFilter").slideDown();
        $(".BtnBox.plus").fadeOut("fast");
    });
    $(".BtnBox.minus").click(function () {
        $(".AdvanceFilter").slideUp();
        $(".BtnBox.plus").fadeIn("fast");
    });

    $(".filterBTN").click(function () {
        $(".filterWapper").slideToggle();

        $(".filterBTN").toggleClass("CloseBTN");
    });

    $(".selectCtrl").each(function (index, element) {
        var val = $(this).find("select").val();
        if (!$(this).parents().hasClass("selectWrap")) {
            $(this).wrap('<div class="selectWrap">').before('<div class="selectVal">' + val)
        }
        $(this).siblings(".selectVal").text($(":selected", this).val())
        $(this).change(function (e) {
            $(this).siblings(".selectVal").text($(":selected", this).val())
        });
    });
}
function getScreen(url, size) {
    if (url === null) {
        return "";
    }
    size = (size === null) ? "big" : size;
    var vid, results;
    results = url.match("[\\?&]v=([^&#]*)");
    vid = (results === null) ? url : results[1];
    if (size == "small") {
        return "http://img.youtube.com/vi/" + vid + "/2.jpg";
    } else {
        return "http://img.youtube.com/vi/" + vid + "/0.jpg";
    }
    /* imgUrl_big   = getScreen("uVLQhRiEXZs"); 
    imgUrl_small = getScreen("uVLQhRiEXZs", 'small'); */
}
