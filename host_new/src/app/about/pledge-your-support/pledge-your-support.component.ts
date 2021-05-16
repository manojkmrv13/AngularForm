import { Component, OnInit } from '@angular/core';
import { PlaedgeSupportService } from '../../services/plaedge-support.service';


@Component({
  selector: 'app-pledge-your-support',
  templateUrl: './pledge-your-support.component.html',
  styleUrls: ['./pledge-your-support.component.css']
})
export class PledgeYourSupportComponent implements OnInit {

  constructor( private PledgeSupport:PlaedgeSupportService) { }

  public pledgeSupportTopData = [];
  public pledgeSupportData =  []
  GetPledgeSupportData(){
    this.PledgeSupport.GetPledgeSupport().subscribe((pledgeData) => {
      pledgeData.forEach(element => {
        if(element.SHOW_ON_TOP == 1){
          this.pledgeSupportTopData.push(element)
        }else{
          this.pledgeSupportData.push(element)
        }
      });
      //console.log("pledgeSupportData", this.pledgeSupportData)
    })
  }

  ngOnInit() {
    this.GetPledgeSupportData()
  }

}
