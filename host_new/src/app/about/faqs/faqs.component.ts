import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';

declare var $ :any;
@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.css']
})
export class FaqsComponent implements OnInit {
  public data=[];

  public title = "HoSh - Frequently Asked Questions";
  public description = "Have questions? Look at our list of frequently asked questions to get immediate answers. If you have any more questions, feel free to reach out to us.";

  constructor(   
    private titleService: Title, 
    private metaService: Meta
  ) { }

  ngOnInit() {

    this.titleService.setTitle(this.title);
    this.metaService.updateTag({name:'title', content:this.title});
    this.metaService.updateTag({name:'description', content:this.description});
    this.metaService.updateTag({name:'twitter:title', content:this.title});
    this.metaService.updateTag({name:'twitter:description', content:this.description});
    this.metaService.updateTag({property:'og:title', content:this.title});
    this.metaService.updateTag({property:'og:description', content:this.description});

       $(document).ready(function(){
      $(".collapse.in").each(function(){
        $(this).siblings(".panel-heading").find(".glyphicon").addClass("glyphicon-minus").removeClass("glyphicon-plus");
      });
      
      $(".collapse").on('show.bs.collapse', function(){
        $(this).parent().find(".glyphicon").removeClass("glyphicon-plus").addClass("glyphicon-minus");
      }).on('hide.bs.collapse', function(){
        $(this).parent().find(".glyphicon").removeClass("glyphicon-minus").addClass("glyphicon-plus");
      });
  });
  }

}
