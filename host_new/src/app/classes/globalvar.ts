import { Injectable, EventEmitter, Inject, PLATFORM_ID } from "@angular/core";
import { HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { isPlatformBrowser } from "@angular/common";

@Injectable()

export class Globalvar {
    isBrowser: boolean;
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }
    // public static ApiUrl = 'http://localhost:57907/WVI';
    //public static ApiUrlPdf = 'https://hosh.resultrix-apps.com/wvi-api'
    //public static ApiUrl = 'https://hosh.resultrix-apps.com/wvi-api/WVI';    

    // public static ApiUrl = 'https://adminuat.hopetoshine.in/WVI/';
    // public static WebUrl = 'https://websiteuat.hopetoshine.in/';
    // public static ApiUrlPdf = 'https://adminuat.hopetoshine.in'

    public static ApiUrl = environment.ApiUrl;
    public static WebUrl = environment.WebUrl;
    public static ApiUrlPdf = environment.ApiUrlPdf;

    public static CCA_MERCHANTID = environment.CCA_MERCHANTID;
    public static CCA_ACCESSCODE = environment.CCA_ACCESSCODE;
    public static CCA_ENCRYPTION_KEY = environment.CCA_ENCRYPTION_KEY;   

    public static CCA_MERCHANTID_NRI = environment.CCAFCRA_MERCHANTID;
    public static CCA_ACCESSCODE_NRI = environment.CCAFCRA_ACCESSCODE;
    public static CCA_ENCRYPTION_KEY_NRI = environment.CCAFCRA_ENCRYPTION_KEY;   



    public static CCA_REQUEST_URL = environment.CCA_REQUEST_URL;

    public static AXIS_ACCESSCODE = environment.AXIS_ACCESSCODE;
    public static AXIS_REQUEST_URL = environment.AXIS_REQUEST_URL;
    public static AXIS_ENCRYPTION_KEY = environment.AXIS_ENCRYPTION_KEY;
    public static AXIS_SECURE_SECRET = environment.AXIS_SECURE_SECRET;

    //public static DONORID = 1;
    public static donorIdChanged: EventEmitter<number> = new EventEmitter();
    public static StatusInformationList = [
        { "StatusId": "-1", "StatusName": "--Select--" },
        { "StatusId": "Proposed", "StatusName": "Proposed" },
        { "StatusId": "Rejected", "StatusName": "Rejected" },
        { "StatusId": "Approved", "StatusName": "Approved" },
        { "StatusId": "Paused", "StatusName": "Paused" },
        { "StatusId": "Suspended", "StatusName": "Suspended" },
        { "StatusId": "Active", "StatusName": "Active" },
        { "StatusId": "Donation Completed", "StatusName": "Donation Completed" },
        { "StatusId": "Incomplete", "StatusName": "Incomplete" },
        { "StatusId": "Donation Transfer", "StatusName": "Donation Transfer" },
        { "StatusId": "WIP", "StatusName": "WIP" },
        { "StatusId": "Closed", "StatusName": "Closed" }
    ];

    public static PriorityList = [
        { "id": "-1", "itemName": "--Select--" },
        { "id": "High", "itemName": "High" },
        { "id": "Medium", "itemName": "Medium" },
        { "id": "Low", "itemName": "Low" },
        { "id": "Emergency", "itemName": "Emergency" }
    ];

    public static SeverityList = [
        { "id": "-1", "itemName": "--Select--" },
        { "id": "Trending", "itemName": "Trending" },
        { "id": "Most Active", "itemName": "Most Active" },
        { "id": "Urgent", "itemName": "Urgent" },
        { "id": "Most Funded", "itemName": "Most Funded" },
        { "id": "Ending Soon", "itemName": "Ending Soon" },
    ];

    public static CommentDocumentTypeList = [
        { "id": "None", "itemName": "None" },
        { "id": "Image", "itemName": "Image" },
        { "id": "Document", "itemName": "Document" },
        { "id": "Link", "itemName": "Link" }
    ];

    public static NeedDocumentTypeList = [
        { "id": "-1", "itemName": "--Select--" },
        { "id": "Beneficiary Consent", "itemName": "Beneficiary Consent" },
        { "id": "Beneficiary Photo", "itemName": "Beneficiary Photo" },
        { "id": "Link", "itemName": "Link" },
        { "id": "Need Image", "itemName": "Need Image" },
        { "id": "Need Video", "itemName": "Need Video" },
        { "id": "Need Progress Photo", "itemName": "Need Progress Photo" },
        { "id": "Need Completion Photo", "itemName": "Need Completion Photo" },
        { "id": "Supporting Document", "itemName": "Supporting Document" },
        { "id": "Progress Document", "itemName": "Progress Document" },
        { "id": "Brochure", "itemName": "Brochure" },
        { "id": "Phase I Photo", "itemName": "Phase I Photo" },
        { "id": "Phase II Photo", "itemName": "Phase II Photo" },
        { "id": "Phase III Photo", "itemName": "Phase III Photo" },
        { "id": "Phase IV Photo", "itemName": "Phase IV Photo" },
        { "id": "Phase V Photo", "itemName": "Phase V Photo" },
        { "id": "Phase VI Photo", "itemName": "Phase VI Photo" },
        { "id": "Phase VII Photo", "itemName": "Phase VII Photo" },
        { "id": "Phase VIII Photo", "itemName": "Phase VIII Photo" },
        { "id": "Closure Report", "itemName": "Closure Report" }
    ];

    static getFunctionName() {
        //console.log("function loaded ")
    }



    static convertToDate(str) {
        var mnths = {
            Jan: "01", Feb: "02", Mar: "03", Apr: "04", May: "05", Jun: "06",
            Jul: "07", Aug: "08", Sep: "09", Oct: "10", Nov: "11", Dec: "12"
        },
            date = String(str).split(' ');
        return [date[3], mnths[date[1]], date[2]].join("-");
    }
    static readCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    static deleteCookie(name) {
        document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    };

    static prepareHeader() {
        var headers = new HttpHeaders();
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        var accessToken = "";
        if (currentUser != null) {
            accessToken = currentUser[0].accessToken;
        }
        headers = headers.set('Authorization', 'Bearer ' + accessToken);
        return {
            headers: headers
        }
    }

    
    static getDonorId() {
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        // console.log(currentUser);
        if (currentUser != null) {
            return currentUser[0].DONORID;
        }
        return 0;
    }
    static getApiUserId() {
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser != null) {
            return currentUser[0].API_USERID;
        }
        return 0;
    }

    static setDonorId(DonorID) {
        this.donorIdChanged.emit(DonorID);
    }
 
}