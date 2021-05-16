import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
import { needsService } from '../../services/needs.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(
    private _route: ActivatedRoute,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private searchContant: needsService
  ) { 
    // ROUTING CHANGE EVENT
    router.events.subscribe((event: any) => {
      if (event instanceof NavigationStart) {
        // Show loading indicator
      }

      if (event instanceof NavigationEnd) {
        //console.log(this._route);
        this.TypeKey = this._route.snapshot.params['key'];
        //console.log(this.TypeKey)
        this.GetSearch(this.TypeKey)
      }

      if (event instanceof NavigationError) {

      }
    });
  }

  public TypeKey;
  public SearchData = [];
  GetSearch(TypeKey){
    this.searchContant.GetSearchData(TypeKey).subscribe((result) => {
      //console.log("search Data", result)
      this.SearchData = result
    })
  }

  ngOnInit() {
    
  }

}
