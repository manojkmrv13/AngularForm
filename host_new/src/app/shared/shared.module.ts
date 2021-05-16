import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafePipe } from '../services/safe.pipe'; 
import {TimeAgoPipe} from 'time-ago-pipe';
import {LazyLoadImageModule, intersectionObserverPreset} from 'ng-lazyload-image';
@NgModule({
  declarations: [ 
    SafePipe,
    TimeAgoPipe 
  ],
  imports: [
    LazyLoadImageModule.forRoot({
      preset: intersectionObserverPreset
    })
  ],
  exports: [
    CommonModule,
    SafePipe,
    TimeAgoPipe,
    LazyLoadImageModule
  ] 
})
export class SharedModule {}
