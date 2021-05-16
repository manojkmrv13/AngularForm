import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { needsService } from '../../services/needs.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { isPlatformBrowser } from '@angular/common';
declare var $: any;
@Component({
  selector: 'app-needs',
  templateUrl: './needs.component.html',
  styleUrls: ['./needs.component.css']
})
export class NeedsComponent implements OnInit {
  public homePageNeedsList = [];
  isBrowser: boolean;
  constructor(private homePageNeeds: needsService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }
  defaultImage = '../assets/images/image_not_available.jpg';
  GetNeedItem() {
    ////  console.log("Done Slider")
  }


  public ComplitetNeeds = [];
  public UrgentNeeds = [];
  public PageNo = 1
  Get_ComplitetNeeds(StatusInformation) {
    this.homePageNeeds.GetComplitetNeeds("", "", StatusInformation, this.PageNo).subscribe((ComplitetNeedsData) => {
      // var tenComplitedNeed = []
      // var totalNeeds = ComplitetNeedsData.length
      // if(totalNeeds > 10){
      //   for(var i = 0; i < 10; i++){
      //     tenComplitedNeed.push(ComplitetNeedsData[i])
      //   }
      // }else{
      //   tenComplitedNeed = ComplitetNeedsData
      // }   

      this.ComplitetNeeds = ComplitetNeedsData;
      //  console.log(" ComplitetNeeds = ", this.ComplitetNeeds)
      if (this.isBrowser) {
        this.slickComplitetNeeds();
      }

    });
  }

  GetUrgentNeeds(Priority) {
    this.homePageNeeds.GetUrgentNeeds(Priority).subscribe((UrgentNeedsData) => {
      this.UrgentNeeds = UrgentNeedsData;
        //console.log(" Urgent Needs = ", UrgentNeedsData)
      if (this.isBrowser) {
        this.slickSliderUrgent(UrgentNeedsData.length);
      }
    });
  }

