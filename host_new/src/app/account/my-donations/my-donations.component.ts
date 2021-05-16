import { Component, OnInit, NgZone, ElementRef } from '@angular/core';
import { DonorDonationsDetailsService } from '../../services/donor-donations-details.service';
import { DonorDonationsService } from '../../services/donor-donations.service';
import { Globalvar } from '../../classes/globalvar';
import { SimilarNeedsService } from '../../services/similar-needs.service';
import { Router } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-my-donations',
  templateUrl: './my-donations.component.html',
  styleUrls: ['./my-donations.component.css']
})
export class MyDonationsComponent implements OnInit {
  defaultImage = '../assets/images/image_not_available.jpg';
  constructor(
    public router: Router,
    private DonorDonationsDtl: DonorDonationsDetailsService,
    private DDonations: DonorDonationsService,
    private SimilarNeeds: SimilarNeedsService,
    private _ngZone: NgZone
  ) {
    window['hoshDataRef'] = { component: this, zone: _ngZone };
  }

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

  public DonorID;


  public AllDonatedNeeds = [];
  public InProcessNeeds = [];
  public CompletedNeeds = [];

  public AllDonatedSNIds = []
  public CompletedSNIds = []
  public InProcessSNIds = []

  public countItem = 0
  GetDonorDonationsDetail(DonorID: number) {
    var count = 0;
    if (DonorID > 0) {
      this.DonorDonationsDtl.GetDonorDonationsDetails_AllDonated(DonorID).subscribe((AllDonatedData) => {
        if (AllDonatedData.length > 0) {
          this.countItem++
          var SN_Ids = []
          AllDonatedData.forEach(element => {
            SN_Ids.push(element.NEEDID)
          });
          //console.log("ids ", SN_Ids)
          if (SN_Ids.length > 0) {
            this.SimilarNeeds.GetSimilarNeedsMyWorld(SN_Ids).subscribe((SimilarNeedsData) => {
              if (SimilarNeedsData.length > 0) {
                var needData = []
                SimilarNeedsData.forEach(element => {
                  if (element.SHOW_IN_WEBSITE = 0) {
                    needData.push(element)
                  }
                });
                this.AllDonatedSNIds = needData
                //console.log("AllDonatedSNIds", this.AllDonatedSNIds)
                count++
              } else {
                this.countItem--
              }
              this.setSimilarNeedSlider(count)
            })
            this.AllDonatedNeeds = AllDonatedData
            //console.log("AllDonated Needs", this.AllDonatedNeeds)
          }
        }
      })

      this.DonorDonationsDtl.GetDonorDonationsDetails_Completed(DonorID).subscribe((CompletedData) => {
        if (CompletedData.length > 0) {
          this.countItem++
          var SN_Ids = []
          CompletedData.forEach(element => {
            SN_Ids.push(element.NEEDID)
          });
          //console.log("C_ids ", SN_Ids)
          this.SimilarNeeds.GetSimilarNeedsMyWorld(SN_Ids).subscribe((SimilarNeedsData) => {
            if (SimilarNeedsData.length > 0) {
              var needData = []
              SimilarNeedsData.forEach(element => {
                if (element.SHOW_IN_WEBSITE = 0) {
                  needData.push(element)
                }
              });
              this.CompletedSNIds = needData
              //console.log("CompletedSNIds", this.CompletedSNIds)
              count++
            } else {
              this.countItem--
            }
            this.setSimilarNeedSlider(count)
          })
          this.CompletedNeeds = CompletedData
        }
      })

      this.DonorDonationsDtl.GetDonorDonationsDetails_InProcess(DonorID).subscribe((InProcessData) => {
        if (InProcessData.length > 0) {
          this.countItem++
          var SN_Ids = []
          InProcessData.forEach(element => {
            SN_Ids.push(element.NEEDID)
          });
          //console.log("IP_ids ", SN_Ids)
          this.SimilarNeeds.GetSimilarNeedsMyWorld(SN_Ids).subscribe((SimilarNeedsData) => {
            if (SimilarNeedsData.length > 0) {
              var needData = []
              SimilarNeedsData.forEach(element => {
                if (element.SHOW_IN_WEBSITE = 0) {
                  needData.push(element)
                }
              });
              this.InProcessSNIds = needData
              //console.log("InProcessSNIds", this.InProcessSNIds)
              count++
            } else {
              this.countItem--
            }
            this.setSimilarNeedSlider(count)
          })
          this.InProcessNeeds = InProcessData
        }
      })
    }
  }

