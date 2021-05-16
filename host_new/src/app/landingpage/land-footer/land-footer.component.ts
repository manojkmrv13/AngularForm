import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Globalvar } from '../../classes/globalvar';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthenticateDonorUsersLeadService } from '../../services/authenticate-donor-users-lead.service';
declare var $: any;
@Component({
  selector: 'app-land-footer',
  templateUrl: './land-footer.component.html',
  styleUrls: ['./land-footer.component.css']
})
export class LandFooterComponent implements OnInit {

  isBrowser: boolean;
  constructor(
    private http: HttpClient,
    private spinner: NgxSpinnerService,
    private LoginDetail: AuthenticateDonorUsersLeadService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { 
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  public DONORID;
  public subscribEmail: string = '';

  public TOPMENU = [];
  public DONATE = [];
  public ABOUTUS = [];
  public FUNDRAISE = [];
  public ACCOUNT = [];

  GetMenu() {
    this.LoginDetail.GetMenu().subscribe((Data) => {
      //console.log("TOPMENU", Data);
      Data.forEach(element => {
        if (element.MenuName == 'Donate') {
          this.DONATE.push(element)
        } else if (element.MenuName == 'About us') {
          this.ABOUTUS.push(element)
        } else if (element.MenuName == 'Fundraise') {
          this.FUNDRAISE.push(element)
        } else if (element.MenuName == 'Account') {
          this.ACCOUNT.push(element)
        }
        this.TOPMENU = Data
      });
    });
  }
  SubmitSubscribForm(form) {
    //console.log(form)
    if (form.valid) {
      this.spinner.show();
      var ipAdd;
      $.getJSON('http://ipinfo.io', function (data) {
        ipAdd = data.ip
      });
      var body = {
        'EMAILID': form.value.SubEmail,
        'TOPIC': '',
        'IPADDRESS': ipAdd,
        'USERAGENT': '',
        'CREATEDBY': this.DONORID ? this.DONORID : ''
      }

      this.http.post(Globalvar.ApiUrl + "/PostNewsletters", body).subscribe((result) => {
        //console.log("result", result, result[0].STATUSES[0].ResultId)
        this.spinner.hide();
        setTimeout(() => {
          if (result[0].STATUSES[0].ResultId == 0) {
            alert('You are already subscribed.')
          } else {
            alert('Your details are updated successfully.')
            $("#SubEmail").val('')
          }
        }, 200)
      })
    }
  }

  PostNewsletters() {
    var trueElement = 0;
    var email_regex = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/;
    $(".formCtrl").each(function () {
      if ($(this).hasClass("emailId") && $(this).val().match(email_regex)) {
        trueElement++
      } else if ($(this).hasClass("selectCtrl") && $(this).val() !== 'Select Topic') {
        trueElement++
      } else {
        $(this).parents(".form-group").addClass("has-error")
      }
    })

    if ($(".formCtrl").length == trueElement) {
      var ipAdd;
      $.getJSON('http://ipinfo.io', function (data) {
        ipAdd = data.ip
      });

      var body = {
        'EMAILID': $("#topic_emailId").val(),
        'TOPIC': '',
        'IPADDRESS': ipAdd,
        'USERAGENT': '',
        'CREATEDBY': this.DONORID ? this.DONORID : ''
      }
      this.http.post(Globalvar.ApiUrl + "/PostNewsletters", body).subscribe((result) => {
        //console.log("result", result[0].STATUSES[0].ResultId)
        $("#topic_emailId").val('')
        if (result[0].STATUSES[0].ResultId == 0) {
          alert('You are already subscribed.')
        } else {
          alert('Your details are updated successfully.')
        }
        this.selectCtrl()
      })

    }

  }

  selectCtrl() {
    $(".selectCtrl").each(function (index, element) {
      var val = $(":selected", this).text();
      if (!$(this).parents().hasClass("selectWrap")) {
        $(this).wrap('<div class="selectWrap">').before('<div class="selectVal">' + val)
      }
      $(this).siblings(".selectVal").text($(":selected", this).text())
      $(this).change(function (e) {
        $(this).siblings(".selectVal").text($(":selected", this).text())

        if ($(":selected", this).text() !== 'Select Topic') {
          $(this).parents(".form-group").removeClass("has-error")
        }
      });

    });
  }

  scrollToTop() {
    $(window).scroll(function () {
      if ($(this).scrollTop() > 50) {
        $('.scrollToTop:hidden').stop(true, true).fadeIn();
      } else {
        $('.scrollToTop').stop(true, true).fadeOut();
      }
    });
    $(function () { $(".scrollToTop").click(function () { $("html,body").animate({ scrollTop: $("body").offset().top }, "slow"); return false }) })
  }


  ngOnInit() {

    if( this.isBrowser ){
      this.DONORID = Globalvar.getDonorId()
      this.GetMenu()
      this.selectCtrl()
      $(document).ready(function () {

        $(".emailId").each(function () {
          $(this).on("blur", function () {
            var email_regex = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/;
            if (!$(this).val().match(email_regex)) {
              $(this).closest(".form-group").addClass("has-error")
            } else {
              $(this).closest(".form-group").removeClass("has-error")
            }
          })
        })
        
      })

      this.scrollToTop()
    }

  }

}
