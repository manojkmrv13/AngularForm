import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-how-fundraising-works',
  templateUrl: './how-fundraising-works.component.html',
  styleUrls: ['./how-fundraising-works.component.css']
})
export class HowFundraisingWorksComponent implements OnInit {

  public title = "HoSh - How Fundraising Works";
  public description = "Visit here to know how Fundraising Works";

  constructor(
    private titleService: Title, 
    private metaService: Meta,
    private router: Router

  ) { }

  StartFundraising(){
    this.router.navigate(['/fundraising']);
  }

  ngOnInit() {
    this.titleService.setTitle(this.title);
    this.metaService.updateTag({name:'title', content:this.title});
    this.metaService.updateTag({name:'description', content:this.description});
    this.metaService.updateTag({name:'twitter:title', content:this.title});
    this.metaService.updateTag({name:'twitter:description', content:this.description});
    this.metaService.updateTag({property:'og:title', content:this.title});
    this.metaService.updateTag({property:'og:description', content:this.description});
  }

}
