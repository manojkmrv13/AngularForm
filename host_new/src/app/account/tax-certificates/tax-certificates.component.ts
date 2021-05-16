
import { Component, OnInit } from '@angular/core';
import { TaxCertificatesService } from '../../services/tax-certificates.service';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core'

declare var $: any;
declare var xepOnline: any;
import * as jsPDF from 'jspdf';
import * as _moment from 'moment';
import { default as _rollupMoment } from 'moment';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Globalvar } from '../../classes/globalvar';
import { NgxSpinnerService } from 'ngx-spinner';

const moment = _rollupMoment || _moment;

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_FORMATS = {
  parse: {
    dateInput: 'YYYY-MM-DD',
  },
  display: {
    dateInput: 'YYYY-MM-DD',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'YYYY-MM-DD',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

declare var jsPDF: any;
declare var html2canvas: any;

@Component({
  selector: 'app-tax-certificates',
  templateUrl: './tax-certificates.component.html',
  styleUrls: ['./tax-certificates.component.css'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
  ]
})
export class TaxCertificatesComponent implements OnInit {
  public From_MinDate = new Date(1900, 1, 1);
  public From_MaxDate = new Date();

  public To_MinDate = new Date(1900, 1, 10);
  public To_MaxDate = new Date();
  date = new FormControl(moment());

  constructor(
    private TaxCertificates: TaxCertificatesService,
    private router: Router,
    private spinner: NgxSpinnerService,
  ) { }

  public DonorID;
  public BeginDate;
  public EndDate;
  public TaxCertificatesList = [];
  public CWUS_SCHEDULE_F;
  public CWUS_SCHEDULE_E;
  public STARTDATE = addMonths(new Date(), -1)
  public ENDDATE = new Date()



  SetMinMaxDate(date) {
    //console.log("Date aaa", date, date.id)
    if (date.id == 'mat-datepicker-0') {
      this.To_MinDate = new Date(date._datepickerInput.value._i.year, date._datepickerInput.value._i.month, date._datepickerInput.value._i.date)
    } else {
      this.From_MaxDate = new Date(date._datepickerInput.value._i.year, date._datepickerInput.value._i.month, date._datepickerInput.value._i.date)
    }
  }

  public TotalOFTaxRecipt;
  GetNeedPayments(DonorId, BeginDate, EndDate) {
    this.TaxCertificates.GetNeedPayments(DonorId, BeginDate, EndDate).subscribe((result) => {
      this.TaxCertificatesList = result;
      var totalAmount = 0;
      result.forEach(element => {
        totalAmount += element.AMOUNT
      });
      this.TotalOFTaxRecipt = totalAmount
      //console.log("My Receipts List", this.TaxCertificatesList, totalAmount)
    })
  }

  ReplaceWithComa(value) {
    var thisVWithComa, value = value.toString()
    thisVWithComa = value.replace(/[\D\s\._\-]+/g, "");
    thisVWithComa = thisVWithComa ? parseInt(thisVWithComa, 10) : 0;
    return thisVWithComa = (thisVWithComa === 0) ? "" : thisVWithComa.toLocaleString("en-US");
  }

  SortDate(form) {
    if (form.valid) {
      this.BeginDate = $("#startDate").val();
      this.EndDate = $("#endDate").val();
      //this.onloadSetDate(this.BeginDate)
      this.GetNeedPayments(this.DonorID, this.BeginDate, this.EndDate)
    }
  }


  GetDateFormat(thisO) {
    var nDate = thisO.val().split('/'), newDate, Year, Month, Day
    Year = nDate[2], Month = nDate[0], Day = nDate[1]
    newDate = Year + "-" + Month + "-" + Day
    return thisO.attr("data-val", newDate)
  }

  DownloadPDF() {
    this.spinner.show()
    //return xepOnline.Formatter.Format('content', { render: 'download' });
    this.BeginDate = $("#startDate").val();
    this.EndDate = $("#endDate").val();
    //this.onloadSetDate(this.BeginDate)
    this.GetNeedPayments(this.DonorID, this.BeginDate, this.EndDate)

    this.TaxCertificates.GetTaxCertificates(this.DonorID, this.BeginDate, this.EndDate).subscribe((result) => {
      //console.log("result", result)
      var newHref = Globalvar.ApiUrlPdf + '/export/' + result
      $("#downloadPDF").attr("href", newHref)
      setTimeout(() => {
        document.getElementById("downloadPDF").click();
        this.spinner.hide()
      }, 1000);
      // https://hosh.resultrix-apps.com/wvi-api/export/{{FILE_NAME_RETURNED_FROM_ABOVE_API}}
    })
  }

  GeneratePDF() {
    $('#cmd').click(function () {
      html2canvas($('#content'), {
        onrendered: function (canvas) {
          //var img=canvas.toDataURL("image/png");
          var doc = new jsPDF('p', 'pt', 'a4');
          var specialElementHandlers = {
            '#editor': function (element, renderer) {
              return true;
            }
          };

          doc.fromHTML($('#content').get(0), 20, 20, {
            'width': 570,
            'elementHandlers': specialElementHandlers
          });
          //doc.addImage(img,'JPEG',20,20);
          doc.save('sample-file.pdf');
        }
      });
    });

  }
  onloadSetDate() {
    var dateObj = addMonths(new Date(), -1)

    var month = dateObj.getUTCMonth(); //months from 1-12
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();
    //console.log("this.To_MinDate = " + year + " = " + month + " = " + day)
    this.To_MinDate = new Date(year, month, day)
  }

  public ChildSponsership

  ngOnInit() {
    this.DonorID = Globalvar.getDonorId()


    //sthis.onloadSetDate()
    setTimeout(() => {
      this.BeginDate = $("#startDate").val();
      this.EndDate = $("#endDate").val();
      this.GetNeedPayments(this.DonorID, this.BeginDate, this.EndDate)
    }, 200);



    this.ChildSponsership = localStorage.getItem('ChildSponsership')
  }

}
function addMonths(date, months) {
  date.setMonth(date.getMonth() + months);
  return date;
}
