import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaymentComponent } from './payment.component';
import { PaymetDetailsComponent } from './paymet-details/paymet-details.component';
import { PaymentmodeComponent } from './paymentmode/paymentmode.component';
import { FinalpaymentComponent } from './finalpayment/finalpayment.component'; 
import { PaymentStartComponent } from './payment-start.component';
import { AuthGuard } from '../shared/guards/auth.guard';

const paymentRoutes: Routes = [
  {
    path: '', component: PaymentStartComponent, children: [
      { path: '', component: PaymentComponent, canActivate:[AuthGuard] },
      { path: 'details', component: PaymetDetailsComponent, canActivate:[AuthGuard] },
      { path: 'mode', component: PaymentmodeComponent, canActivate:[AuthGuard] },
      { path: 'final', component: FinalpaymentComponent, canActivate:[AuthGuard] },
      { path: 'final/:orderid', component: FinalpaymentComponent, canActivate:[AuthGuard] }
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(paymentRoutes)
  ],
  exports: [RouterModule]
})
export class PaymentRoutingModule { }
