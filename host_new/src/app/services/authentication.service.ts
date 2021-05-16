import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Globalvar } from '../classes/globalvar';

@Injectable()
export class AuthenticationService {
    constructor(private router: Router) { }

    logout() {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('APIUSERID');
        localStorage.removeItem('loginTime'); 
        let cartItems = localStorage.getItem("cartItems");
        localStorage.clear();
        localStorage.setItem("cartItems", cartItems);
        Globalvar.setDonorId(Globalvar.getDonorId()); 
        //window.location.reload();
        //this.router.navigate(['/']); 
        //alert('auth logout')    
    }
    sessionExpired() {
         let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser !== null) {
            let loginTime = localStorage.getItem('loginTime');
            if (loginTime != null) {
                let currentData: string = new Date().toString();
                let diffInMs: number = Date.parse(currentData) - Date.parse(loginTime);
                let diffInMins: number = diffInMs / 1000 / 60;
                //if (diffInMins < 2) {                    
                   //document.getElementById("signupBtn").click();
                   alert('Your session is expired. Please Login');
                    localStorage.removeItem('currentUser');
                    localStorage.removeItem('loginTime');
                    localStorage.removeItem('APIUSERID'); 
                    localStorage.removeItem('ChildSponsership');                              
                    Globalvar.setDonorId(Globalvar.getDonorId());
                //}
            }
        }
    }

    getAuthToken(): string {
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));

        if (currentUser != null) {
            return currentUser[0].accessToken;
        }

        return '';
    }
    getDonorId(): number {
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser != null) {
            return currentUser[0].DONORID;
        }
        return 0;
    }
}