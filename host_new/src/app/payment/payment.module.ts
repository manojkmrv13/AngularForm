import { NgModule } from '@angular/core';
import {Component} from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { PaymentComponent } from './payment.component';
import { PaymetDetailsComponent } from './paymet-details/paymet-details.component';
import { PaymentmodeComponent } from './paymentmode/paymentmode.component';
import { FinalpaymentComponent } from './finalpayment/finalpayment.component';
import { NgStringPipesModule } from 'angular-pipes';
import { FormsModule } from '@angular/forms'; 
 
import {
  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule,
} from '@angular/material';

import { CartService } from '../services/cart.service';
import { CartDeleteNeedIdService } from '../services/cart-delete-need-id.service';
import { PostCcpaymentService } from '../services/post-ccpayment.service';
import { DonorprofileService } from '../services/donorprofile.service';
import { PaymentRoutingModule } from './payment-routing.module';
import { PaymentStartComponent } from './payment-start.component';

@NgModule({
  declarations: [
    PaymentComponent,
    PaymetDetailsComponent,
    PaymentmodeComponent,
    FinalpaymentComponent,
    PaymentStartComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    PaymentRoutingModule,
    NgStringPipesModule,
    MatDatepickerModule
  ],
  providers:[
    CartService,
    CartDeleteNeedIdService,
    PostCcpaymentService,
    DonorprofileService
  ]
})
export class PaymentModule {}
