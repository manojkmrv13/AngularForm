import { Component, OnInit, PLATFORM_ID, Inject, HostListener } from '@angular/core';
import { NguCarouselConfig, NguCarouselStore } from '@ngu/carousel';
import { isPlatformBrowser } from '@angular/common';

import { HomePageBannerService } from '../../services/home-page-banner.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { faFacebookF, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
declare var $: any;

@Component({
  selector: 'app-index-main-banner',
  templateUrl: './index-main-banner.component.html',
  styleUrls: ['./index-main-banner.component.css']
})



export class IndexMainBannerComponent implements OnInit {
  faFacebookF = faFacebookF;
  faTwitter = faTwitter;
  faYoutube = faYoutube;
  isBrowser: boolean;
  public homePageBanners = [];
  defaultImage = '../assets/images/bannerBG.png';
  public carouselConfig: NguCarouselConfig = {
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
    private HomePageBanner: HomePageBannerService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  @HostListener('window:resize', ['$event'])
  //@HostListener('window:load', ['$event'])
  onResize(event) {
    //console.log(event);
    var windowW = window.innerWidth;      
    this.homePageBanners.forEach(element => { 
          if (windowW >= 1200) {
            element.NEW_BANNER_IMAGE = element.BANNER_IMAGE_FILEPATH
          }
          if (windowW <= 1200 && windowW >= 768) {
            element.NEW_BANNER_IMAGE = element.TABLET_BANNER_IMAGE_FILEPATH
          }
          if (windowW <= 767) {
            element.NEW_BANNER_IMAGE = element.MOBILE_BANNER_IMAGE_FILEPATH
          }           
      });
  }

  GetHomePageBanner() {
    this.HomePageBanner.HomePageBannerService().subscribe((result) => {      
      var windowW = window.innerWidth;      
        result.forEach(element => {
          if (windowW >= 1200) {
            element.NEW_BANNER_IMAGE = element.BANNER_IMAGE_FILEPATH
          }
          if (windowW <= 1200 && windowW >= 768) {
            element.NEW_BANNER_IMAGE = element.TABLET_BANNER_IMAGE_FILEPATH
          }
          if (windowW <= 767) {
            element.NEW_BANNER_IMAGE = element.MOBILE_BANNER_IMAGE_FILEPATH
          }           
      });

      this.homePageBanners = result;
      this.BannerTextDecode();
      if (this.isBrowser) {
        this.SlickSliderBanner()
      }
    })
  }

  BannerTextDecode() {
    if (this.isBrowser) {
      setTimeout(function () {
        $(".bannTextDisc").each(function () {
          var text = decodeURI(encodeURI($(this).text()));
          $(this).html(text);
        })
      }, 400);
    }
  }

  SlickSliderBanner() {
    setTimeout(function () {
      $('.indexSliderSlider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        dots: true,
        autoplay: true,
        infinite: false,
      });
    }, 400)
  }

  ngOnInit() {
    this.GetHomePageBanner();
  }

  onmoveFn(data: NguCarouselStore) {
    //console.log(data);
  }

}