  GetHomePageNeeds() {
    this.homePageNeeds.getNeedsHomePage().subscribe((needList) => {
      var needType = [];
      var needSliders = []
      needList.forEach(element => {
        needType.push(element.NEEDTYPE)
      });
      needType = Array.from(new Set(needType));

      needType.forEach(element => {
        var newSetArray = [];
        needList.forEach(need => {
          if (element == need.NEEDTYPE) {
            if (newSetArray.length < 6) {
              newSetArray.push(need)
              if (newSetArray.length == 6) {
                BreakpointObserver;
              }
            }
          }
        });
        needSliders.push({
          NEEDTYPE: element,
          CHILD_ITEM: newSetArray
        })
      });
      needSliders.forEach(element => {
        if (element.CHILD_ITEM.length > 4) {
          this.homePageNeedsList.push(element)
        }
      });
      if (this.isBrowser) {
        this.SlickSlider();
        this.GetNeedSlider();

        //console.log("homePageNeedsList == ", this.homePageNeedsList)     

        setTimeout(this.divEqualheight, 3000)
      }
      console.log(needSliders);

    })
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
  convertToDate(str) {
    var mnths = {
      Jan: "01", Feb: "02", Mar: "03", Apr: "04", May: "05", Jun: "06",
      Jul: "07", Aug: "08", Sep: "09", Oct: "10", Nov: "11", Dec: "12"
    },
      date = String(str).split(' ');
    return [date[3], mnths[date[1]], date[2]].join("-");
  }

  divEqualheight() {
    setTimeout(() => {
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

  CalculatePercentage(NEED_AMOUNT, ADMINISTRATION_CHARGES) {
    if (NEED_AMOUNT == 0 || NEED_AMOUNT == undefined) {
      return 0;
    } else {
      return Math.round((100 - (((NEED_AMOUNT - ADMINISTRATION_CHARGES) / NEED_AMOUNT) * 100)));
    }
  };

  // ShortDiscription() {
  //   setTimeout(() => {
  //     $(".shortDiscription").each(() => {
  //       var newHeight = $(this).position().top + 14
  //     })
  //   }, 1000)
  // }

  GetNeedSlider() {

    setTimeout(() => {
      $(".rxSlider").each(function (index, element) {
        var thisSlidWrap = $(this).find(".rxSliderWrapper")

        $(this).find(".rxSlide:last-child").prependTo(thisSlidWrap).addClass("fade")
        $(this).find(".rxSlide").eq(1).addClass("active")
        $(this).find(".rxSlide").eq(2).addClass("active1")
        $(this).find(".rxSlide").eq(3).addClass("active2")
        $(".rxSliderBtn").click(function (e) {
          var thisS = $(this).parents(".rxSlider")
          var thisWrap = thisS.find(".rxSliderWrapper")
          var thisO = $(this);
          if (!$(this).hasClass("dissable") && $(this).hasClass("rxNext")) {
            thisO.addClass("dissable")
            thisS.find(".rxSlide.active1").prev().removeClass("active").addClass("fade")
            thisS.find(".rxSlide.active1").addClass("active").removeClass("active1").next().addClass("active1").removeClass("active2")
            thisS.find(".rxSlide.active1").next().addClass("active2")
            setTimeout(() => {
              thisS.find(".rxSlide:first-child").removeClass("fade").appendTo(thisWrap)
              thisO.removeClass("dissable")
            }, 400);
          } else if (!$(this).hasClass("dissable")) {
            thisO.addClass("dissable")
            thisS.find(".rxSlide.active2").removeClass("active2")
            thisS.find(".rxSlide.active").removeClass("active").addClass("active1").prev().removeClass("fade").addClass("active")
            thisS.find(".rxSlide.active1").next().addClass("active2").removeClass("active1")
            thisS.find(".rxSlide:last-child").prependTo(thisWrap).addClass("fade")
            setTimeout(() => {
              thisS.find(".rxSlide").eq(4).removeClass("active2")
              thisO.removeClass("dissable")
            }, 400);
          }
        });
      });
    }, 1100)
  }

  slickComplitetNeeds() {
    setTimeout(() => {
      if ($(".CompletedNeedsSlider").length > 0) {
        $('.CompletedNeedsSlider').slick({
          dots: false,
          infinite: false,
          speed: 300,
          slidesToShow: 2,
          adaptiveHeight: true,
          arrows: true,
          responsive: [
            {
              breakpoint: 1000,
              settings: {
                centerMode: false,
                slidesPerRow: 1,
                slidesToShow: 1
              }
            }
          ]
        });
      }
    }, 200)
  }

  slickSliderUrgent(items) {
    setTimeout(() => {
      if (items < 4) {
        $(".UrgentNeedsSlider").addClass('TwoSlide')
      }
      $('.UrgentNeedsSlider').slick({
        centerMode: true,
        arrows: true,
        infinite: false,
        asNavFor: '.UrgentNeedsContaineBox',
        centerPadding: '5px',
        autoplaySpeed: 2000,
        autoplay: false,
        slidesToShow: items > 3 ? 3 : 1,
        slidesToScroll: 1,
        focusOnSelect: true,
        responsive: [{
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
        ]
      });

      $('.UrgentNeedsContaineBox').slick({
        slidesToShow: 1,
        touchMove: false,
        swipeToSlide: false,
        infinite: false,
        asNavFor: '.UrgentNeedsSlider',
        swipe: false,
        slidesToScroll: 1,
        arrows: false
      });
    }, 200)
  }

  SlickSlider() {
    setTimeout(() => {
      $('.MainNeedSlider').slick({
        dots: true,
        infinite: false,
        arrows: false,
        speed: 300,
        autoplay: false,
        slidesToShow: 3,
        slidesToScroll: 3,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: false,
              dots: false
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
            breakpoint: 500,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      });
    }, 1000)
  }

  ngOnInit() {
    this.GetHomePageNeeds();
    this.Get_ComplitetNeeds('Donation Completed');
    this.GetUrgentNeeds('Urgent')
    //this.setBacground()

  }
  // setBacground() {
  //   $(document).ready(function () {
  //     var top_header = $('.UrgentNeedsBox');
  //     top_header.css({ 'background-position': 'center center' }); // better use CSS


  //     $(window).scroll(function () {        
  //       var st = $(this).scrollTop();
  //       var offsetTop = $(this).offsetTop
  //       top_header.css({ 'background-position': 'center calc(50% + ' + (st * .5) + 'px)' });
  //       console.log(st , offsetTop)
  //     });
  //   });
  //   //$(document).ready(function(){ 

  //   // $(window).scroll(function() {
  //   //   var x = $('.UrgentNeedsBox').scrollTop();
  //   //   console.log(x)
  //   // })   
  //   //   $('.UrgentNeedsBox').scroll(function() {
  //   //     var x = $(this).scrollTop();
  //   //     console.log(x)
  //   //    // $(this).css('background-position', '0% ' + parseInt(-x / 10) + 'px');
  //   // });
  //   //})

  // }

}
