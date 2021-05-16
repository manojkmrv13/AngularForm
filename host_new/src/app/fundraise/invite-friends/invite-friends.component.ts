import { Component, OnInit, NgZone, Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Globalvar } from '../../classes/globalvar';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router, NavigationEnd, NavigationStart, NavigationError } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgForm } from '@angular/forms';
import { needsService } from '../../services/needs.service';
declare var $: any;
declare var require: any;
declare var needShareDropdown: any;
@Component({
  selector: 'app-invite-friends',
  templateUrl: './invite-friends.component.html',
  styleUrls: ['./invite-friends.component.css']
})
export class InviteFriendsComponent implements OnInit {
  contactList: any;
  GoogleContactList = []
  public InviteFriendList = []
  public ResultID: any;
  public DONORID;
  constructor(
    private http: HttpClient,
    private ns: needsService,
    private activeRoute: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private router: Router,
    private _ngZone: NgZone,
    @Inject(PLATFORM_ID) platformId: string
  ) {
    window['hoshDataGoogleRef'] = { component: this, zone: _ngZone };

    this.isBrowser = isPlatformBrowser(platformId);
    if (this.isBrowser) {
      window['jQuery'] = $;
      window['$'] = $;
      require('../../../assets/js/jquery-ui.js');
      require('../../../assets/js/jquery.fancybox.min.js');
      // require('../../../assets/js/cPager.js');
      require('../../../assets/js/needsharebutton.min.js');
     
    }
  }
  public isBrowser: boolean;


  public SelectedItem = []
  // AddRemoveItem(e) {
  //   // alert(e.target.value)
  //   var index = this.SelectedItem.indexOf(e.target.value);
  //   if (e.target.checked == true) {
  //     this.SelectedItem.push(e.target.value)
  //   } else {
  //     this.SelectedItem.splice(index, 1);
  //   }
  //   console.log("SelectedItem", this.SelectedItem)
  //   this.addContacts()
  // }

  public NewGoogleContactList = [];
  // addContacts() {
  //   this.NewGoogleContactList = [];
  //   this.SelectedItem.forEach(element1 => {
  //     var keepgoing = true
  //     this.contactList.forEach(element => {
  //       if (keepgoing) {
  //         if (element1 === element.Email) {
  //           this.NewGoogleContactList.push(element)
  //           keepgoing = false
  //         }
  //       }
  //     });
  //   });
  //   console.log("this.NewGoogleContactList", this.NewGoogleContactList)
  //   this.CheckAddedItems()
  // }

  // SearchContactByText(e){    
  //   if(e.target.value !== '' || e.target.value !== undefined){
  //     var NewList = []; this.GoogleContactList = []
  //     var searchval = e.target.value
  //     this.contactList.forEach(element => {
  //       if (String(element.FullName.toLowerCase()).includes(searchval.toLowerCase()) || String(element.Email.toLowerCase()).includes(searchval.toLowerCase())) {
  //         NewList.push(element)
  //       }
  //     });      
  //     this.GoogleContactList = NewList
  //     this.CheckAddedItems()
  //   }else{
  //     this.GoogleContactList = this.contactList
  //     this.CheckAddedItems()
  //   }  

  //   PagerNav(); 
  //   console.log(this.GoogleContactList)
  // }

  // CheckAddedItems(){
  //   setTimeout(() => {
  //     this.NewGoogleContactList.forEach(element => {
  //       $("#GC"+element.ID).prop("checked", true)
  //     }); 
  //   }, 100);      
  // }

  // SelectAll_Contacts(e){
  //   console.log(e.target.checked)    
  //   if(e.target.checked){
  //     this.NewGoogleContactList = this.GoogleContactList
  //     this.GoogleContactList.forEach(element => {
  //       $("#GC"+element.ID).prop("checked", true)
  //     });
  //   }else{
  //     this.NewGoogleContactList = []
  //     this.GoogleContactList.forEach(element => {
  //       $("#GC"+element.ID).prop("checked", false)
  //     });
  //   }    
  // }

