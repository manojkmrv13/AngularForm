import { Component, OnInit } from '@angular/core';
import { needsService } from '../../services/needs.service';
import { CorporateTieUpsService } from '../../services/corporate-tie-ups.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Globalvar } from '../../classes/globalvar';
import { HttpClient } from '@angular/common/http';
import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { StateCityService } from '../../services/state-city.service';
import { ConnectnowService } from '../../services/connectnow.service';
import { Title, Meta} from '@angular/platform-browser';


declare var $: any;
@Component({
  selector: 'app-corporate-tie-ups',
  templateUrl: './corporate-tie-ups.component.html',
  styleUrls: ['./corporate-tie-ups.component.css']
})
export class CorporateTieUpsComponent implements OnInit {

  public title = "HoSh - Corporate Partnerships";
  public description = "HoSh has corporate partnerships with several domestic and international corporations whose donations and contributions help us serve the needy in a better way.";

  constructor(
    private titleService: Title, 
    private metaService: Meta,
    private need: needsService,
    private corporateTieUps: CorporateTieUpsService,
    private spinner: NgxSpinnerService,
    private http: HttpClient,
    private modalService: NgbModal,
    private StateCity: StateCityService,
    private nsf: ConnectnowService,
  ) { }


  public DONORID;

  public SimilarStories = []
  public TOTAL_NEED_AMOUNT_FOR_LARGE_NEED: number;
  public DONATION_AMOUNT_FOR_LARGE_NEED: number;
  public DAYS_LEFT_FOR_LARGE_NEED: number;
  GetSimilarStories() {
    this.need.getNeeds("", "", "", "", "", "", "", "", "", 2, "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "").subscribe((needData) => {
      var corporateNeedData = []
      needData.forEach(element => {
        element.NEEDS_CHILD.forEach(element1 => {
          this.TOTAL_NEED_AMOUNT_FOR_LARGE_NEED = 0;
          this.DONATION_AMOUNT_FOR_LARGE_NEED = 0;
          this.DAYS_LEFT_FOR_LARGE_NEED = 0;
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

        });
        corporateNeedData.push(element)
      });
      this.SimilarStories = corporateNeedData
      //console.log("Similar Stories } ", this.SimilarStories)
      this.slickSlider()
      this.divEqualheight()
    })
  }

  public CorporateTieUpsData = [];
  public ActiveClientData = []
  GetCorporateTieUpsData() {
    this.corporateTieUps.GetCorporateTieUps().subscribe((data) => {
      this.CorporateTieUpsData = data
      //console.log("CorporateTieUpsData ", this.CorporateTieUpsData)
      data.forEach(element => {
        if (element.PARTNERID == data[0].PARTNERID) {
          this.ActiveClientData.push(element)
        }
      });
      //console.log("ActiveClientData", this.ActiveClientData)
    })
  }

  public needIDComment;
  closeResult: string;
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
  public CartDonorID;
  public SD_EMAILID;
  public SD_CONTACT_NUMBER;
  public SD_CONTACT_PERSON;
  public SD_MESSAGE;

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
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
  movies = [
    'Episode I - The Phantom Menace',
    'Episode II - Attack of the Clones',
    'Episode III - Revenge of the Sith',
    'Episode IV - A New Hope',
    'Episode V - The Empire Strikes Back',
    'Episode VI - Return of the Jedi',
    'Episode VII - The Force Awakens',
    'Episode VIII - The Last Jedi'
  ];
  public SaveCWithUsOnSuccess = false
  SaveCWithUs(ngForm) {
    this.formSubmitAttempt = true;
    if (ngForm.valid) {
      this.spinner.show();
      var body = {
        'NEEDID': -1,
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

  ActiveClient(PARTNERID) {
    this.ActiveClientData = []
    var data = []
    this.CorporateTieUpsData.forEach(element => {
      if (element.PARTNERID == PARTNERID) {
        this.ActiveClientData.push(element)
        data.unshift(element)
      } else {
        data.push(element)
      }
    });
    this.CorporateTieUpsData = data
    //console.log("this.CorporateTieUpsData =", this.CorporateTieUpsData)
  }
  divEqualheight() {
    setTimeout(function () {
      $(".sameHeightWrap").each(function () {
        $(this).find(".sameHeight").css("height", "auto");
        var maxHeight = 0;
        $(this).find(".sameHeight").each(function () {
          if ($(this).height() > maxHeight) { maxHeight = $(this).height(); }
        });
        //alert(maxHeight)
        $(this).find(".sameHeight").height(maxHeight)
      })
    }, 400)
  }

  slickSlider() {
    setTimeout(function () {
      $('.SimilarStories').slick({
        dots: false,
        infinite: false,
        arrows: true,
        touchMove: false,
        swipeToSlide: false,
        swipe: false,
        speed: 300,
        slidesToShow: 3,
        slidesToScroll: 3,
        responsive: [
          {
            breakpoint: 991,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              infinite: false,
              dots: false
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }

        ]
      });

    }, 300)

    setTimeout(function () {
      $('.imgSlider').not('.slick-initialized').slick({
        arrows: false,
        dots: true,
        infinite: false,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: true
      });
    }, 1000)
  }

  CalculatePercentage(NEED_AMOUNT, ADMINISTRATION_CHARGES) {
    if (NEED_AMOUNT == 0 || NEED_AMOUNT == undefined) {
      return 0.00;
    } else {
      return Math.round((100 - (((NEED_AMOUNT - ADMINISTRATION_CHARGES) / NEED_AMOUNT) * 100)));
    }
  };

  convertToDate(str) {
    var mnths = {
      Jan: "01", Feb: "02", Mar: "03", Apr: "04", May: "05", Jun: "06",
      Jul: "07", Aug: "08", Sep: "09", Oct: "10", Nov: "11", Dec: "12"
    },
      date = String(str).split(' ');
    return [date[3], mnths[date[1]], date[2]].join("-");
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
  ngOnInit() {

    this.titleService.setTitle(this.title);
    this.metaService.updateTag({name:'title', content:this.title});
    this.metaService.updateTag({name:'description', content:this.description});
    this.metaService.updateTag({name:'twitter:title', content:this.title});
    this.metaService.updateTag({name:'twitter:description', content:this.description});
    this.metaService.updateTag({property:'og:title', content:this.title});
    this.metaService.updateTag({property:'og:description', content:this.description});

    this.DONORID = Globalvar.getDonorId()
    this.GetSimilarStories()
    this.GetCorporateTieUpsData()
    Globalvar.donorIdChanged.subscribe(
      (id: number) => {
        this.DONORID = id;
        this.CartDonorID = id
      }
    );
  }

}
