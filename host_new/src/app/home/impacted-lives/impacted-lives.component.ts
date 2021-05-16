import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { NguCarouselConfig, NguCarouselStore } from '@ngu/carousel';
import { ImpactedLivesService } from '../../services/impacted-lives.service';

declare var $: any;
@Component({
  selector: 'app-impacted-lives',
  templateUrl: './impacted-lives.component.html',
  styleUrls: ['./impacted-lives.component.css']
})
export class ImpactedLivesComponent implements OnInit {
  isBrowser;
  defaultImage = '../assets/images/image_not_available.jpg';
  constructor(
    private ImpactedLives: ImpactedLivesService,
    @Inject(PLATFORM_ID) private platformId
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  public ImpactedLivesData = [];
  GetImpactedLives() {
    this.ImpactedLives.ImpactedLivesService().subscribe((ImpactedLives) => {
      this.ImpactedLivesData = ImpactedLives; 
      //console.log("ImpactedLivesData", this.ImpactedLivesData)
      if(this.isBrowser){
        this.ImpactedLiveSlider()
      }      
    })
  }


  

  ImpactedLiveSlider(){
    setTimeout(() => {
      $('.HowHoShworks').slick({
        dots: false,
        infinite: false,
        centerMode: false,
        speed: 300,
        slidesToShow: 5,
        slidesToScroll: 1,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 1,
              infinite: false,
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
      this.divEqualheight()
    },200)
    
  }

   divEqualheight() {
    $(".sameHeightWrap").each(function (index, element) {
      $(this).find(".sameHeight").css("height", "auto")
      var maxHeight = 0;
      $(this).find(".sameHeight").each(function (index, element) {
        if ($(this).height() > maxHeight) { maxHeight = $(this).height(); }
      });
      $(this).find(".sameHeight").height(maxHeight)
    });
  }
 
  ngOnInit() {
    this.GetImpactedLives();
     var thisO = this
    // if (isPlatformBrowser(this.platformId)) {
    //   $(document).ready(function () {
    //     thisO.divEqualheight()
    //     $(window).resize(function () {
    //       thisO.divEqualheight()
    //     })
    //   })
    // }

    




  }
  onmoveFn(data: NguCarouselStore) {
    //console.log(data);
  }

}
