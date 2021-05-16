import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core'; 
import { TestimonialsService } from '../../services/testimonials.service';
import { isPlatformBrowser } from '@angular/common';

declare let $: any;
@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.css']
})
export class TestimonialsComponent implements OnInit { 
  isBrowser:Boolean;
  constructor(
    private homeTestimonial: TestimonialsService,
    @Inject(PLATFORM_ID) private platformId: Object
    ) {
      this.isBrowser = isPlatformBrowser(this.platformId);
    }

  public Testimonials = [];
  GetHomepageTestimonial(){
    this.homeTestimonial.GetTestimonials().subscribe((TestimonialData) =>{ 
      var data = [];
      if(TestimonialData.length > 0){
        if(TestimonialData.length < 10){
          data = TestimonialData;
       }else{        
         for(var i = 0; i < 5; i++){
           data.push(TestimonialData[i])
         }        
       }    
       this.Testimonials = data
      }
              
      console.log("TestimonialData", TestimonialData)
      if(this.isBrowser){
      this.setCarousel(this.Testimonials.length);
      }
    })
  }

setCarousel(items){
  setTimeout(function () {
    if($(".T_SliderTH").length > 0){
      $('.T_SliderTH').slick({
        centerMode: true,
        centerPadding: '10px',
        infinite: false,
        dots: false,
        arrows: true,
        slidesToShow: items > 3 ? 3 : 1,
        asNavFor: '.T_SliderContant',
        responsive: [
          {
            breakpoint: 768,
            settings: {
              centerMode: true,
              arrows: true,
              slidesToShow: 1
            }
          }
        ]
      });
      $('.T_SliderContant').slick({
        dots: false,
        infinite: false,
        touchMove: false,
        touchThreshold: false,
        slidesToShow: 1,
        adaptiveHeight: true,
        arrows: false
      });
    }    
  }, 1000);
}
  ngOnInit() {
    this.GetHomepageTestimonial(); 
  };

  
}
