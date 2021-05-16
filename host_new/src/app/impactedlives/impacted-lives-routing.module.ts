import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ImpactedLivesPageComponent } from './impacted-lives-page/impacted-lives-page.component';
import { ImpactedLivesDetailComponent } from './impacted-lives-detail/impacted-lives-detail.component';
import { ImpactedLivesStartComponent } from './impacted-lives-start.component';

const impactedlivesRoutes: Routes = [
  { 
    path: '', component: ImpactedLivesStartComponent, 
    children: [
      { path: '', component: ImpactedLivesPageComponent },
      { path: ':type', component: ImpactedLivesPageComponent },
      { path: ':id/:name', component: ImpactedLivesDetailComponent },
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(impactedlivesRoutes)
  ],
  exports: [RouterModule] 
})
export class ImpactedLivesRoutingModule {}