  // deleteG_C_Intry(id, emailID) { 
  //   console.log("e ID", emailID)   
  //   for(var i = 0; i < this.SelectedItem.length; i++){
  //     if(String(this.SelectedItem[i]) === String(emailID)){
  //       this.SelectedItem.splice(i, 1)
  //       break;
  //     } 
  //   } 
  //   $("#GC" + id).prop("checked", false)
  //   this.addContacts()
  //   console.log(this.NewGoogleContactList)
  //   //this.checkBoxCtrl()
  // }

  // Edit_C_Intry(index, item) {
  //   if ($("#info" + index).parents(".NewDataRow").hasClass('active')) {
  //     this.NewGoogleContactList.forEach(element => {
  //       if (item == element.Email) {
  //         element.FullName = $("#Nameinfo" + index).val()
  //       }
  //     });
  //     console.log("this.NewGoogleContactList", this.NewGoogleContactList)
  //     console.log("this.SelectedItem", this.SelectedItem)
  //     $("#info" + index).parents(".NewDataRow").removeClass("active")
  //   } else {
  //     $("#info" + index).parents(".NewDataRow").addClass("active")
  //   }
  // }

  public SelectedContacts = []
  SearchContactByText(event) {
    var searchText = event.target.value
    if (event.target.value) {
      this.GoogleContactList.forEach(element => {
        if (String(element.FullName.toLowerCase()).includes(searchText.toLowerCase()) || String(element.Email.toLowerCase()).includes(searchText.toLowerCase())) {
          element.visible = true
        } else {
          element.visible = false
        }
      });
    } else {
      this.GoogleContactList.forEach(element => {
        element.visible = true
      });
    }
    //this.SelectedContacts = this.GoogleContactList
    PagerNav();
  }


  public selectedContacts = false

  AddRemoveItem(event, emailID) {
    //console.log(event.target.checked)
    if (event.target.checked) {
      for (var i = 0; i < this.GoogleContactList.length; i++) {
        if (this.GoogleContactList[i].Email === emailID) {
          this.GoogleContactList[i].checked = true;
          break;
        }
      }
      this.selectedContacts = true;
    } else {
      for (var i = 0; i < this.GoogleContactList.length; i++) {
        if (this.GoogleContactList[i].Email === emailID) {
          this.GoogleContactList[i].checked = false;
          break;
        }
      }
    }
    this.checkSelectedContact()
    //console.log(this.GoogleContactList)
    //this.SelectedContacts = this.GoogleContactList
  }

  checkSelectedContact() {
    this.selectedContacts = false;
    for (var i = 0; i < this.GoogleContactList.length; i++) {
      if (this.GoogleContactList[i].checked) {
        this.selectedContacts = true;
        break;
      }
    }
  }

  Edit_C_Intry(event, id) {
    $("#Edit" + id).parents(".NewDataRow").addClass("active")
    $("#Nameinfo" + id).focus();
  }

  saveName(event, id) {
    if (event.target.value) {
      for (var i = 0; i < this.GoogleContactList.length; i++) {
        if (this.GoogleContactList[i].ID === id) {
          this.GoogleContactList[i].FullName = event.target.value;
          break;
        }
      }
    }
    $("#Nameinfo" + id).parents(".NewDataRow").removeClass("active")
  }

  SelectAll_Contacts(e) {
    if (e.target.checked) {
      this.GoogleContactList.forEach(element => {
        element.checked = true
      });
    } else {
      this.GoogleContactList.forEach(element => {
        element.checked = false
      });
    }
    this.checkSelectedContact()
  }

  GetGoogleContact() {
    window.open("/oauth/oauth.aspx", "Ratting", "width=550,height=500,0,status=0,");
  }

  contactTab() {
    var thisO = this;
    $(".contactDataWrapper").hide()
    $(".customeContactData").show()
    $(".contactTabWraper").on("click", ".contactTab", function () {
      if ($(this).not(".active")) {
        var targetDiv = $(this).attr('data-target');
        $(this).addClass("active").siblings().removeClass("active");
        $(this).parents(".contactTabWraper").siblings().hide();
        $("." + targetDiv).show();
      }
    })
  }




  public shareTitle
  public shareText
  public shareMedia
  public needID;
  
