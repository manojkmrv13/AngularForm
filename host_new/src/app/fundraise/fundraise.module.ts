import { NgModule } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import { FundraiseRoutingModule } from './fundraise-routing.module'; 
import { NgStringPipesModule } from 'angular-pipes';
 
import { FundraiseComponent } from './fundraise.component';
import { HowFundraisingWorksComponent } from './how-fundraising-works/how-fundraising-works.component';
import { FundraisingComponent } from './fundraising/fundraising.component';
import { GetFundRaiseNeedMappingDetailsService } from '../services/get-fund-raise-need-mapping-details.service';
import { DeleteFundRaiseNeedMappingIdService } from '../services/delete-fund-raise-need-mapping-id.service';
import { FormsModule } from '@angular/forms';
import { InviteFriendsComponent } from './invite-friends/invite-friends.component';
import { FundraisingLoginComponent } from './fundraising-login/fundraising-login.component';
import { FundraisingDonateComponent } from './fundraising-donate/fundraising-donate.component';
import { DeleteFundRaiseNeedMapping } from '../services/delete-fund-raise-need-mapping.service';

 

@NgModule({
  declarations: [ 
    FundraiseComponent,
    HowFundraisingWorksComponent,
    FundraisingComponent,
    InviteFriendsComponent,
    FundraisingLoginComponent,
    FundraisingDonateComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
     FundraiseRoutingModule,
     NgStringPipesModule
  ],
  providers:[
    GetFundRaiseNeedMappingDetailsService,
    DeleteFundRaiseNeedMappingIdService,
    DeleteFundRaiseNeedMapping
  ]
})
export class FundraiseModule {}
