import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PLATFORM_ID, APP_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { NguCarouselModule } from '@ngu/carousel';
import { NgStringPipesModule } from 'angular-pipes'; 
import { NgxSpinnerModule } from 'ngx-spinner';
import { CartDeleteNeedIdService } from './services/cart-delete-need-id.service';
import { ImpactedLivesService } from './services/impacted-lives.service';
import { needsService } from './services/needs.service';
import { HomePageBannerService } from './services/home-page-banner.service';
import { NeedsectorService } from './services/needsector.service';
import { AchievementsService } from './services/achievements.service';
import { HomepageFactsFiguresService } from './services/homepage-facts-figures.service';
import { TestimonialsService } from './services/testimonials.service';
import { SocialFeedsService } from './services/social-feeds.service';

import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HowItWorksComponent } from './others/how-it-works/how-it-works.component';
import { AuthenticateDonorUsersLeadService } from './services/authenticate-donor-users-lead.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SearchComponent } from './others/search/search.component';
import { PlaedgeSupportService } from './services/plaedge-support.service';
import { SitemapComponent } from './others/sitemap/sitemap.component';
import { MainLayoutComponent } from "././layout/main-layout/main-layout.component"
import { BlogService } from './services/blog.service';
import { JwSocialButtonsModule } from 'jw-angular-social-buttons';
import { CartService } from './services/cart.service';
import { AuthenticationService } from './services/authentication.service';
import { TokenInterceptor } from './shared/interceptors/token.interceptor';
import { AuthGuard } from './shared/guards/auth.guard';
import { SharedModule } from './shared/shared.module';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { DonorprofileService } from './services/donorprofile.service';
import { GtagModule } from 'angular-gtag';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import * as $ from "jquery";
 
@NgModule({
  imports: [
    BrowserModule.withServerTransition({ appId: 'world-vision-hosh' }),
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    NguCarouselModule,
    FontAwesomeModule,
    NgStringPipesModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    NgbModule,
    JwSocialButtonsModule,
    SharedModule,
    DeviceDetectorModule.forRoot(),
    GtagModule.forRoot({ trackingId: 'UA-132826604-1', trackPageviews: true }),
  ],
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HowItWorksComponent,
    SearchComponent,
    SitemapComponent,
    MainLayoutComponent
  ],
  providers: [
    ImpactedLivesService,
    CartDeleteNeedIdService,
    needsService,
    HomePageBannerService,
    NeedsectorService,
    AchievementsService,
    HomepageFactsFiguresService,
    TestimonialsService,
    SocialFeedsService,
    AuthenticateDonorUsersLeadService,
    PlaedgeSupportService,
    CartService,
    AuthGuard,
    AuthenticationService,
    BlogService,
    DonorprofileService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(APP_ID) private appId: string) {
    const platform = isPlatformBrowser(platformId);
  }
}
