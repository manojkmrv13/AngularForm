import { Component, OnInit } from '@angular/core';
import { AuthenticateDonorUsersLeadService } from '../../services/authenticate-donor-users-lead.service';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-sitemap',
  templateUrl: './sitemap.component.html',
  styleUrls: ['./sitemap.component.css']
})
export class SitemapComponent implements OnInit {

  constructor(
    private LoginDetail: AuthenticateDonorUsersLeadService,
    private titleService: Title, 
    private metaService: Meta,
  ) { }
  public TOPMENU = [];
  public DONATE = [];
  public ABOUTUS = [];
  public FUNDRAISE = [];
  public ACCOUNT = [];

  GetMenu() {
    this.LoginDetail.GetMenu().subscribe((Data) => {
      //console.log("TOPMENU", Data);
      Data.forEach(element => {
        if (element.MenuName == 'Donate') {
          this.DONATE.push(element)
        } else if (element.MenuName == 'About us') {
          this.ABOUTUS.push(element)
        } else if (element.MenuName == 'Fundraise') {
          this.FUNDRAISE.push(element)
        } else if (element.MenuName == 'Account') {
          this.ACCOUNT.push(element)
        }
        this.TOPMENU = Data
      });
    });
  }
  ngOnInit() {
    let title = "HoSh - Sitemap";
    this.titleService.setTitle(title);
    this.metaService.updateTag({name:'title', content:title});
    this.metaService.updateTag({name:'twitter:title', content:title});
    this.metaService.updateTag({property:'og:title', content:title});
    this.GetMenu();
  }

}
