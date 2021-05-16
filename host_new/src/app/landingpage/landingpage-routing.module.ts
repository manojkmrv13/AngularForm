import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LandingpageComponent } from './landingpage.component';
import { LandingpageStartComponent } from './landingpage-start.component';

const landingRoutes: Routes = [
  { 
    path: '', component: LandingpageStartComponent, 
    children: [
      { path: '', component: LandingpageComponent }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(landingRoutes)
  ],
  exports: [RouterModule] 
})
export class LandingpageRoutingModule {}
