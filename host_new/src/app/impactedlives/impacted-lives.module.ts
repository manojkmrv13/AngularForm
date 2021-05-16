import { NgModule } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { ImpactedLivesPageComponent } from './impacted-lives-page/impacted-lives-page.component';
import { ImpactedLivesDetailComponent } from './impacted-lives-detail/impacted-lives-detail.component';
import { ImpactedLivesStartComponent } from './impacted-lives-start.component';
import { ImpactedLivesRoutingModule } from './impacted-lives-routing.module';

import { NgStringPipesModule } from 'angular-pipes';
import { FormsModule } from '@angular/forms';
import { GtagModule } from 'angular-gtag';

@NgModule({
  declarations: [ 
    ImpactedLivesStartComponent,
    ImpactedLivesPageComponent,
    ImpactedLivesDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgStringPipesModule,
    ImpactedLivesRoutingModule,
    SharedModule,
    GtagModule.forRoot({ trackingId: 'UA-132826604-1', trackPageviews: true }),
  ],
  providers:[
    
  ]
})
export class ImpactedLivesModule {}
