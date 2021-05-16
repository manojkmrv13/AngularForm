import { Component, OnInit, Inject, Injectable, Pipe, PLATFORM_ID} from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { isPlatformBrowser } from '@angular/common';
import { Title, Meta, DomSanitizer } from '@angular/platform-browser';
declare var $:any;
declare var require: any
@Injectable()

@Pipe({
    name: 'limitTo',
})

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  public title = "HoSh - Blog"
  public description = "Read the latest updates, news and success stories of our partners from the official HoSh blog.";

  constructor( 
    private titleService: Title, 
    private metaService: Meta,
    private Blog:BlogService,
    private sanitizer: DomSanitizer, 
    @Inject(PLATFORM_ID) platformId: string
  ) {
    this.sanitizer = sanitizer;
        this.isBrowser = isPlatformBrowser(platformId);
        if (this.isBrowser) {
            window['jQuery'] = $;
            window['$'] = $;
            require('../../../assets/js/jquery-ui.js');
            require('../../../assets/js/jquery.fancybox.min.js');
            require('../../../assets/js/cPager.js');
        }
   }

   isBrowser: boolean;
  public BlogCategory = [];
  GetBlogCategory(){
    this.Blog.GetBlogCategory().subscribe((catogeryResult) => {
      this.BlogCategory = catogeryResult 
    })
  }

  public BlogData = [];
  GetBlogDate(BlogId, CategoryId, MonthName, Year){
    this.Blog.GetBlogs(BlogId, CategoryId, MonthName, Year).subscribe((blogData) => { 
      var data = []     
      blogData.forEach(element => {
        element.SHORT_DESCRIPTION = element.SHORT_DESCRIPTION.replace(/font-family: &quot;Helvetica Neue Light&quot;, HelveticaNeue-Light, &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif;/g, '')                              //.replace( /&quot;/g,"")
        //console.log("element.SHORT_DESCRIPTION", element.SHORT_DESCRIPTION)
        data.push(element)
      });
      this.BlogData = blogData
      console.log("Blog Data", this.BlogData)
      this.PagerNav();
    })
  }


  public Month
  public Year
  public Category
  GetBlogDataByCaregoryID(CategoryID){
    this.Category = CategoryID
    this.GetBlogDate('', CategoryID, this.Month? this.Month : '' , this.Year? this.Year : '')
    $(".Category"+CategoryID).addClass("active").siblings().removeClass("active")
  }

  GetMonthYear(month, year, event){
    this.Month = month;
    this.Year = year
    this.GetBlogDate("", this.Category? this.Category : '', month, year);
    $("."+event.target.className).addClass("active").siblings().removeClass("active")
  }

  public monthYearData = [];
  GetBlogMonthYear(){
    this.Blog.GetBlogsMonthYear().subscribe((monthYearData) => {
      this.monthYearData = monthYearData
    })
  }

  PagerNav() {
    setTimeout(function () {
        $('#blogs').cPager({
            pageSize: 4,
            pageIndex: 1,
            pageid: "pager",
            itemClass: "BlogText"
        });       
    }, 200);
}

ClearFilter(){
  this.GetBlogDate("","","","");
  $(".Category, .Archive").find('li').removeClass('active')
}

  ngOnInit() {

    this.titleService.setTitle(this.title);
    this.metaService.updateTag({name:'title', content:this.title});
    this.metaService.updateTag({name:'description', content:this.description});
    this.metaService.updateTag({name:'twitter:title', content:this.title});
    this.metaService.updateTag({name:'twitter:description', content:this.description});
    this.metaService.updateTag({property:'og:title', content:this.title});
    this.metaService.updateTag({property:'og:description', content:this.description});

    this.GetBlogCategory()
    this.GetBlogDate("","","","");
    this.GetBlogMonthYear();
    
  }

}
