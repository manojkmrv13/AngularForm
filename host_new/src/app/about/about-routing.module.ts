import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutComponent } from './about.component';
import { BlogComponent } from './blog/blog.component'; 
import { BlogDetailsComponent } from './blog-details/blog-details.component';
import { CorporateTieUpsComponent } from './corporate-tie-ups/corporate-tie-ups.component';
import { WhatIsHoShComponent } from './what-is-ho-sh/what-is-ho-sh.component';
import { SuccessStoriesComponent } from './success-stories/success-stories.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { TestimonialspageComponent } from './testimonialspage/testimonialspage.component';
import { FaqsComponent } from './faqs/faqs.component';
import { PledgeYourSupportComponent } from './pledge-your-support/pledge-your-support.component';

const aboutRoutes: Routes = [
  { path: '', component: AboutComponent, children: [
    { path: 'blog', component: BlogComponent },
    { path: 'blog/:id', component: BlogDetailsComponent }, 
    { path: 'blog/:id/:title', component: BlogDetailsComponent },
    { path: 'faq', component: FaqsComponent},
    { path: 'pledge-your-support', component: PledgeYourSupportComponent },
    { path: 'corporate-partnerships', component: CorporateTieUpsComponent },
    { path: 'partners-speak', component: TestimonialspageComponent },
    { path: 'what-is-HoSh', component: WhatIsHoShComponent },
    { path: 'success-stories', component: SuccessStoriesComponent },
    { path: 'contact-us', component: ContactUsComponent },
  ] },
];

@NgModule({
  imports: [
    RouterModule.forChild(aboutRoutes)
  ],
  exports: [RouterModule] 
})
export class AboutRoutingModule {}
