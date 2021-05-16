 
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Needtype } from '../classes/needtype';
import { Globalvar } from '../classes/globalvar';

@Injectable()
export class NeedtypeService {

  constructor(private http: HttpClient) { }

  GetNeedTypes(NeedTypeId) {
    return this.http.get<Needtype[]>(Globalvar.ApiUrl + '/GetNeedTypes?NeedTypeId=' + NeedTypeId);
  }

  DeleteNeedTypes(NeedTypeId, CreatedBy){
    return this.http.get<Needtype[]>(Globalvar.ApiUrl + '/DeleteNeedTypes?NeedTypeId=' + NeedTypeId + '&CreatedBy=' + CreatedBy);
  }

  PostNeedTypes(vardata: any){
    return this.http.post(Globalvar.ApiUrl + '/PostNeedTypes', vardata);
  }

  UploadNeedTypesIcon(FileToUpload: File) {
    const _formData = new FormData();
    _formData.append('upload_need_types_icon', FileToUpload, FileToUpload.name);

    return this.http.post(Globalvar.ApiUrl + '/UploadNeedTypesIcon', _formData);
  }

  UploadNeedTypesImage(FileToUpload: File) {
    const _formData = new FormData();
    _formData.append('upload_need_types_image', FileToUpload, FileToUpload.name);

    return this.http.post(Globalvar.ApiUrl + '/UploadNeedTypesImage', _formData);
  }
}
