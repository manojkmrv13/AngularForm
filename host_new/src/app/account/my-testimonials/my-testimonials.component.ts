import { Component, OnInit, Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { TestimonialsService } from '../../services/testimonials.service';
import { Globalvar } from '../../classes/globalvar';
import { needsService } from '../../services/needs.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConnectnowService } from '../../services/connectnow.service';

declare var $: any;
@Injectable()
@Component({
  selector: 'app-my-testimonials',
  templateUrl: './my-testimonials.component.html',
  styleUrls: ['./my-testimonials.component.css']
})
export class MyTestimonialsComponent implements OnInit {

  constructor(
    private myTestimonials: TestimonialsService,
    private needs: needsService,
    private UploadStoriesImage: ConnectnowService,
    private Http: HttpClient,
    private spinner: NgxSpinnerService,
    private router: Router,
    private sanitizer: DomSanitizer,
    @Inject(PLATFORM_ID) platformId: string
  ) {
    this.sanitizer = sanitizer;
  }


  public DonorID;
  public testmonialsData = [];
  GetHomepageTestimonial(donorID) {
    this.myTestimonials.GetMyTestimonials(donorID).subscribe((data) => { 
      var newData = []      
      data.forEach(element => {
        if (element.SUPPORTING_DOCUMENT_TYPE_1 !== 'Link') { 
          newData.push(element)          
        }
      });
      this.testmonialsData = newData
      //console.log("testmonialsData", this.testmonialsData)
      setTimeout(() => {
        this.divEqualheight()
      }, 100);
      
    })
  }


  getVideoId(url) {
    var url = url;
    //var videoid = url.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
    var videoid = url.match(/(?:youtube(?:-nocookie)?\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    if (videoid != null) {
      return videoid[1];
    } else {
      //console.log("The youtube url is not valid.");
    }
  }

  CalculateRemaingAmt(NEED_AMOUNT, ADMINISTRATION_CHARGES) {
    return (NEED_AMOUNT - ADMINISTRATION_CHARGES);
  };

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
    }, 500)
  }
  isVisible(value) {
    //console.log(eval(value));
    return eval(value);
  }

  public PendingDonationsTestimonials = [];
  GetDonationsPendingTestimonialsDetails(DonorID) {
    this.needs.GetDonorDonationsPendingTestimonialsDetails(DonorID).subscribe((NeedData) => {      
      //console.log("PendingDonations }", NeedData)
      var RemoveDuplicate = []
      var SortNeeds = []
      NeedData.forEach(element => {
        if(!RemoveDuplicate.includes(element.NEEDID)){            
          RemoveDuplicate.push(element.NEEDID)
          SortNeeds.push(element)
        }
      });
      this.PendingDonationsTestimonials = SortNeeds
      //console.log("PendingDonations sort }", this.PendingDonationsTestimonials)
      
      this.GetCtrls()
    })
  }

  SomeFundtion(files: any) {
    //console.log(files);
  }

  UploaderImgFiles = [];

  SectorImageChange(files: any, eleID) {
    if (files.target.files.length > 0) {
      const fileSelected: File = files.target.files[0];
      var ext = fileSelected.name.match(/\.([^\.]+)$/)[1];
      if (ext == "jpg" || ext == "jpeg" || ext == "png" || ext == "bmp" || ext == "gif") {
        var file = {
          'ID': eleID,
          'Files': fileSelected,
        }
        if (this.UploaderImgFiles.length > 0) {
          var count = 0         
          this.UploaderImgFiles.forEach(element => {
            if (element.ID === eleID) {
                element.ID = eleID
                element.Files = fileSelected
                count++
            }                      
          });
          if(count == 0){
            this.UploaderImgFiles.push(file)
          }
        } else {
          this.UploaderImgFiles.push(file)
        }
        //console.log("UploaderImgFiles ", this.UploaderImgFiles)
      }
      else {
        alert("Please upload a valid image file.");
        $("#" + files.target.id).val('')
      }
    }
  }



  public fileObject: any;
  postTestimonials(id) {
    var type = $("[name=TType" + id + "]:checked").val();
    var Testimonial = $("#Testimonial" + id).val()
    var youtube_regex = /^(http(s)?:\/\/)?((w){3}.)?youtu(be)?(\.com)?\/.+/gm

    var video
    if (type == 'Image' && $("#Image" + id).val().length > 0 && Testimonial.length > 0) {
      var ext = $("#Image" + id).val().match(/\.([^\.]+)$/)[1];
      if (ext == "jpg" || ext == "jpeg" || ext == "png" || ext == "bmp" || ext == "gif") {  
        video = ''              
        this.PostData(id, Testimonial, type, video)
      }

    } else if (type == 'Video' && $("#Video" + id).val().match(youtube_regex) && Testimonial.length > 0) {
      video = $("#Video" + id).val();
      this.PostData(id, Testimonial, type, video)
    } else if ((type == 'Image' || type == undefined) && $("#Image" + id).val().length == 0 && Testimonial.length > 0) {
      video = ''
      type = 'None'
      this.PostData(id, Testimonial, type, video)
    } else {
      $("#TestimonialBox" + id).find(".form-control, .rx-uploadFile").each(function () {
        if ($(this).parents().css('display') !== 'none' && !$(this).val()) {
          $(this).parents(".form-group").addClass("alertMsg")
        }
      })
    }

  }
  PostData(ID, Testimonial, Type, video) {   
    if (Type == "Image" && $("#Image" + ID).val().length > 0) {
      this.UploaderImgFiles.forEach(element => {
        if (element.ID === ID) {
            this.UploadStoriesImage.UploadNeedStoriesImage(element.Files).subscribe(res => {
               var imgPath = res.toString().split(',');
               var iPath = []
               imgPath.forEach(element => {
                iPath.push(element.split(':')[1])
               });          
               this.UploadTestimonials(ID, Testimonial, Type, '', iPath[0], iPath[1], iPath[2])           
            });
        }
      })      
    }else{
      this.UploadTestimonials(ID, Testimonial, Type, video, '', '', '')
    }  
  }

  UploadTestimonials(ID, Testimonial, Type, video, img1, img2, img3){
    var body = {
      'NEEDID': ID,
      'STORY': Testimonial,
      'STORY_TYPE': 'Donors Speak',
      'SUPPORTING_DOCUMENT_TYPE_1': Type,
      'SUPPORTING_DOCUMENT_NAME_1': img1,
      'SUPPORTING_DOCUMENT_URL_1': video,
      'SUPPORTING_DOCUMENT_TYPE_2': Type,
      'SUPPORTING_DOCUMENT_NAME_2': img2,
      'SUPPORTING_DOCUMENT_URL_2': '',
      'SUPPORTING_DOCUMENT_TYPE_3': Type,
      'SUPPORTING_DOCUMENT_NAME_3': img3,
      'SUPPORTING_DOCUMENT_URL_3': '',
      'APPROVED_BY': null,
      'APPROVED_DATE': null,
      'APPROVED_STATUS': 'NotApproved',
      'USERID': this.DonorID,
    }

    console.log("body", body)
    this.Http.post(Globalvar.ApiUrl + "/PostStories", body).subscribe((data) => {
      //console.log("Partner Speak body", body);
      console.log('Partner Speak', data);
      this.spinner.hide();

      this.GetHomepageTestimonial(this.DonorID)
      this.GetDonationsPendingTestimonialsDetails(this.DonorID)
      setTimeout(() => {
        alert("Thank you! Your testimonial have been sent for approval.")
      }, 200)
    });
  }



  CalculatePercentage(NEED_AMOUNT, ADMINISTRATION_CHARGES) {
    if (NEED_AMOUNT == 0 || NEED_AMOUNT == undefined) {
      return 0.00;
    } else {
      return Math.round((100 - (((NEED_AMOUNT - ADMINISTRATION_CHARGES) / NEED_AMOUNT) * 100)));
    }
  };

  CalculateDays(END_DATE) {
    var end_Date = this.convertToDate(new Date(END_DATE));
    var current_Date = new Date().toISOString().split('T')[0];
    var fBDate = new Date(end_Date.replace(/-/g, ","));
    var fEDate = new Date(current_Date.replace(/-/g, ","));
    var oneDay = 24 * 60 * 60 * 1000;
    var diffDays = Math.round(Math.abs((fBDate.getTime() - fEDate.getTime()) / (oneDay)));
    return diffDays;

  };

  convertToDate(str) {
    var mnths = {
      Jan: "01", Feb: "02", Mar: "03", Apr: "04", May: "05", Jun: "06",
      Jul: "07", Aug: "08", Sep: "09", Oct: "10", Nov: "11", Dec: "12"
    },
      date = String(str).split(' ');
    return [date[3], mnths[date[1]], date[2]].join("-");
  }

  GetCtrls() {
    setTimeout(function () {
      $(".Testimonial_Form_Box").find(".form-control, .inputFile").each(function () {
        $(this).change(function () {
          var youtube_regex = /^(http(s)?:\/\/)?((w){3}.)?youtu(be)?(\.com)?\/.+/gm

          if ($(this).val() && $(this).hasClass("Video") && $(this).val().match(youtube_regex)) {
            $(this).parents(".form-group").removeClass("alertMsg")
          } else if ($(this).val() && $(this).hasClass("textarea")) {
            $(this).parents(".form-group").removeClass("alertMsg")
          } else if ($(this).val() && $(this).hasClass("inputFile")) {
            //console.log($(this).val())
            $(this).parents(".form-group").removeClass("alertMsg")
          } else {
            $(this).parents(".form-group").addClass("alertMsg")
          }

        })
      })

      function checkActiveCtrl() {
        $(".Testimonial_Form_Box").each(function () {
          $(this).find(".Ctrl_Type").hide()
          var activeBtn = $(this).find("[name^='TType']:checked").val()          
          $(this).find("." + activeBtn).parents(".Ctrl_Type").show()
        })
      }
      //setInterval(function () {
      checkCtrl()
      checkActiveCtrl()
      $("input[type='radio']").click(function () {
        checkCtrl()
        checkActiveCtrl()
      })
      function checkCtrl() {
        $("input[type='radio']").each(function () {
          if ($(this).prop("checked") == true) {
            $(this).parents(".radioBtnBox").addClass("active")
          } else {
            $(this).parents(".radioBtnBox").removeClass("active")
          }
        })
      }


      $(".rx-uploadFile").each(function (index, element) {
        $(this).find(".inputFile").on("change", function () {
          var FullFileName = $(this).val();
          var FileName;
          var rxFile;
          if (FullFileName.lastIndexOf("\\") > 0) {
            FileName = FullFileName.substr(FullFileName.lastIndexOf("\\"));
            rxFile = FileName.split("\\")[1];
          } else {
            rxFile = FullFileName;
          }
          $(this).closest(".rx-uploadFile").find(".rx-uploadFileName").addClass("active").html(rxFile)
        })
      });

    }, 200)

  }

  public ChildSponsership

  ngOnInit() {
    this.DonorID = Globalvar.getDonorId();
    Globalvar.donorIdChanged.subscribe(
      (id: number) => {
        this.DonorID = id;       
      }
    );
    this.GetHomepageTestimonial(this.DonorID)
    this.GetDonationsPendingTestimonialsDetails(this.DonorID)

    this.ChildSponsership = localStorage.getItem('ChildSponsership')

  }
}
