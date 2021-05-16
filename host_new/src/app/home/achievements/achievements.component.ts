import { Component, OnInit, inject, PLATFORM_ID, Inject } from '@angular/core';
import { NguCarouselConfig, NguCarouselStore } from '@ngu/carousel';
import { AchievementsService } from '../../services/achievements.service';
import { HomepageFactsFiguresService } from '../../services/homepage-facts-figures.service';
import { isPlatformBrowser } from '@angular/common';

declare var $: any;
declare var setBars: any;
@Component({
  selector: 'app-achievements',
  templateUrl: './achievements.component.html',
  styleUrls: ['./achievements.component.css']
})
export class AchievementsComponent implements OnInit {
  isBrowser: boolean;
  defaultImage = '../assets/images/Loader.gif';
  public achivementConfig: NguCarouselConfig = {
    grid: { xs: 1, sm: 1, md: 1, lg: 1, all: 0 },
    slide: 1,
    speed: 400,
    //interval: 4000,
    point: {
      visible: true
    },
    load: 2,
    loop: false,
    touch: true
  };
  constructor(
    private achivement: AchievementsService,
    private getFactsFigures: HomepageFactsFiguresService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  public Achievements = [];
  public factsFigureData = [];
  public sectors = [];


  GetAchievement() {
    this.achivement.AchievementsService().subscribe((AchievementsData) => {
      var sectors = [];
      AchievementsData.forEach(element => {
        sectors.push(element.SECTOR)    // get SECTORS from AchievementsData
      });
      sectors = Array.from(new Set(sectors)); // remove duplicate arrays
      sectors.forEach(sectorName => {
        var newSetSector = [];
        AchievementsData.forEach(element => {
          if (sectorName == element.SECTOR)
            newSetSector.push(element)
        });
        this.Achievements.push({
          SECTOR: sectorName,
          SECTOR_ITEMS: newSetSector
        })
      });
      if (this.isBrowser) {
        this.slickComplitetNeeds();
      }

      //console.log("this.Achievements" , this.Achievements)
    })
  }

  public NEW_NEEDS_SVG;
  public NEEDS_MET_SVG;
  public NEEDS_IN_PROGRESS_SVG;
  GetFactsFigures() {
    this.getFactsFigures.HomepageFactsFiguresService().subscribe((factsFigureData) => {
      this.factsFigureData = factsFigureData;
      this.NEW_NEEDS_SVG = factsFigureData[0].NEW_NEEDS_PERC
      this.NEEDS_MET_SVG = factsFigureData[0].NEEDS_MET_PERC
      this.NEEDS_IN_PROGRESS_SVG = factsFigureData[0].NEEDS_IN_PROGRESS_PERC
      //console.log("factsFigureData = ", factsFigureData)

    })
  }

  slickComplitetNeeds() {
    setTimeout(function () {
      if ($(".AchievementsSlider").length > 0) {
        $('.AchievementsSlider').slick({
          dots: false,
          infinite: false,
          touchMove: false,
          touchThreshold: false,
          slidesToShow: 1,
          slidesToScroll: 1,
          adaptiveHeight: true,
          arrows: true,

        });
      }
    }, 200)
  }
  ngOnInit() {
    this.GetAchievement();
    this.GetFactsFigures();

    /* =================================== SVG ANIMATION ================================== */
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

      $(window).on("load scroll", function () {
        animateCircle()
      })
      // $(window).scroll(function (e) {
      //     animateCircle()
      // });

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

    


  }
  onmoveFn(data: NguCarouselStore) {
    //console.log(data);
  }

}
