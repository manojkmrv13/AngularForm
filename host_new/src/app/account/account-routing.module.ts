import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountComponent } from './account.component';
import { MyWorldComponent } from './my-world/my-world.component';
import { MyCartComponent } from './my-cart/my-cart.component';
import { MyDonationsComponent } from './my-donations/my-donations.component';
import { MyFundraisingActivityComponent } from './my-fundraising-activity/my-fundraising-activity.component';
import { MyNotificationsComponent } from './my-notifications/my-notifications.component';
import { MyTestimonialsComponent } from './my-testimonials/my-testimonials.component';
import { TaxCertificatesComponent } from './tax-certificates/tax-certificates.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { AuthGuard } from '../shared/guards/auth.guard';

 

const accountRoutes: Routes = [
  { path: '', component: AccountComponent, children: [
    { path: 'my-profile', component: MyWorldComponent, canActivate:[AuthGuard] },
    { path: 'my-cart', component: MyCartComponent, canActivate:[AuthGuard] },
    { path: 'my-contribution', component: MyDonationsComponent, canActivate:[AuthGuard] },
    { path: 'fundraising-activity', component: MyFundraisingActivityComponent, canActivate:[AuthGuard] }, 
    { path: 'my-receipts', component: TaxCertificatesComponent, canActivate:[AuthGuard] },
    { path: 'notifications', component: MyNotificationsComponent, canActivate:[AuthGuard] },
    { path: 'change-password', component: ChangePasswordComponent, canActivate:[AuthGuard] },
    { path: 'share-my-experience', component: MyTestimonialsComponent, canActivate:[AuthGuard] },
  ] },
];


@NgModule({
  imports: [
    RouterModule.forChild(accountRoutes)
  ],
  exports: [RouterModule] 
})
export class AccountRoutingModule {}
