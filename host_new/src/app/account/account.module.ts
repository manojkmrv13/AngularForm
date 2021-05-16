import { NgModule } from '@angular/core'; 
import { CommonModule } from '@angular/common'; 
import { AccountRoutingModule } from './account-routing.module';
import { NguCarouselModule } from '@ngu/carousel';
import { NgStringPipesModule } from 'angular-pipes';
import { MatDatepickerModule, MatNativeDateModule, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MyWorldComponent } from './my-world/my-world.component';
import { MyCartComponent } from './my-cart/my-cart.component';
import { MyDonationsComponent } from './my-donations/my-donations.component';
import { MyFundraisingActivityComponent } from './my-fundraising-activity/my-fundraising-activity.component';
import { MyNotificationsComponent } from './my-notifications/my-notifications.component';
import { MyTestimonialsComponent } from './my-testimonials/my-testimonials.component';
import { TaxCertificatesComponent } from './tax-certificates/tax-certificates.component';
import { ChangePasswordComponent } from './change-password/change-password.component'; 
import { FormsModule } from '@angular/forms';
import { AccountComponent } from './account.component';
import { DonorprofileService } from '../services/donorprofile.service';
import { DonorDonationsService } from '../services/donor-donations.service';
import { DonorRecentDonationsService } from '../services/donor-recent-donations.service';
import { GetFundRaiseNeedMappingDetailsService } from '../services/get-fund-raise-need-mapping-details.service';
import { DonorDonationsDetailsService } from '../services/donor-donations-details.service';
import { SimilarNeedsService } from '../services/similar-needs.service';
import { TaxCertificatesService } from '../services/tax-certificates.service';
import { DonorNotificationsService } from '../services/donor-notifications.service';
import { DeleteFundRaiseNeedMappingIdService } from '../services/delete-fund-raise-need-mapping-id.service';
import { CartService } from '../services/cart.service';
import { CartDeleteNeedIdService } from '../services/cart-delete-need-id.service';
import { PostCcpaymentService } from '../services/post-ccpayment.service';
import { StateCityService } from '../services/state-city.service';
import { SharedModule } from '../shared/shared.module';
import { ConnectnowService } from '../services/connectnow.service';
 

@NgModule({
  declarations: [ 
    AccountComponent,
    MyWorldComponent,
    MyCartComponent,
    MyDonationsComponent,
    MyFundraisingActivityComponent,
    MyNotificationsComponent,
    MyTestimonialsComponent,
    TaxCertificatesComponent,
    ChangePasswordComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    NguCarouselModule, 
    NgStringPipesModule,
    MatDatepickerModule,
    MatNativeDateModule, 
    AccountRoutingModule
  ],
  providers:[
   DonorprofileService,
   DonorDonationsDetailsService,
   DonorDonationsService,
   DonorRecentDonationsService,
   GetFundRaiseNeedMappingDetailsService,
   SimilarNeedsService,
   TaxCertificatesService,
   DonorNotificationsService,
   DeleteFundRaiseNeedMappingIdService,
   CartService,
   CartDeleteNeedIdService,
   PostCcpaymentService,
   StateCityService,
   ConnectnowService
  ]
})
export class AccountModule {}