  inviteNowGoogleContact() {
    this.spinner.show();
    var time = 0
    this.NewGoogleContactList.forEach(element => {
      var body = {
        'DONORID': this.DONORID,
        'FUNDRAISEID': this.ResultID,
        'INVITED_NAME': element.FullName,
        'INVITED_EMAILID': element.Email,
        'INVITED_MOBILE': '',
        'DESCRIPTION': ''
      }
      this.http.post(Globalvar.ApiUrl + "/PostFundRaiseInvites", body).subscribe((result) => {
        //console.log("ifjoj", result)
        time = time + 1;
        if (this.NewGoogleContactList.length == time) {
          this.NewGoogleContactList = [];
          $(".inviteFriendBox").addClass("hidden");
          $(".ThankYouBox").removeClass("hidden");
          localStorage.removeItem('ResultID')
          //console.log("invite now Result } ", result)
          this.shareText = result[0].STATUSES[0].status1
          // this.spinner.hide();
          // this.shareTitle = 'Hope to shine';
          // this.shareMedia = Globalvar.WebUrl + 'assets/images/hosh-hope-to-shine.png'
          console.log("share detail", this.shareTitle, this.shareText, this.shareMedia)
          this.needShareDropdownF(this.shareTitle, this.shareText, this.shareMedia);
        }
      })
    })
  }

  ListOfInvitees(){
    document.getElementById('ListOfInvitees').click()
  }

  needShareDropdownF(title, text, media) {
    console.log(title);
    console.log(text);
    console.log(media);
    // let a=title;  let b="hi sin";

    //console.log("==== Share Button =====")
    new needShareDropdown(document.getElementById('shareButtonF'), {
      boxForm: 'vertical', // horizontal or vertical            
      position: 'bottomLeft', // top / middle / bottom + Left / Center / Right
      url: text, //window.location.href,
      title: title, //root.getTitle(),
      image: media, //root.getImage(),
      // image: root.getImage(),
      description: text, //root.getDescription(),
    });
    setTimeout(function () {
      $('.need-share-button_linkedin').after('<span class="need-share-button_link-box need-share-button_link need-share-button_twitter button_watsapp"  id="whatsApp" data-text="' + text + '" data-action="share/whatsapp/share"></span>');
    }, 100);

    setTimeout(function () {
      $('#whatsApp').click(function () {
        var text = $(this).attr('data-text');
        window.open("https://api.whatsapp.com/send?text=" + text, "myWindow", "width=600,height=500");
      });
    }, 500);

  }

  public I_F_NAME;
  public I_F_EMAILID;
  public I_F_MOBILE;
  InviteFriendsOther(form: NgForm) {
    //console.log("form", form)
    if (form.valid) {
      var friendDetail = {
        'FullName': form.value.InviteFriendName,
        'Email': form.value.InviteFriendEmail,
        'MOBILE_NO': form.value.InviteFriendContactNo,
        'INVITE_SOURCE': 'CUSTOM'
      }

      var IsContains = false;
      this.InviteFriendList.forEach(elem1 => {
        if (elem1.Email === friendDetail.Email) {
          IsContains = true;
          return false;
        }
      });

      if (IsContains == false) {
        this.InviteFriendList.push(friendDetail);
        $("#InviteFriendName, #InviteFriendEmail, #InviteFriendContactNo").val('')
      } else {
        alert('This email ID is already added.')
      }
      //console.log("friendDetail", friendDetail)
      //console.log("InviteFriendList", this.InviteFriendList)
    }
  }

  deleteIntry(e) {
    this.InviteFriendList.splice(e, 1);
  }




  removeWhiteSpace(e) {
    return e.target.val.replace(/^\s+|\s+$|\s+(?=\s)/g, "");
  }

  public returnUrl;

