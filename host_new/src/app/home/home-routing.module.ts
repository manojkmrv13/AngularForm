import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';

import { IndexMainBannerComponent } from '../home/index-main-banner/index-main-banner.component';
import { NeedsComponent } from '../home/hope-and-shine/needs.component';
import { ImpactedLivesComponent } from '../home/impacted-lives/impacted-lives.component';
import { JoinTheConversationComponent } from '../home/join-the-conversation/join-the-conversation.component';
import { FundraisingWorksComponent } from '../home/fundraising-works/fundraising-works.component';
import { AchievementsComponent } from '../home/achievements/achievements.component';
import { TestimonialsComponent } from '../home/testimonials/testimonials.component';
import { StartYourFundraisingComponent } from '../home/start-your-fundraising/start-your-fundraising.component';


const homeRoutes: Routes = [
  { path: '', component: HomeComponent, children: [
    { path: 'index', component: IndexMainBannerComponent },
    { path: 'need', component: NeedsComponent }, 
    { path: 'impact', component: ImpactedLivesComponent },
    { path: 'join', component: JoinTheConversationComponent },
    { path: 'fundraisingwork', component: FundraisingWorksComponent },
    { path: 'achievements', component: AchievementsComponent },
    { path: 'testimonials', component: TestimonialsComponent },
    { path: 'start', component: StartYourFundraisingComponent },
 
  ] },
];

@NgModule({
  imports: [
    RouterModule.forChild(homeRoutes)
  ],
  exports: [RouterModule] 
})
export class HomeRoutingModule {}
