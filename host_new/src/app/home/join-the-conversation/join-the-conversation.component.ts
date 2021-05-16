import { Component, OnInit } from '@angular/core';
import { SocialFeedsService } from '../../services/social-feeds.service';
import { faFacebook, faTwitter, faYoutube, faInstagram } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-join-the-conversation',
  templateUrl: './join-the-conversation.component.html',
  styleUrls: ['./join-the-conversation.component.css']
})
export class JoinTheConversationComponent implements OnInit {
  faFacebook = faFacebook;
  faInstagram = faInstagram;
  faTwitter = faTwitter;
  faYoutube = faYoutube;
  defaultImage = '../assets/images/image_not_available.jpg';
  public socialFeedsData = [];
  constructor( private socialFeedsService: SocialFeedsService ) { }


  GetSocialFeeds(){
    this.socialFeedsService.SocialFeedsService().subscribe((socialFeedsData => {
      this.socialFeedsData = socialFeedsData
      //console.log("socialFeedsData = ", socialFeedsData )
    }))
  }

  ngOnInit() {
    this.GetSocialFeeds()
  }

}
