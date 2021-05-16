import { NgModule } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LandFooterComponent } from './land-footer/land-footer.component';
import { LandingpageComponent } from './landingpage.component';
import { BannersliderComponent } from './bannerslider/bannerslider.component';
import { BannerneedComponent } from './bannerneed/bannerneed.component';
import { LandHeaderComponent } from './land-header/land-header.component';
import { LandingpageStartComponent } from './landingpage-start.component';
import { LandingpageRoutingModule } from './landingpage-routing.module';

import { NgStringPipesModule } from 'angular-pipes';
import { FormsModule } from '@angular/forms';
import { GtagModule } from 'angular-gtag';

import { SlickCarouselModule } from 'ngx-slick-carousel';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { SwiperModule, SwiperConfigInterface,
  SWIPER_CONFIG } from 'ngx-swiper-wrapper';

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
    direction: 'vertical',
    slidesPerView: 2
};

@NgModule({
  declarations: [ 
    LandingpageStartComponent,
    LandingpageComponent,
    LandFooterComponent,
    BannerneedComponent,
    LandHeaderComponent,
    BannersliderComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgStringPipesModule,
    FontAwesomeModule,
    LandingpageRoutingModule,
    SharedModule,
    SlickCarouselModule,
    CarouselModule,
    SwiperModule,
    GtagModule.forRoot({ trackingId: 'UA-132826604-1', trackPageviews: true }),
  ],
  providers:[
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
    }
  ]
})
export class LandingpageModule {}
