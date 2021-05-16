import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable()
export class AuthGuard implements CanActivate {
    isBrowser:boolean;
    constructor(private router: Router,
        @Inject(PLATFORM_ID) private platformId: Object
    ) {
      this.isBrowser = isPlatformBrowser(this.platformId);
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : boolean {
        if(this.isBrowser){
            if (localStorage.getItem('currentUser')) {
                return true;
            }
        }
        

        this.router.navigate(['/'], { queryParams: { returnUrl: state.url }});  
        return false;

    }
}

