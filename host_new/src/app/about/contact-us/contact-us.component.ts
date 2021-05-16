import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Globalvar } from '../../classes/globalvar';
import { NgxSpinnerService } from 'ngx-spinner';
import { Title, Meta } from '@angular/platform-browser';

declare var $: any
@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  public title = "HoSh - Contact Us"
  public description = "Get in touch. Write us an email. Call us. Or even feel free to drop into our office.";

  constructor(
    private titleService: Title, 
    private metaService: Meta,
    private http: HttpClient,
    private spinner: NgxSpinnerService,
    ) { }

  public nameInput;
  public mobileInput; 
  public emailIdInput;
  public feedbackInput;

  PostContactusForm(form){  
    if(form.valid){
      this.spinner.show()
      var body = {
        CONTACT_NAME : $("#name").val(),
        CONTACT_NUMBER : parseInt($("#Mobile").val()),
        CONTACT_EMAILID : $("#emailId").val(),
        FEEDBACK : $("#Feedback").val()
      }
      
      this.http.post(Globalvar.ApiUrl + "/PostContactUs", body).subscribe((result) => {         
        this.spinner.hide();
        $("#name, #Mobile, #emailId, #Feedback").val('')
        setTimeout(() => {
          alert("Thank you!, Your message has been sent successfully. We will contact you very soon!") 
        },200)
        

      })
    }

  }

  ngOnInit() {
    
    this.titleService.setTitle(this.title);
    this.metaService.updateTag({name:'title', content:this.title});
    this.metaService.updateTag({name:'description', content:this.description});
    this.metaService.updateTag({name:'twitter:title', content:this.title});
    this.metaService.updateTag({name:'twitter:description', content:this.description});
    this.metaService.updateTag({property:'og:title', content:this.title});
    this.metaService.updateTag({property:'og:description', content:this.description});

    $(document).on('keydown', '.NumberOnly', function (e) { -1 !== $.inArray(e.keyCode, [46, 8, 9, 27, 13]) || /65|67|86|88/.test(e.keyCode) && (!0 === e.ctrlKey || !0 === e.metaKey) || 35 <= e.keyCode && 40 >= e.keyCode || (e.shiftKey || 48 > e.keyCode || 57 < e.keyCode) && (96 > e.keyCode || 105 < e.keyCode) && e.preventDefault() });
    $(".inputText").each(function () {
      $(this).on("blur", function () {
        if ($(this).val()) {
          $(this).closest(".form-group").removeClass("has-error has-danger")
        }
      })
    })
    $(".emailId").each(function () {
      $(this).on("blur", function () {
        if ($(this).val()) {
          var email_regex = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/; 
          if (!$(this).val().match(email_regex) && $(this).val().length > 0) {
            $(this).focus().closest(".form-group").addClass("has-error has-danger")
            $(".with-error").text('Please Enter Valid Email ID')
          } else {
            $(this).closest(".form-group").removeClass("has-error has-danger")
          }
        }else{
          $(this).closest(".form-group").removeClass("has-error has-danger")
        }
      })
    })

    $(".mobileNoCtrl").each(function () {
      $(this).blur(function () {
        if ($(this).val()) {
          if ($(this).val() == undefined || $(this).val().length < $(this).attr('maxlength')) {
            $(this).focus().closest(".form-group").addClass("has-error has-danger")
            $(".with-error").text('Please Enter Valid Mobile No')
          } else {
            $(this).closest(".form-group").removeClass("has-error has-danger")
          }
        }else{
          $(this).closest(".form-group").removeClass("has-error has-danger")
        }
      })
    })
  }

}
