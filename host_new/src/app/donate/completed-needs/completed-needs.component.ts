import { Component, OnInit, HostListener } from '@angular/core';
import { needsService } from '../../services/needs.service';
import { NeedtypeService } from '../../services/needtype.service';
import { NeedsectorService } from '../../services/needsector.service';

declare var $ :any;
@Component({
  selector: 'completed-needs',
  templateUrl: './completed-needs.component.html',
  styleUrls: ['./completed-needs.component.css']
})
export class CompletedNeedsComponent implements OnInit {
  defaultImage = '../assets/images/image_not_available.jpg';
  constructor( 
    private needType: NeedtypeService,
    private homePageNeeds: needsService,
    private needSector: NeedsectorService,
     ) { }

  public isLoading = false;
  public isDataAvailable = true;
  public PageNo = 1;

  public ComplitetNeeds = [];
  public NeedTypes = [];
  public NeedSector = [];
  Get_ComplitetNeeds(NeedTypeId, SectorId, StatusInformation, PageNo) {
    this.homePageNeeds.GetComplitetNeeds(NeedTypeId, SectorId, StatusInformation, PageNo).subscribe((ComplitetNeedsData) => {
      //this.ComplitetNeeds = ComplitetNeedsData;
      if(ComplitetNeedsData.length > 0){        
        ComplitetNeedsData.forEach(element => {
          this.ComplitetNeeds.push(element)
        });
        this.slickSlider();
        this.divEqualheight()
      }else{
        this.isDataAvailable = false
      }
      //console.log(" ComplitetNeeds = ", this.ComplitetNeeds)
    });
  }

  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    var footerHeight = document.getElementById("footerSection").offsetHeight
    const windowScrollTop = $(window).scrollTop()
    const windowHeight = (window.innerHeight + footerHeight) - 100;
    const documentHeight = document.documentElement.scrollHeight;
    if ((windowScrollTop > documentHeight - windowHeight) && this.isLoading === false && this.isDataAvailable === true) {
      $("#dataLoader").show();
      this.isLoading = true;
      this.PageNo = this.PageNo + 1;
      //this.GetReloadAPI();
      this.Get_ComplitetNeeds(this.NeedTypes, this.NeedSector, 'Donation Completed', this.PageNo);
    }
  }

  

  
  GetSelectedSector(SectorValue, e) {
    var index = this.NeedSector.indexOf(parseFloat(SectorValue));
    if (e.target.checked == true) {
      this.NeedSector.push(parseFloat(SectorValue))
    } else {
      this.NeedSector.splice(index, 1);
    }
  }

  
  GetSelectedNeedType(NeedTypeValue, e) {
    var index = this.NeedTypes.indexOf(parseFloat(NeedTypeValue));
    if (e.target.checked == true) {
      this.NeedTypes.push(parseFloat(NeedTypeValue))
    } else {
      this.NeedTypes.splice(index, 1);
    }
    //this.GetReloadAPI();
  }

  public needTypeData = []
  GetNeedType(){
    this.needType.GetNeedTypes("").subscribe((ndt) => {
      if (ndt.length > 0) {
        if (ndt[0].NEEDTYPEID > 0) {
          this.needTypeData = ndt;
          //console.log("needTypeData", this.needTypeData)
          this.checkBoxCtrl();
        }
      }
    });
  }

  public needSectorData = []
  GetNeedSector(){
    this.needSector.GetNeedSector("").subscribe((ndss) => {     

      if (ndss.length > 0) {
        if (ndss[0].SECTORID > 0) {
          var sectorItems = []
          ndss.forEach(element => {
            if(element.HIDE_SECTOR === 0){
              sectorItems.push(element)
            }
          });      
          this.needSectorData =  sectorItems    
          
          this.checkBoxCtrl();
        }
      }


    });
  }

  Search() {
    this.ComplitetNeeds = []
    this.PageNo = 1;
    this.isLoading = false;
    this.isDataAvailable = true;
    this.Get_ComplitetNeeds(this.NeedTypes, this.NeedSector, 'Donation Completed', this.PageNo);
  };
  GetClearFliterAPI() {    
    $(".filterWapper").find("input[type='checkbox'], input[type='radio']").prop("checked", false);
    this.NeedTypes = [];
    this.NeedSector = [];
    this.Get_ComplitetNeeds('', '', 'Donation Completed', this.PageNo);
    this.checkBoxCtrl()
  }


  ngOnInit() {
    this.GetNeedType();
    this.GetNeedSector() ;
    this.Get_ComplitetNeeds('', '', 'Donation Completed', this.PageNo);
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

  slickSlider() {
    setTimeout(function () {
      $('.imgSlider').not('.slick-initialized').slick({
        arrows: false,
        dots: true,
        infinite: false,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: true
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
}
