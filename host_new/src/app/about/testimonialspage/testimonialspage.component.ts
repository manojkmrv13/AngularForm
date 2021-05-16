import { Component, OnInit, PLATFORM_ID, Inject} from '@angular/core';
import { TestimonialsService } from '../../services/testimonials.service'; 
import { Title, Meta, DomSanitizer} from '@angular/platform-browser';

declare var $:any;
@Component({
  selector: 'app-testimonialspage',
  templateUrl: './testimonialspage.component.html',
  styleUrls: ['./testimonialspage.component.css']
})
export class TestimonialspageComponent implements OnInit {

  public title = "HoSh - Partners Speak";
  public description = "Hear from our partners, the folks who have benefited from the generous contribution of our donors.";

  constructor( 
    private titleService: Title, 
    private metaService: Meta,
    private getTestimonials: TestimonialsService,
    private sanitizer: DomSanitizer, 
    @Inject(PLATFORM_ID) platformId: string
  ) {
    this.sanitizer = sanitizer;
   }
  
  public testmonialsData = []
  GetTestimonials(StoryType){
    this.getTestimonials.GetTestimonialsAndSuccessStory(StoryType).subscribe((data) => {
      var newData = []
      data.forEach(element => {
        if(element.SUPPORTING_DOCUMENT_TYPE_1 !== 'Link'){
          newData.push(element)
        }
      });
      this.testmonialsData = newData
      //console.log("testmonialsData", this.testmonialsData)
      this.divEqualheight() 
    })
  }


  getVideoId(url) {
    var url = url;
    //var videoid = url.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
    var videoid = url.match(/(?:youtube(?:-nocookie)?\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    if (videoid != null) {
        return videoid[1];
    } else {
        //console.log("The youtube url is not valid.");
    }
}

setType(event){
  //console.log("event", event)  
  this.GetTestimonials(event.target.value);
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
      })
    }, 500)
  }

  ngOnInit() {

    this.titleService.setTitle(this.title);
    this.metaService.updateTag({name:'title', content:this.title});
    this.metaService.updateTag({name:'description', content:this.description});
    this.metaService.updateTag({name:'twitter:title', content:this.title});
    this.metaService.updateTag({name:'twitter:description', content:this.description});
    this.metaService.updateTag({property:'og:title', content:this.title});
    this.metaService.updateTag({property:'og:description', content:this.description});

    this.GetTestimonials('');
    
  }

}
