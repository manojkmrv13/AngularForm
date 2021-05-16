import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DonateComponent } from './donate.component';
import { NeedDetailsComponent } from './need-details.component';
import { DonateStartComponent } from './donate-start.component';
import { CompletedNeedsComponent } from './completed-needs/completed-needs.component';
import { CompletedNeedsDetailsComponent } from './completed-needs-detail/completed-needs-detail.component';

const donateRoutes: Routes = [
  // { path: '', redirectTo: 'donate', pathMatch: 'full' },
  { path: '', component: DonateStartComponent, children: [
    { path: 'completed-needs', component: CompletedNeedsComponent },
    { path: 'completed-needs/:id', component: CompletedNeedsDetailsComponent },
    { path: 'completed-needs/:id/:title', component: CompletedNeedsDetailsComponent },
    { path: 'completed-needs/:id/:title/:filter', component: CompletedNeedsDetailsComponent },
    { path: '', component: DonateComponent },
    { path: ':type', component: DonateComponent },
    { path: ':type/:subtype', component: DonateComponent },
    { path: 'details/:id', component: NeedDetailsComponent },
    { path: 'details/:id/:title', component: NeedDetailsComponent } ,  
  ] },
];

@NgModule({
  imports: [
    RouterModule.forChild(donateRoutes)
  ],
  exports: [RouterModule] 
})
export class DonateRoutingModule {}
