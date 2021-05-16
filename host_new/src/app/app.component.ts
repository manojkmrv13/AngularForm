import { Component, ViewChild, ElementRef,OnInit } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Meta } from '@angular/platform-browser';
declare var $: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  constructor(
    private router: Router,
    private spinner: NgxSpinnerService,
    private metaService:Meta
  ) {
    // ROUTING CHANGE EVENT
    router.events.subscribe((event: any) => {
      if (event instanceof NavigationStart) {
        this.spinner.show();
      }

      if (event instanceof NavigationEnd) {
        // let scrollToTop = window.setInterval(() => {
        //   let pos = window.pageYOffset;
        //   if (pos > 0) {
        //     window.scrollTo(0, pos - 20); // how far to scroll on each step
        //   } else {
        //     window.clearInterval(scrollToTop);
        //   }
        // }, 9);
        
        // var thisO = this
        // let interval = setInterval(function () {
        //   if (document.readyState === 'complete') {
        //     clearInterval(interval);
        //     setTimeout(() => {
        //       thisO.spinner.hide();
        //       console.log("windiw loaded")
        //     }, 1000);            
        //   }
        // }, 100);

        setTimeout(() => { 
          this.spinner.hide();
          var thisO = this  
        }, 1000);
      }

      if (event instanceof NavigationError) {
        setTimeout(() => {
          this.spinner.hide();
        }, 500);
      }
    });

  }
  ngOnInit(){
    this.metaService.addTag({name: 'author', content: 'rsgitech'});
  }

}
