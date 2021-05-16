import { Injectable } from '@angular/core'; 
import { Observable, Observer } from 'rxjs';

@Injectable()
export class authTokenService {
    data: any;
    dataChange: Observable<any>;
  constructor() { 
    // this.dataChange = new Observable((observer:Observer) {
    //     this.dataChangeObserver = observer;
    //   });
  }
  
}
