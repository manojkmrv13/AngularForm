
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Globalvar } from '../classes/globalvar';

@Injectable()
export class ConnectnowService {
  constructor(private http: HttpClient) { }

  UploadConnectNowCompanyLogo(FileToUpload: File) {
    const _formData = new FormData();
    _formData.append('upload_need_connectnow_company_logo', FileToUpload, FileToUpload.name);
    return this.http.post(Globalvar.ApiUrl + '/UploadConnectNowCompanyLogo', _formData);
  }

  UploadNeedStoriesImage(FileToUpload: File) {
    const _formData = new FormData();
    _formData.append('upload_need_stories_image', FileToUpload, FileToUpload.name);
    return this.http.post(Globalvar.ApiUrl + '/UploadNeedStoriesImage', _formData);
  }
}
