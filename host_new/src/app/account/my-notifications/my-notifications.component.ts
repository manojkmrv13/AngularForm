import { Component, OnInit } from '@angular/core';
import { DonorNotificationsService } from '../../services/donor-notifications.service';
import { Router } from '@angular/router';
import { Globalvar } from '../../classes/globalvar';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-my-notifications',
  templateUrl: './my-notifications.component.html',
  styleUrls: ['./my-notifications.component.css']
})
export class MyNotificationsComponent implements OnInit {

  constructor( 
    private MyNotifications:DonorNotificationsService,
    private router: Router,
    private http: HttpClient
    ) { }

  public DonorID;
  public notificationList =[];

  GetDonorNotifications(DonorID){
    this.MyNotifications.GetDonorNotifications(DonorID).subscribe((notificationData) => {
        this.notificationList = notificationData;
        //console.log("this.notificationList", this.notificationList)
    })
  }

  public ChildSponsership
  ngOnInit() {
    this.DonorID = Globalvar.getDonorId();
    this.GetDonorNotifications(this.DonorID)  
    
    this.ChildSponsership = localStorage.getItem('ChildSponsership')
  }

  PostDonorNotification(id){
    var body = {
      'NOTIFICATIONID': id,
      'IS_READ': 1
    }
    this.http.post(Globalvar.ApiUrl + "/PostDonorNotification", body).subscribe((data) => {
      this.GetDonorNotifications(this.DonorID)
    })
  }


}