  inviteNow() {
    var time = 0
    this.spinner.show()
    this.GoogleContactList.forEach(element => {
      if (element.checked) {
        this.InviteFriendList.push(element)
      }
    });
    //console.log("all data", this.InviteFriendList)
    this.InviteFriendList.forEach(element => {
      var body = {
        'DONORID': this.DONORID,
        'FUNDRAISEID': this.ResultID,
        'INVITED_NAME': element.FullName,
        'INVITED_EMAILID': element.Email,
        'INVITED_MOBILE': element.MOBILE_NO,
        'DESCRIPTION': '',
        'INVITE_SOURCE': element.INVITE_SOURCE
      }
      console.log("PostFundRaiseInvites", body)
    var postid = this.activeRoute.snapshot.paramMap.get('id');
      this.ns.getNeeds(postid, "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "").subscribe((nds) => {
            
        if (nds.length > 0) {
            if (nds[0].NEEDID > 0) {
                
                this.shareTitle = nds[0].NEED_NAME;
                this.shareText = Globalvar.WebUrl + this.router.url;
                this.shareMedia = nds[0].NEED_THUMBNAIL_ACTUAL_IMAGE_FILEPATH;
                console.log(this.shareMedia,this.shareText,this.shareTitle+"fghgfhg")
                console.log(nds[0]);
            }
        }
    });
      this.http.post(Globalvar.ApiUrl + "/PostFundRaiseInvites", body).subscribe((result) => {
        time = time + 1;
        
        console.log("invite now Result } ", result)
        if (this.InviteFriendList.length == time) {
          if (result[0].STATUSES[0].ResultId > 0) {
            this.InviteFriendList = [];
            $(".inviteFriendBox").addClass("hidden");
            $(".ThankYouBox").removeClass("hidden");
            localStorage.removeItem('ResultID')
            console.log(result[0].STATUSES[0].title)
            this.shareText = result[0].STATUSES[0].status1
            this.spinner.hide()
             this.shareTitle = 'Hope to shine';
             console.log(this.shareTitle);
            
      //this.shareTitle = ImpactedLives[0].TITLE;
      // this.shareText = Globalvar.WebUrl + this.router.url
      // this.shareMedia = ImpactedLives[0].IMPACTED_LIVES_IMAGE_1_FILEPATH; 
            // this.shareMedia = Globalvar.WebUrl + this.router.url
            
            // console.log("share detail", this.shareTitle, this.shareText, this.shareMedia)
            this.needShareDropdownF(this.shareTitle, this.shareText, this.shareMedia);
            // console.log("share", this.shareTitle, this.shareText, this.shareMedia)
          }else{
            alert(result[0].STATUSES[0].status1)
          }
        }
      })
    })
  }

  sendUrlWhatsApp(link) {

    var url = link.replace(/ /g, '-');
    //console.log("url = ", url)
    window.open('https://api.whatsapp.com/send?text=' + url, '_blank')
  }

  ExploreNeeds() {
    this.router.navigate(['/fundraising']);
  }

  // public RootForInviteFrind;
  // public Other = false
  // public Gmail = false
  // CheckRootInviteFriend(root) {
  //   var thisO = this;
  //   if (root == 'Other') {
  //     thisO.Other = true
  //   } else if (root == 'Gmail') {
  //     thisO.Gmail = true
  //   }
  //   localStorage.removeItem('InviteFrom')
  // }

  public GmailContacts = []

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
    }, 100)
  }

  public GoogleData = []
  ngOnInit() {
    this.needID = this.activeRoute.snapshot.paramMap.get('id');
    console.log(this.needID);
    Globalvar.donorIdChanged.subscribe(
      (id: number) => {
        this.DONORID = id;
      }
    );

    this.contactTab()
    //this.RootForInviteFrind = localStorage.getItem('InviteFrom')
    this.checkBoxCtrl()
    Globalvar.donorIdChanged.subscribe(
      (id: number) => {
        this.DONORID = id;
      }
    );

    this.DONORID = Globalvar.getDonorId()
    $(document).on('keydown', '.NumberOnly', function (e) { -1 !== $.inArray(e.keyCode, [46, 8, 9, 27, 13]) || /65|67|86|88/.test(e.keyCode) && (!0 === e.ctrlKey || !0 === e.metaKey) || 35 <= e.keyCode && 40 >= e.keyCode || (e.shiftKey || 48 > e.keyCode || 57 < e.keyCode) && (96 > e.keyCode || 105 < e.keyCode) && e.preventDefault() });

    //this.CheckRootInviteFriend(this.RootForInviteFrind)

    if (!this.DONORID) {
      this.router.navigate(['/fundraising']);
    }

    $("inputText").each(function () {
      //$(this)
    })
    $(".emailId").each(function () {
      $(this).on("blur", function () {
        var email_regex = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/;
        if (!$(this).val().match(email_regex)) {
          $(this).focus().closest(".form-group").addClass("has-error has-danger")
          $(".with-error").text('Please Enter Valid Email ID')
        } else {
          $(this).closest(".form-group").removeClass("has-error has-danger")
        }
      })
    })

    $(".mobileNoCtrl").each(function () {
      $(this).blur(function () {
        if ($(this).val() == undefined || $(this).val().length < $(this).attr('maxlength')) {
          $(this).focus().closest(".form-group").addClass("has-error has-danger")
          $(".with-error").text('Please Enter Valid Mobile No')
        } else {
          $(this).closest(".form-group").removeClass("has-error has-danger")
        }
      })
    })

    //this.ResultID = parseFloat(Globalvar.readCookie('ResultID'))

    var PreviousUrl = localStorage.getItem('PreviousUrl')
    if (PreviousUrl.match('account/fundraising-activity')) {
      this.ResultID = localStorage.getItem('InviteMoreFriendsResuldID')
    } else {
      this.ResultID = localStorage.getItem('ResultID')
    }
    //console.log("ResultID " + this.ResultID)

    if (isNaN(parseFloat(this.ResultID))) {
      this.router.navigate(['/donate']);
    }

    //  var data = '[{"FullName":"Interface Pratiksha Puri","Email":"puripratiksha@gmail.com"},{"FullName":"","Email":"ketan.kodag@resultrix.com"},{"FullName":"Varun Sharma","Email":"varun.sharma@publicismedia.com"},{"FullName":"Anand Bhaskar","Email":"anand@evolutionco.com"},{"FullName":"","Email":"kiranmohite555@yahoo.in"},{"FullName":"","Email":"asbandassociates@gmail.com"},{"FullName":"Hardik Thakar (Google Drive)","Email":"hardik7444@gmail.com"},{"FullName":"Arjun Kodag","Email":"kodagarjun@gmail.com"},{"FullName":"HR_ZENOPT_IN","Email":"hr@zenithoptimediaindia.com"},{"FullName":"","Email":"yusuf_mansuri@fulcrumww.com"},{"FullName":"","Email":"moreshraddha3@yahoo.co.in"},{"FullName":"Neeraj Saxena","Email":"neeraj.saxena01@gmail.com"},{"FullName":"","Email":"tanawadearchana15@gmail.com"},{"FullName":"davinder kaur","Email":"davinder_kaur41@yahoo.com"},{"FullName":"","Email":"pragatiandassociate@gmail.com"},{"FullName":"Rakesh","Email":"rakesh.patil22@gmail.com"},{"FullName":"Dr J S Bhuttar","Email":"mediclix1204@gmail.com"},{"FullName":"shripal singh Garhwal","Email":"shripal80@gmail.com"},{"FullName":"Namitha K","Email":"namithak@wdc.in"},{"FullName":"rajesh gupta","Email":"directcards222@gmail.com"},{"FullName":"Brian D","Email":"brian@hgsinteractive.com"},{"FullName":"Diya Choudhury","Email":"choudhurydiya@gmail.com"},{"FullName":"Mum Borne","Email":"ravimakwana@gmail.com"},{"FullName":"","Email":"sumit.maheshwari@resultrix.com"},{"FullName":"","Email":"avni_singh@elitehrpractices.com"},{"FullName":"","Email":"smghthane@yahoo.com"},{"FullName":"Sharma, Rohit (BOM-INA)","Email":"rohit.sharma@interactiveavenues.com"},{"FullName":"Mangesh Sangekar","Email":"mangesh@evolutionco.com"},{"FullName":"Sneha Vaidya","Email":"sneha.vaidya@zenithoptimediaindia.com"},{"FullName":"","Email":"kiran.mohite26@yahoo.com"},{"FullName":"","Email":"amol.b22@hdfclife.in"},{"FullName":"Prasanna Kulkarni","Email":"prasanna.kulkarni@resultrix.com"},{"FullName":"Nikhil Agarwal","Email":"Nikhil_Agarwal@fulcrumww.com"},{"FullName":"","Email":"kingnilesh@yahoo.com"},{"FullName":"Abhijeet Deshmukh","Email":"adeshmukh@interfacecom.com"},{"FullName":"gaurav naik","Email":"gaurav.v.naik@gmail.com"},{"FullName":"","Email":"elvera@executivesearchindia.com"},{"FullName":"Harish M","Email":"pranusha@asapinfosystems.com"},{"FullName":"Harish M","Email":"harish@asapinfosystems.com"},{"FullName":"Harish M","Email":"bhavya@asapinfosystems.com"},{"FullName":"pallavi kale","Email":"pallaviskale@gmail.com"},{"FullName":"Neha Jain","Email":"neha@evolutionco.com"},{"FullName":"Satish Gowda","Email":"satishgowda28@gmail.com"},{"FullName":"Ranjit Patil","Email":"ranjit_patil@fulcrumww.com"},{"FullName":"HR","Email":"hr@appetals.com"},{"FullName":"","Email":"rashmi_salaskar@yahoo.com"},{"FullName":"","Email":"sanjaydarekar92@gmail.com"},{"FullName":"HR Department","Email":"hrd@phicreativity.com"},{"FullName":"","Email":"sumit.kumar@mediassistindia.com"},{"FullName":"Amit","Email":"amitg8@gmail.com"},{"FullName":"Vrushali Pawar","Email":"vrushali2611@gmail.com"},{"FullName":"","Email":"acharyaaniket1990@gmail.com"},{"FullName":"","Email":"ishwar.jha@appetals.com"},{"FullName":"Sumanta Parida","Email":"sumanta90parida@gmail.com"},{"FullName":"Ekta Jain","Email":"ejain@interfacecom.com"},{"FullName":"","Email":"mohite.pratima@yahoo.in"},{"FullName":"","Email":"Ketankodag@gmail.com"},{"FullName":"Arya Patnaik","Email":"arya@evolutionco.com"},{"FullName":"","Email":"dkajaria@interfacecom.com"},{"FullName":"ketan kodag","Email":"ketankodag5@gmail.com"},{"FullName":"","Email":"suhel@sayyed.in"},{"FullName":"Eco","Email":"eco@evolutionco.com"},{"FullName":"Sanjeev Vaishnav","Email":"sanjeev.v26@gmail.com"},{"FullName":"","Email":"hospitalsatyam@gmail.com"},{"FullName":"","Email":"Jadhavm32@yahoo.com"},{"FullName":"","Email":"tusharg8@gmail.com"},{"FullName":"","Email":"deven20377@gmail.com"},{"FullName":"Dhiresh Adiyeri","Email":"dhiresh@evolutionco.com"},{"FullName":"urmila kumbhar","Email":"urmilakumbhar@gmail.com"},{"FullName":"","Email":"kkodag@interfacecom.com"},{"FullName":"","Email":"Rajniandcompany@gmail.com"},{"FullName":"Mandar","Email":"mandar@studiohigh.com"},{"FullName":"Nilesh Ogale Interface","Email":"kingnilesh@yahoo.com"},{"FullName":"","Email":"rajendra.resultrix@gmail.com"},{"FullName":"Sangram Sardesai","Email":"sangramsinhsardesai@gmail.com"},{"FullName":"hemant kodag","Email":"hckodag@rediffmail.com"},{"FullName":"","Email":"sushmazagade86@gmail.com"},{"FullName":"Sumit Maheshwari","Email":"sumit.animator@gmail.com"},{"FullName":"pratima kodag","Email":"pratimakodag3@gmail.com"},{"FullName":"","Email":"hr@jobsstores.com"},{"FullName":"sunita khot","Email":"sunitakhot31@gmail.com"},{"FullName":"Sachin  Mohite","Email":"SAM.MOHITE111@gmail.com"},{"FullName":"Aditya Nayak","Email":"aditya@krackpotcomm.com"},{"FullName":"Shafiq Khan","Email":"shafiqtmb@gmail.com"},{"FullName":"ganesh londhe","Email":"ganeshlondhe28@gmail.com"},{"FullName":"Suhel Sayyed","Email":"suhel.sayyed@resultrix.com"},{"FullName":"Pratik Kapadia","Email":"pratik.kapadia@webchutney.net"},{"FullName":"Prashant Mudhalkar","Email":"prashant.m@antfarm.in"},{"FullName":"","Email":"seema_yamgekar@fulcrumww.com"},{"FullName":"","Email":"sachinvj@hdfcsales.com"},{"FullName":"Micromax Care","Email":"service.superfone@micromaxinfo.com"},{"FullName":"Sandeep Samatam","Email":"sandeep.samatam@gmail.com"},{"FullName":"","Email":"mandalankita68@gmail.com"},{"FullName":"Umesh T","Email":"umesh.tare@gmail.com"},{"FullName":"Kiran Yadav","Email":"kiran.y@intelgain.com"},{"FullName":"","Email":"dpulaveli@interfacecom.com"},{"FullName":"","Email":"prajakta.t@focusite.com"},{"FullName":"VIBHUTI PRINTERS Naresh.-Mehul.","Email":"vibhutiprinters@live.in"},{"FullName":"","Email":"sumant90parida@gmail.com"},{"FullName":"","Email":"hr@headsnminds.com"},{"FullName":"kishan Thakar","Email":"kishan.thakar89@ymail.com"},{"FullName":"Abhijeet kambli","Email":"abhi_designer@yahoo.com"},{"FullName":"Abhijeet kambli","Email":"abhijeet@evolutionco.net"},{"FullName":"","Email":"s.kandharkar@gmail.com"},{"FullName":"Sarika Bhandari","Email":"sari1312@gmail.com"},{"FullName":"KIRAN MOHITE","Email":"Karry.mohite26@gmail.com"},{"FullName":"","Email":"vijay.mayekar04@gmail.com"},{"FullName":"","Email":"makrand@akshay.com"},{"FullName":"Santosh Kadam","Email":"santosh1kadam@gmail.com"},{"FullName":"SAMEER BAJAJ","Email":"sameerbajaj111@gmail.com"},{"FullName":"anuj kodag","Email":"anuj.kodag@gmail.com"},{"FullName":"","Email":"swapna.korhale@gmail.com"},{"FullName":"","Email":"estherpawar@gmail.com"},{"FullName":"Vrushali D","Email":"vrushali.d@tcs.com"},{"FullName":"Mediclime","Email":"dipalijangam96@gmail.com"},{"FullName":"","Email":"Syshahzeen@gmail.com"},{"FullName":"Harshad Bhoir","Email":"harshadbhoir87@gmail.com"},{"FullName":"Arun Kodag","Email":"arun.kodag@gmail.com"}]';    
    //  this.contactList=JSON.parse(data);    
    //  for(var i = 0; i < this.contactList.length; i++){
    //    this.contactList[i].ID = i,
    //    this.contactList[i].MOBILE_NO = '',
    //    this.contactList[i].checked = false,
    //    this.contactList[i].visible = true
    //  }
    //  console.log("new Google Data", this.contactList)
    // this.GoogleContactList = this.contactList;
    //  PagerNav();
    // console.log("this.contactList", this.contactList)


  }

  getGoogleList(strdata) {
    //console.log("strdata", strdata)
    this.contactList = JSON.parse(strdata);
    for (var i = 0; i < this.contactList.length; i++) {
      this.contactList[i].ID = i,
        this.contactList[i].MOBILE_NO = '',
        this.contactList[i].INVITE_SOURCE = 'GMAIL',
        this.contactList[i].checked = false,
        this.contactList[i].visible = true
    }
    this.GoogleContactList = this.contactList;
    //console.log("Gmail contactList", this.contactList)
    PagerNav();
  }
}
function PagerNav() {
  setTimeout(function () {
    $('#GoogleContacts').cPager({
      pageSize: 15,
      pageIndex: 1,
      pageid: "pager",
      itemClass: "DataRow"
    });

  }, 200);
}