  setSimilarNeedSlider(count: number) {
    var thisO = this
    //console.log("count", count, "countItem", this.countItem)
    if (count == this.countItem) {
      this.setSlickSlider()

    }
  }


  public Donations = []
  public AllDonated;
  public InProcess;
  public Completed
  GetDonorDonations(DonorID: any) {
    this.DDonations.GetDonorDonations(DonorID).subscribe((donations) => {
      this.Donations = donations;
      this.AllDonated = donations[0].ALL_DONATED_NEEDS;
      this.InProcess = donations[0].IN_PROCESS;
      this.Completed = donations[0].COMPLETED_NEEDS;
      //console.log("donations ==", this.AllDonated)
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
        //console.log("maxHeight", maxHeight)
      })
    }, 200)
  }

  setSlickSlider() {
    var thisO = this
    setTimeout(function () {
      $('.mtabData').slick({
        dots: false,
        infinite: false,
        touchMove: false,
        draggable: false,
        touchThreshold: false,
        swipeToSlide: false,
        swipe: false,
        slidesToShow: 1,
        adaptiveHeight: true,
        arrows: false,
      });

      $('.SimilarNeedsParent').slick({
        dots: false,
        infinite: false,
        touchMove: false,
        touchThreshold: false,
        slidesToShow: 1,
        adaptiveHeight: true,
        arrows: false
      });
      $('.SimilarNeeds').slick({
        dots: true,
        infinite: false,
        touchMove: false,
        touchThreshold: false,
        slidesToShow: 3,
        slidesToScroll: 3,
        adaptiveHeight: true,
        arrows: false,
        responsive: [
          {
            breakpoint: 991,
            settings: {
              centerMode: false,
              arrows: true,
              slidesToShow: 2,
              slidesToScroll: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              centerMode: false,
              arrows: true,
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      });

      setTimeout(function () {
        $('.imgSlider').slick({
          arrows: false,
          dots: true,
          infinite: false,
          speed: 300,
          slidesToShow: 1,
          slidesToScroll: 1,
          adaptiveHeight: true
        });
      }, 100)

      $(".MyDonationTAB").on('afterChange', function (event, slick, currentSlide) {
        var text = slick //$(slick.$slides[currentSlide]).data('formacion');

      });
      setTimeout(() => {
        $(".mtabData").find(".slick-list").css("height", "auto")
        thisO.divEqualheight()
      }, 100)

    }, 200)
  }


  public ChildSponsership
  ngOnInit() {

    this.DonorID = Globalvar.getDonorId();
    this.GetDonorDonations(this.DonorID)
    this.GetDonorDonationsDetail(this.DonorID)
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
    this.ChildSponsership = localStorage.getItem('ChildSponsership')
    $('.MyDonationTAB').slick({
      centerMode: false,
      focusOnSelect: true,
      infinite: false,
      dots: false,
      arrows: true,
      slidesToShow: 3,
      asNavFor: '.mtabData, .SimilarNeedsParent',
      responsive: [
        {
          breakpoint: 991,
          settings: {
            centerMode: false,
            arrows: true,
            slidesToShow: 2
          }
        },
        {
          breakpoint: 768,
          settings: {
            centerMode: false,
            arrows: true,
            slidesToShow: 1
          }
        }
      ]
    });

  }
  ngAfterViewInit() {


    //console.log("ngAfterViewInit")
  }

}
