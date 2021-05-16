import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
 
import { FundraiseComponent } from './fundraise.component';
import { HowFundraisingWorksComponent } from './how-fundraising-works/how-fundraising-works.component';
import { FundraisingComponent } from './fundraising/fundraising.component';
import { InviteFriendsComponent } from './invite-friends/invite-friends.component';
import { FundraisingLoginComponent } from './fundraising-login/fundraising-login.component';
import { FundraisingDonateComponent } from './fundraising-donate/fundraising-donate.component';

const fundraiseRoutes: Routes = [
  { path: '', component: FundraiseComponent, children: [
    { path: '', component: FundraisingComponent },
    { path: 'how-fundraising-works', component: HowFundraisingWorksComponent }, 
    { path: 'invite-friends', component: InviteFriendsComponent },
    { path: 'invite-friends/:id', component: InviteFriendsComponent },
    // { path: ':id', component: FundraisingLoginComponent },
    // { path: ':id/:name', component: FundraisingLoginComponent },
    { path: ':id', component: FundraisingDonateComponent },
    { path: ':id/:name', component: FundraisingDonateComponent },
    { path: ':id/:name/donate', component: FundraisingDonateComponent }
  ] },
];

@NgModule({
  imports: [
    RouterModule.forChild(fundraiseRoutes)
  ],
  exports: [RouterModule] 
})
export class FundraiseRoutingModule {}
