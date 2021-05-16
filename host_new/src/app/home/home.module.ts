import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IndexMainBannerComponent } from '../home/index-main-banner/index-main-banner.component';
import { NeedsComponent } from '../home/hope-and-shine/needs.component';
import { ImpactedLivesComponent } from '../home/impacted-lives/impacted-lives.component';
import { JoinTheConversationComponent } from '../home/join-the-conversation/join-the-conversation.component';
import { FundraisingWorksComponent } from '../home/fundraising-works/fundraising-works.component';
import { AchievementsComponent } from '../home/achievements/achievements.component';
import { TestimonialsComponent } from '../home/testimonials/testimonials.component';
import { StartYourFundraisingComponent } from '../home/start-your-fundraising/start-your-fundraising.component';
import { HomeComponent } from '../home/home.component';

import { AchievementsService } from '../services/achievements.service';
import { HomepageFactsFiguresService } from '../services/homepage-facts-figures.service';
import { needsService } from '../services/needs.service';
import { ImpactedLivesService } from '../services/impacted-lives.service';
import { HomePageBannerService } from '../services/home-page-banner.service';
import { SocialFeedsService } from '../services/social-feeds.service';
import { NeedsectorService } from '../services/needsector.service';
import { TestimonialsService } from '../services/testimonials.service';

import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '../shared/shared.module';
import { NgStringPipesModule } from 'angular-pipes'; 
import { DeviceDetectorModule } from 'ngx-device-detector';
import { GtagModule } from 'angular-gtag';
import { JwSocialButtonsModule } from 'jw-angular-social-buttons';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NguCarouselModule } from '@ngu/carousel';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    IndexMainBannerComponent,
    NeedsComponent,
    ImpactedLivesComponent,
    JoinTheConversationComponent,
    FundraisingWorksComponent,
    AchievementsComponent,
    TestimonialsComponent,
    StartYourFundraisingComponent,
    HomeComponent
  ],
  imports: [
    FormsModule,
    HomeRoutingModule,
    NguCarouselModule,
    NgStringPipesModule,
    NgxSpinnerModule,
    NgbModule,
    JwSocialButtonsModule,
    SharedModule,
    DeviceDetectorModule.forRoot(),
    GtagModule.forRoot({ trackingId: 'UA-132826604-1', trackPageviews: true }),
    FontAwesomeModule
  ],
  providers:[
    AchievementsService,
    HomepageFactsFiguresService,
    needsService,
    ImpactedLivesService,
    HomePageBannerService,
    SocialFeedsService,
    NeedsectorService,
    TestimonialsService
  ]
})
export class HomeModule { }
