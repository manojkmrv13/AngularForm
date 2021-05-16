import { ImpactedLivesService } from '../../services/impacted-lives.service';
import { ActivatedRoute, Router, NavigationEnd, NavigationStart, NavigationError } from '@angular/router';
import { Globalvar } from '../../classes/globalvar';
import { isPlatformBrowser } from '@angular/common';
import { Title, Meta, DomSanitizer } from '@angular/platform-browser';
import { PLATFORM_ID, Inject, Injectable, Component, OnInit, AfterViewInit, Input, ViewEncapsulation } from '@angular/core';
declare var $: any;
declare var require: any;
declare var needShareDropdown: any;
@Component({
  selector: 'app-impacted-lives-detail',
  templateUrl: './impacted-lives-detail.component.html',
  styleUrls: ['./impacted-lives-detail.component.css']
})

export class ImpactedLivesDetailComponent implements OnInit {
  public isBrowser: boolean
  constructor(
    private ImpactedLives: ImpactedLivesService,
    private activeRoute: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private router : Router,
    private titleService: Title, 
    private metaService: Meta,
    @Inject(PLATFORM_ID) platformId: string
  ) {
    this.sanitizer = sanitizer;
    this.isBrowser = isPlatformBrowser(platformId);
    if (this.isBrowser) {
      window['jQuery'] = $;
      window['$'] = $;
      require('../../../assets/js/jquery-ui.js');
      require('../../../assets/js/jquery.fancybox.min.js');
      require('../../../assets/js/needsharebutton.min.js');
    }


    
  }

  public getSantizeUrl(url) {
    if (!url) return null;
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
  getScreen(url, size) {
    url = this.getVideoId(url);
    if (url === null) {
      return "";
    }
    size = (size === null) ? "big" : size;
    var vid, results;
    results = url.match("[\\?&]v=([^&#]*)");
    vid = (results === null) ? url : results[1];
    if (size == "small") {
      return "http://img.youtube.com/vi/" + vid + "/2.jpg";
    } else {
      return "http://img.youtube.com/vi/" + vid + "/1.jpg";
    }
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

  ImpactLiveShareDropdownF(title, text, media) {
    //console.log("==== Share Button =====")
    new needShareDropdown(document.getElementById('ImpactLiveShareButton'), {
      boxForm: 'vertical', // horizontal or vertical            
      position: 'bottomLeft', // top / middle / bottom + Left / Center / Right
      url: text, //window.location.href,
      title: title, //root.getTitle(),
      image: media, //root.getImage(),
      description: text, //root.getDescription(),
    });
    setTimeout(function () {
      $('.need-share-button_linkedin').after('<span class="need-share-button_link-box need-share-button_link need-share-button_twitter button_watsapp"  id="whatsApp" data-text="' + text + '" data-action="share/whatsapp/share"></span>');
    }, 100);

    setTimeout(function () {
      $('#whatsApp').click(function () {
        var text = $(this).attr('data-text');
        window.open("https://api.whatsapp.com/send?text=" + text, "myWindow", "width=600,height=500");
      });
    }, 500);

  }

  public needID;
  public ImpactedLivesData = [];

  public NeedName
public SECTOR;

  public shareTitle;
  public shareText;
  public shareMedia;
  GetImpactedLives(IMPACTEDID) {
    
    this.ImpactedLives.ImpactedLivesServiceBy(IMPACTEDID).subscribe((ImpactedLives) => {
      let element = ImpactedLives[0]
      this.ImpactedLivesData.push(element)
      this.NeedName = element.TITLE
    

      if( element.NEEDID > 0){
        this.ImpactedLives.ImpactedLiveGallery( element.NEEDID).subscribe((galleryData) => {
          if (galleryData.length > 0) {
            galleryData.forEach(element => {
              if (element.DOCUMENT_TYPE == 'Impacted Lives Image' || element.DOCUMENT_TYPE == 'Impacted Lives Video') {
                if (element.DOCUMENT_URL_9 == '') {
                  element.DOCUMENT_URL_9_FILEPATH = Globalvar.ApiUrl +'assets/images/image_not_available.jpg'
                }
                this.GalleryData.push(element)
              }
            });
          } else {
            let data = {
              DOCUMENT_TYPE : 'Impacted Lives Image',
              DOCUMENT_URL_2_FILEPATH : element.IMPACTED_LIVES_IMAGE_2_FILEPATH,
              DOCUMENT_ALT_IMAGE_TEXT: element.IMPACTED_ALT_IMAGE_TEXT
            };
            this.GalleryData.push(data);
          }
          this.GetSlickSlider()
          console.log("GalleryData", this.GalleryData)
        })
      }else{

        let data = {
          DOCUMENT_TYPE : 'Impacted Lives Image',
          DOCUMENT_URL_2_FILEPATH : element.IMPACTED_LIVES_IMAGE_2_FILEPATH,
          DOCUMENT_ALT_IMAGE_TEXT: element.IMPACTED_ALT_IMAGE_TEXT
        };
        this.GalleryData.push(data);
      
        this.GetSlickSlider();
        console.log("GalleryData", this.GalleryData)
      }

      let title = "HoSh - "+element.TITLE;
      let description = element.SHORT_DESCRIPTION;
      let image = element.IMPACTED_LIVES_IMAGE_1_FILEPATH;
      this.titleService.setTitle(title);
      this.metaService.updateTag({name:'title', content:title});
      this.metaService.updateTag({name:'description', content:description});
      if( image != null &&  image != ""){
        this.metaService.updateTag({name:'twitter:image', content:image});
        this.metaService.updateTag({property:'og:image', content:image});
      }
      this.metaService.updateTag({name:'twitter:title', content:title});
      this.metaService.updateTag({name:'twitter:description', content:description});
      this.metaService.updateTag({property:'og:title', content:title});
      this.metaService.updateTag({property:'og:description', content:description});

      this.shareTitle = ImpactedLives[0].TITLE;
      this.shareText = Globalvar.WebUrl + this.router.url
      this.shareMedia = ImpactedLives[0].IMPACTED_LIVES_IMAGE_1_FILEPATH;  
      this.SECTOR =ImpactedLives[0].SECTOR;
      setTimeout(() => {
        this.ImpactLiveShareDropdownF(this.shareTitle, this.shareText, this.shareMedia);
      }, 100);
      console.log(ImpactedLives[0].SECTOR);
      console.log("data", this.shareTitle, this.shareText, this.shareMedia)
    })
  }

 
  public GalleryData = [];

  GetSlickSlider() {
    setTimeout(function () {
      $('.ImpactedLivesDetail').slick({
        dots: false,
        infinite: false,
        speed: 300,
        slidesToShow: 2,
        slidesToScroll: 2,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              infinite: false,
              dots: false
            }
          },
          {
            breakpoint: 600,
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
        ]
      });
    }, 400)

  }


  ngOnInit() {

    this.needID = this.activeRoute.snapshot.paramMap.get('id');
    this.GetImpactedLives(this.needID);

  }


}
