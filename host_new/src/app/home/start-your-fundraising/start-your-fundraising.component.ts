import { Component, OnInit, inject, PLATFORM_ID, Inject } from '@angular/core';
import { NguCarouselConfig, NguCarouselStore } from '@ngu/carousel';
import { NeedsectorService } from '../../services/needsector.service';
import { isPlatformBrowser } from '@angular/common';
declare var $: any
@Component({
  selector: 'app-start-your-fundraising',
  templateUrl: './start-your-fundraising.component.html',
  styleUrls: ['./start-your-fundraising.component.css']
})
export class StartYourFundraisingComponent implements OnInit {
  isBrowser: boolean;
  public startFundraisingConfig: NguCarouselConfig = {
    grid: { xs: 2, sm: 3, md: 4, lg: 5, all: 0 },
    slide: 1,
    speed: 400,
    //interval: 4000,
    point: {
      visible: true
    },
    load: 2,
    loop: true,
    touch: true
  };

  constructor(
    private getNeedSector: NeedsectorService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  public needSector = [];

  GetNeedSector() {
    this.getNeedSector.GetNeedSector('').subscribe((needSector) => {
      var sectorItems = []
      needSector.forEach(element => {
        if (element.HIDE_SECTOR === 0) {
          sectorItems.push(element)
        }
      });
      this.needSector = sectorItems;
      //  console.log("Start Fundraising", this.needSector)
      if (this.isBrowser) {
        this.slickComplitetNeeds();
      }

    })
  }

  slickComplitetNeeds() {
    setTimeout(function () {
      if ($(".StartFundraisingIndexSlider").length > 0) {
        $('.StartFundraisingIndexSlider').slick({
          dots: false,
          infinite: false,
          touchMove: false,
          touchThreshold: false,
          slidesToShow: 5,
          slidesToScroll: 5,
          adaptiveHeight: true,
          arrows: true,
          responsive: [
            {
              breakpoint: 991,
              settings: {
                centerMode: false,
                arrows: true,
                slidesToShow: 3,
                slidesToScroll: 1
              }
            },
            {
              breakpoint: 600,
              settings: {
                centerMode: false,
                arrows: true,
                slidesToShow: 2,
                slidesToScroll: 1
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
      }
    }, 200)
  }

  ngOnInit() {
    this.GetNeedSector();
  }
  onmoveFn(data: NguCarouselStore) {
    //console.log(data);
  }

}
