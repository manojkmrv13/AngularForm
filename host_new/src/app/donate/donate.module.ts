import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import { SharedModule } from '../shared/shared.module';
import { DonateComponent } from './donate.component';
import { NeedtypeService } from '../services/needtype.service';
import { LocationService } from '../services/location.service';
import { GetFundRaiseNeedMappingDetailsService } from '../services/get-fund-raise-need-mapping-details.service';
import { DeleteFundRaiseNeedMapping } from '../services/delete-fund-raise-need-mapping.service';
import { CartService } from '../services/cart.service';
import { CartDeleteNeedIdService } from '../services/cart-delete-need-id.service';
import { NouisliderModule } from 'ng2-nouislider';
import { DonateRoutingModule } from './donate-routing.module';
import { FormsModule } from '@angular/forms';
import { NgStringPipesModule } from 'angular-pipes';
import { NeedDetailsComponent } from './need-details.component';
import { NguCarouselModule } from '@ngu/carousel'; 
import { ConnectnowService } from '../services/connectnow.service';
import { PartnersService } from '../services/partners.service';
import { CampaignersService } from '../services/campaigners.service';
import { SmalldocumentService } from '../services/smalldocument.service';
import { LargeneedlatestimageService } from '../services/largeneedlatestimage.service';
import { DonorsupporterService } from '../services/donorsupporter.service';
import { NeedCommentService } from '../services/needcomment.service';
import { LneedLisitingService } from '../services/lneed-lisiting.service';
import { SimilarNeedsService } from '../services/similar-needs.service';
import { TagsmapService } from '../services/tagsmap.service';
import { SStoriesService } from '../services/s-stories.service';
import { DonateStartComponent } from './donate-start.component'; 
import { JwSocialButtonsModule } from 'jw-angular-social-buttons';
import { CompletedNeedsComponent } from './completed-needs/completed-needs.component';
import { CompletedNeedsDetailsComponent } from './completed-needs-detail/completed-needs-detail.component';
import { StateCityService } from '../services/state-city.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { BrowserModule } from '@angular/platform-browser';

// import { BrowserModule } from '@angular/platform-browser'; 
// import { ApplicationRef } from '@angular/core';
// import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [
    DonateStartComponent,
    DonateComponent,
    NeedDetailsComponent,
    CompletedNeedsComponent,
    CompletedNeedsDetailsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    NouisliderModule,
    MatDatepickerModule,
    DonateRoutingModule,
    NgStringPipesModule,
    NguCarouselModule,
    MatNativeDateModule,
    JwSocialButtonsModule,
    FontAwesomeModule
    //BrowserModule,
    // AgmCoreModule.forRoot({
    //   apiKey: ''
    // })
  ],
  providers: [
    NeedtypeService,
    LocationService,
    GetFundRaiseNeedMappingDetailsService,
    DeleteFundRaiseNeedMapping,
    CartService,
    CartDeleteNeedIdService,
    ConnectnowService,
    PartnersService,
    CampaignersService,
    SmalldocumentService,
    LargeneedlatestimageService,
    DonorsupporterService,
    NeedCommentService,
    LneedLisitingService,
    SimilarNeedsService,
    TagsmapService,
    SStoriesService,
    StateCityService
  ]
})
export class DonateModule { }
