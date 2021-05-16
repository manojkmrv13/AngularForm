import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
declare var $:any;
@Component({
  selector: 'app-fundraising-works',
  templateUrl: './fundraising-works.component.html',
  styleUrls: ['./fundraising-works.component.css']
})
export class FundraisingWorksComponent implements OnInit {
  defaultImage = '../assets/images/image_not_available.jpg';
  isBrowser:boolean;
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }
  
  SlickSlider(){
    $('.FundraisingWorks').slick({
      dots: true,
      infinite: false,
      centerMode: false,
      speed: 300,
      slidesToShow: 4,
      slidesToScroll: 4,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: false,
            dots: true
          }
        },
        {
          breakpoint: 769,
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
  }
  ngOnInit() {
    if(this.isBrowser){
      this.SlickSlider()
      $(document).ready(function(){
        fundraisingElements()
        $(window).scroll(function(){
          fundraisingElements()
        })
      })

    }
    
    // this.FundraisingWorksConfig = {
    //   grid: { xs: 1, sm: 2, md: 3, lg: 4, all: 0 },
    //   slide: 1,
    //   speed: 400,
    //   interval: {
    //     timing: 3000,
    //     initialDelay: 1000
    //   },
    //   point: {
    //     visible: true
    //   },
    //   load: 2,
    //   loop: true,
    //   touch: true
    // };

    



    

    function fundraisingElements(){
      if($(window).width() > 768){
        var wH = window.innerHeight - 100
        var pageScrollTop = $(window).scrollTop() + wH;
        if ($(".HowHoShWorks").length > 0) {
            var timer = 500
            var objScrollTop = $(".HowHoShWorks").offset().top;
            if (pageScrollTop > objScrollTop) {
                $('.AnimationOne').delay(0).animate({ "left": "0", "opacity": "1" }, timer)
                $('.AnimationTwo').delay(250).animate({ "left": "0", "opacity": "1" }, timer)
                $('.AnimationThree').delay(500).animate({ "left": "0", "opacity": "1" }, timer)
                $('.AnimationFour').delay(750).animate({ "left": "0", "opacity": "1" }, timer)
            }
        }
      }else{
        $('.AnimationOne').css({ "left": "0", "opacity": "1" })
        $('.AnimationTwo').css({ "left": "0", "opacity": "1" })
        $('.AnimationThree').css({ "left": "0", "opacity": "1" })
        $('.AnimationFour').css({ "left": "0", "opacity": "1" })
      }
      
  }
  }
  

}
