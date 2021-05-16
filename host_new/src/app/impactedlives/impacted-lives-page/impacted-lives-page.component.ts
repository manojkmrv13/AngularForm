import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { ImpactedLivesService } from '../../services/impacted-lives.service';
import { isPlatformBrowser } from '@angular/common';
import { Globalvar } from '../../classes/globalvar';
import { Router, NavigationStart, NavigationEnd, NavigationError, ActivatedRoute } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
declare var $: any;
declare var require: any;
declare var needShareDropdown: any;
@Component({
  selector: 'app-impacted-lives-page',
  templateUrl: './impacted-lives-page.component.html',
  styleUrls: ['./impacted-lives-page.component.css']
})
export class ImpactedLivesPageComponent implements OnInit {

  public title = "HoSh - Impacted Lives";
  public description = "Visit here to know how HoSh supported economic development, education, drinking water, sanitation, etc. Donate now for similar categories.";

  isBrowser: boolean;
  private data=[];
  constructor(
    private titleService: Title, 
    private metaService: Meta,
    private ImpactedLives: ImpactedLivesService,
    private router: Router,
    private _route: ActivatedRoute,
    @Inject(PLATFORM_ID) platformId: string
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    if (this.isBrowser) {
      window['jQuery'] = $;
      window['$'] = $;
      require('../../../assets/js/needsharebutton.min.js');
    }
  }

  public ActiveSector;
  public SECTOR;
  populateData() {
    this.ActiveType = this._route.snapshot.params.type
    if (this.ActiveType !== null && this.ActiveType !== undefined) {
      console.log(this.ActiveType);
      this.ActiveSector = this._route.snapshot.params.type.replace('cat-', '').replace(/-/g, ' ');
    }

    this.GetImpactedLives();
  }

  public ImpactedLivesData = [];
  public SectorCategories = [];
  public ActiveType = 'All Needs'

  GetImpactedLives() {
    this.ImpactedLives.ImpactedLivesService().subscribe((ImpactedLives) => {
      this.ImpactedLivesData = ImpactedLives;
      this.SECTOR =ImpactedLives[0].SECTOR;
      for (var i = 0; i < ImpactedLives.length; i++) {
        var found = false;
        for (var j = 0; j < this.SectorCategories.length; j++) {
          if (ImpactedLives[i].SECTOR === this.SectorCategories[j].sector) {
            found = true;
            break;
          }
        }
        if (!found) {
          var activeSectorTab = false;
          if (this.ActiveSector !== undefined) {
            if (ImpactedLives[i].SECTOR.toLocaleLowerCase() === this.ActiveSector.toLocaleLowerCase()) {
              this.SECTOR = ImpactedLives[i].SECTOR;
              this.title = this.title +", "+ this.SECTOR;
              this.description = "Visit here to know how HoSh supported " + this.SECTOR +". Donate now for similar categories.";
              this.updateMetaTag();
              activeSectorTab = true;
              this.NeedSector.push(ImpactedLives[i].SECTORID)
            }
          }
          this.SectorCategories.push({ 'sector': ImpactedLives[i].SECTOR, 'sectorId': ImpactedLives[i].SECTORID, 'activeSector': activeSectorTab })
        }
      }

      console.log("SectorCategories", this.SectorCategories)
      if (this.isBrowser) {
        this.checkBoxCtrl()
      }
      if (this.isBrowser) {
        this.DivEqualheight()
      }
      this.SortImpactedLiveData()
    })
  }

  public NeedSector = []
  GetSelectedSector(SectorValue, e) {
    if (this.NeedSector !== undefined) {
      var index = this.NeedSector.indexOf(SectorValue);
      if (e.target.checked == true) {
        this.NeedSector.push(SectorValue)
      } else {
        this.NeedSector.splice(index, 1);
      }
    }
    //console.log(this.NeedSector)
    if (this.isBrowser) {
      this.SortImpactedLiveData()
    }
  }

  public impactedLiveArr = []
  SortImpactedLiveData() {
    //console.log("NeedSector", this.NeedSector)
    var newData = []
    this.NeedSector.forEach(element => {
      this.ImpactedLivesData.forEach(element2 => {
        if (element === element2.SECTORID) {
          newData.push(element2)
        }
      });
    });
    if (newData.length > 0) {
      this.impactedLiveArr = newData
    } else {
      this.impactedLiveArr = this.ImpactedLivesData
    }
    console.log("impactedLiveArr", this.impactedLiveArr);
    if (this.isBrowser) {
      this.DivEqualheight()
    }  
  }

  checkBoxCtrl() {
    setInterval(function () {
      $("input[type='checkbox']").each(function () {
        CheckCtrl($(this))
        $(this).click(function () {
          CheckCtrl($(this))
        })
        function CheckCtrl(thisO) {
          if (thisO.is(":checked")) {
            thisO.parents(".checkbox").addClass("active")
          } else {
            thisO.parents(".checkbox").removeClass("active")
          }
        }
      });
    }, 100)
  }
  DivEqualheight() {
    setTimeout(function () {
      $(".sameHeightWrap").each(function () {
        $(this).find(".sameHeight").css("height", "auto");
        var maxHeight = 0;
        $(this).find(".sameHeight").each(function () {
          if ($(this).height() > maxHeight) { maxHeight = $(this).height(); }
        });
        $(this).find(".sameHeight").height(maxHeight)
      })
    }, 200)
  }
  ngOnInit() {
    this.updateMetaTag();
    this.populateData();
  }

  updateMetaTag(){
    this.titleService.setTitle(this.title);
    this.metaService.updateTag({name:'title', content:this.title});
    this.metaService.updateTag({name:'description', content:this.description});
    this.metaService.updateTag({name:'twitter:title', content:this.title});
    this.metaService.updateTag({name:'twitter:description', content:this.description});
    this.metaService.updateTag({property:'og:title', content:this.title});
    this.metaService.updateTag({property:'og:description', content:this.description});
  }

}
