import { Component, OnInit, NgZone, Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
import { BlogService } from '../../services/blog.service';
import { ActivatedRoute } from '@angular/router';
import { Globalvar } from '../../classes/globalvar';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { Title, Meta, DomSanitizer } from '@angular/platform-browser';
declare var $: any;
declare var require: any;
declare var needShareDropdown: any;
@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.css']
})


export class BlogDetailsComponent implements OnInit {

  isBrowser: boolean;
  constructor(private Blog: BlogService,
    private activeRoute: ActivatedRoute,
    private Http: HttpClient,
    private router: Router,
    private sanitizer: DomSanitizer,
    private titleService: Title, 
    private metaService: Meta,
    @Inject(PLATFORM_ID) platformId: string
  ) { 
    this.isBrowser = isPlatformBrowser(platformId);
    if (this.isBrowser) {
      window['jQuery'] = $;
      window['$'] = $;      
      require('../../../assets/js/needsharebutton.min.js');
    }
  }


  public BlogData = [];
  public BlogTitle;
  public shareTitle;
  public shareText;
  public shareMedia;

  GetBlogDate(BlogId, CategoryId, MonthName, Year) {
    this.Blog.GetBlogs(BlogId, CategoryId, MonthName, Year).subscribe((blogData) => {
      this.BlogData = blogData
      this.BlogTitle = blogData[0].TITLE;
      this.shareTitle = blogData[0].TITLE;
      this.shareText = Globalvar.WebUrl + this.router.url
      this.shareMedia = blogData[0].BLOG_IMAGE_3_FILEPATH;  

      let title = "HOSH - "+this.BlogTitle;
      let description = blogData[0].SHORT_DESCRIPTION;
      let image = blogData[0].BLOG_IMAGE_3_FILEPATH;
      this.titleService.setTitle(title);
      this.metaService.updateTag({name:'title', content:title});
      this.metaService.updateTag({name:'description', content:description});
      this.metaService.updateTag({name:'twitter:title', content:title});
      this.metaService.updateTag({name:'twitter:description', content:description});
      this.metaService.updateTag({property:'og:title', content:title});
      this.metaService.updateTag({property:'og:description', content:description});
      if( image != null &&  image != ""){
        this.metaService.updateTag({name:'twitter:image', content:image});
        this.metaService.updateTag({property:'og:image', content:image});
      }
  
      setTimeout(() => {
        this.BlogShareDropdownF(this.shareTitle, this.shareText, this.shareMedia);
      }, 100);    
      
      console.log("BlogData", this.BlogData)
    })
  }

  BlogShareDropdownF(title, text, media) {
    //console.log("==== Share Button =====")
    new needShareDropdown(document.getElementById('shareButtonF2'), {
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

  public blogComentsData = [];
  GetBlogComments(BlogId) {
    this.Blog.GetBlogComments(BlogId).subscribe((BlogComments) => {
      this.blogComentsData = BlogComments
      //console.log("blogComentsData ", this.blogComentsData)
    })
  }

  public BlogId;


  public USERAGENT
  public IPADDRESS: string = '';
  public DONORID;
  GetComment
  postComment() {
    if (this.DONORID > 0) {
      if ($("#comment").val()) {
        var body = {
          'BLOGID': this.BlogId,
          'COMMENTS': $("#comment").val(),
          'PARENT_COMMENTID': 0,
          'IPADDRESS': $("#ipAddress").val(),
          'USERAGENT': this.USERAGENT,
          'STATUS': 0,
          'APPROVED_BY': 0,
          'DONORID': this.DONORID,
          'USERID': ''
        };
        //console.log("Form Data }", body)
        this.Http.post(Globalvar.ApiUrl + "/PostBlogsComments", body).subscribe((data) => {
          //console.log('Post Comments Responce Data', data);
          $("#comment").val('')
          alert("Thank you. Your comment will be displayed after review.")
        });
      } else {
        alert('Write a comment')
      }
    }else{
      document.getElementById("signupBtn").click()
    }   
  }

  GetBlogComment() {
    //this.GetComment.
  }
  GetIpAddress() {
    $.getJSON('http://ipinfo.io', function (data) {
      $('#ipAddress').val(data.ip);
    });
  }

  ngOnInit() {

    Globalvar.donorIdChanged.subscribe(
      (id: number) => {
        this.DONORID = id;
        this.GetIpAddress()
      }
    );
    this.BlogId = this.activeRoute.snapshot.paramMap.get('id');

    this.GetBlogComments(this.BlogId)
    this.GetBlogDate(this.BlogId, "", "", "")

    if(this.isBrowser){
      this.DONORID = Globalvar.getDonorId()
      this.USERAGENT = navigator.userAgent;
      this.GetIpAddress()
    }
  
  }

}
