import { Component, OnInit } from '@angular/core';
import { HomepageFactsFiguresService } from '../../services/homepage-facts-figures.service';
import { Title, Meta } from '@angular/platform-browser';
declare var $:any;
@Component({
  selector: 'app-what-is-ho-sh',
  templateUrl: './what-is-ho-sh.component.html',
  styleUrls: ['./what-is-ho-sh.component.css']
})
export class WhatIsHoShComponent implements OnInit {

  public title = "HoSh - What is HoSh?"
  public description = "HoSh (Hope to Shine) is World Vision India’s crowdfunding platform to raise funds for children and families living in need and poverty.";

  constructor(     
    private titleService: Title, 
    private metaService: Meta,
    private getFactsFigures: HomepageFactsFiguresService
  ) {  }

  public factsFigureData = [];
  public NewNeeds;
  public NeedsMet;
  public NeedsInProgress;

  GetFactsFigures() {
    this.getFactsFigures.HomepageFactsFiguresService().subscribe((factsFigureData) => {
      this.factsFigureData = factsFigureData;
      //console.log("factsFigureData = ", factsFigureData)
      this.NewNeeds = factsFigureData[0].NEW_NEEDS
      this.NeedsMet = Math.ceil(factsFigureData[0].NEEDS_MET / factsFigureData[0].NEW_NEEDS * 100)
      this.NeedsInProgress = Math.ceil(factsFigureData[0].NEEDS_IN_PROGRESS / factsFigureData[0].NEW_NEEDS * 100)
    })
  }

  ngOnInit() {

    this.titleService.setTitle(this.title);
    this.metaService.updateTag({name:'title', content:this.title});
    this.metaService.updateTag({name:'description', content:this.description});
    this.metaService.updateTag({name:'twitter:title', content:this.title});
    this.metaService.updateTag({name:'twitter:description', content:this.description});
    this.metaService.updateTag({property:'og:title', content:this.title});
    this.metaService.updateTag({property:'og:description', content:this.description});

    this.GetFactsFigures()
  }


}
