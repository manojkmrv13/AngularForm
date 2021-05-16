import {Component, OnInit, PLATFORM_ID, Inject, } from '@angular/core';
import { NguCarouselConfig, NguCarouselStore } from '@ngu/carousel';
import { inject } from '@angular/core/testing';
import { isPlatformBrowser } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';
import { Router, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-how-it-works',
  templateUrl: './how-it-works.component.html',
  styleUrls: ['./how-it-works.component.css']
})
export class HowItWorksComponent implements OnInit {

  public title = "HoSh - How it works?"
  public description = "Want to know how HoSh crowdfunding platform works? visit here to know more details.";

  isBrowser: boolean;
public data=[];
  constructor(
    private titleService: Title, 
    private metaService: Meta,
    @Inject(PLATFORM_ID) private platformId: Object
    ) {
      this.isBrowser = isPlatformBrowser(this.platformId);
    }

  

  SlickSliderHowHoShworks() {
    setTimeout(function () {
      $('.HowHoShworks').slick({
        dots: false,
        infinite: false,
        centerMode: false,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
              infinite: false,
              dots: true
            }
          },
          {
            breakpoint: 768,
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

  ngOnInit() {

    this.titleService.setTitle(this.title);
    this.metaService.updateTag({name:'title', content:this.title});
    this.metaService.updateTag({name:'description', content:this.description});
    this.metaService.updateTag({name:'twitter:title', content:this.title});
    this.metaService.updateTag({name:'twitter:description', content:this.description});
    this.metaService.updateTag({property:'og:title', content:this.title});
    this.metaService.updateTag({property:'og:description', content:this.description});
      
    if(this.isBrowser)
    this.SlickSliderHowHoShworks(); 
    
  }  
}



// function contactList(str) {
//   console.log(str);
//       $("#tbl").empty();
//       var datajson = JSON.parse(str);
//       $("#tbl").append('<thead><tr><th>Full Name</th><th>Email ID</th></tr></thead><tbody>');
//       $.each(datajson, function (index, data) {
//           $("#tbl").append("<tr><td>" + data.FullName + "</td><td>" + data.Email + "</td></tr>");
//       });
//       $("#tbl").append('</tbody>');
// }
