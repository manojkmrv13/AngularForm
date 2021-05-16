import { Component, OnInit } from '@angular/core';
import { SStoriesService } from '../../services/s-stories.service';
import { NeedsectorService } from '../../services/needsector.service';
declare var $:any;
@Component({
  selector: 'app-success-stories',
  templateUrl: './success-stories.component.html',
  styleUrls: ['./success-stories.component.css']
})
export class SuccessStoriesComponent implements OnInit {

  constructor(
    private SuccessStory: SStoriesService,
    private nss: NeedsectorService,
  ) { }

  public SuccessStoryData = [];
  
  public ndss = []
  GetSuccessStory(sectorId){
    this.SuccessStory.GetSuccessStory(sectorId).subscribe((result) => {
      this.SuccessStoryData = result
      //console.log("SuccessStoryData ", this.SuccessStoryData)
      this.divEqualheight()
    })
  }

  GetSector(){
    this.nss.GetNeedSector("").subscribe((ndss) => {
      if (ndss.length > 0) {
        if (ndss[0].SECTORID > 0) {
          this.ndss = ndss;
          this.checkBoxCtrl();
        }
      }
    });
  }

  public NeedSector= []
  GetSelectedSector(SectorValue, e) {
    var index = this.NeedSector.indexOf(parseFloat(SectorValue));
    if (e.target.checked == true) {
      this.NeedSector.push(parseFloat(SectorValue))
    } else {
      this.NeedSector.splice(index, 1);
    } 
    //console.log("NeedSector", this.NeedSector)   
  }
  Search(){    
      this.GetSuccessStory(this.NeedSector)
  }
  
  checkBoxCtrl() {
    setInterval(function () {
      $("input[type='checkbox']").each(function () {
        CheckCtrl($(this))
        $(this).click(function () {
          CheckCtrl($(this))
        })
        function CheckCtrl(thisO) {
          if (thisO.is(":checked")) {
            thisO.parents(".checkbox").addClass("active")
          } else {
            thisO.parents(".checkbox").removeClass("active")
          }
        }
      });
    }, 1000)
  }

  divEqualheight() {   
    setTimeout(function () {
      $(".sameHeightWrap").each(function () {
        $(this).find(".sameHeight").css("height", "auto");
        var maxHeight = 0;
        $(this).find(".sameHeight").each(function () {
          if ($(this).height() > maxHeight) { maxHeight = $(this).height(); }
        });
        $(this).find(".sameHeight").height(maxHeight)
      })
    }, 200)
  }

  
  
  ngOnInit() {
    this.GetSector()
    this.GetSuccessStory(this.NeedSector)
    $(document).ready(function(){
      checkBoxStyle()
    })

    function checkBoxStyle(){
      $("input[type='checkbox']").each(function (index, element) {        
        CheckCtrl($(this))
        $(this).click(function (e) {
          CheckCtrl($(this))
        })
        function CheckCtrl(thisO) {
          if (thisO.is(":checked")) {
            thisO.parents(".checkbox").addClass("active")
          } else {
            thisO.parents(".checkbox").removeClass("active")
          }
        }
      });
    }
  }

}
