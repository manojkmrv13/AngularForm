import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HowItWorksComponent } from './others/how-it-works/how-it-works.component';
import { SearchComponent } from './others/search/search.component';
import { SitemapComponent } from './others/sitemap/sitemap.component';
import { MainLayoutComponent } from "././layout/main-layout/main-layout.component"

const approutes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
        { path: '', loadChildren: () => import('./home/home.module').then(m => m.HomeModule), pathMatch: 'full' },
        { path: 'how-it-works', component: HowItWorksComponent }, 
        { path: 'sitemap',  component: SitemapComponent },
        { path: 'search', component: SearchComponent }, 
        { path: 'search/:key', component: SearchComponent },
        
        { path: 'impacted-lives', loadChildren: () => import('./impactedlives/impacted-lives.module').then(m => m.ImpactedLivesModule) }, 
        { path: 'donate', loadChildren: () => import('./donate/donate.module').then(m => m.DonateModule)}, 
        { path: 'fundraising', loadChildren: () => import('./donate/donate.module').then(m => m.DonateModule)},
        { path: 'payment',  loadChildren: () => import('./payment/payment.module').then(m => m.PaymentModule) },
        { path: 'about',  loadChildren: () => import('./about/about.module').then(m => m.AboutModule) },
        { path: 'account',  loadChildren: () => import('./account/account.module').then(m => m.AccountModule) },
        { path: 'my-fundraisers',  loadChildren:  () => import('./fundraise/fundraise.module').then(m => m.FundraiseModule) }
    ]
  },
  { path: 'mygifts',  loadChildren:  () => import('./landingpage/landingpage.module').then(m => m.LandingpageModule) }
];

@NgModule({
  imports: [ RouterModule.forRoot(approutes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
