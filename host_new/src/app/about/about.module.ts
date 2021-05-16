import { NgModule } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import { AboutRoutingModule } from './about-routing.module';
import { SharedModule } from '../shared/shared.module';

import { AboutComponent } from './about.component'; 
import { BlogComponent } from './blog/blog.component';
import { BlogDetailsComponent } from './blog-details/blog-details.component';
import { FaqsComponent } from './faqs/faqs.component'
import { PledgeYourSupportComponent } from './pledge-your-support/pledge-your-support.component';
import { CorporateTieUpsComponent } from './corporate-tie-ups/corporate-tie-ups.component';
import { WhatIsHoShComponent } from './what-is-ho-sh/what-is-ho-sh.component';
import { SuccessStoriesComponent } from './success-stories/success-stories.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { NgStringPipesModule } from 'angular-pipes';
import { FormsModule } from '@angular/forms';
import { BlogService } from '../services/blog.service';
import { CorporateTieUpsService } from '../services/corporate-tie-ups.service';
import { TestimonialspageComponent } from './testimonialspage/testimonialspage.component';
import { SStoriesService } from '../services/s-stories.service';
import { StateCityService } from '../services/state-city.service';
import { ConnectnowService } from '../services/connectnow.service'; 

@NgModule({
  declarations: [ 
    AboutComponent,
    BlogComponent,
    FaqsComponent,
    PledgeYourSupportComponent,
    BlogDetailsComponent,
    CorporateTieUpsComponent,
    WhatIsHoShComponent,
    SuccessStoriesComponent,
    ContactUsComponent,
    TestimonialspageComponent 
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgStringPipesModule,
    AboutRoutingModule,
    SharedModule , 
    
  ],
  providers:[
    BlogService,
    CorporateTieUpsService,
    SStoriesService,
    StateCityService,
    ConnectnowService
  ]
})
export class AboutModule {}
