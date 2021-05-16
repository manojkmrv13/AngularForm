 
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NeedSector } from '../classes/needsector';
import { Globalvar } from '../classes/globalvar';

@Injectable()
export class NeedsectorService {

  constructor(private http: HttpClient) { }

  GetNeedSector(SectorId) {
    return this.http.get<NeedSector[]>(Globalvar.ApiUrl + '/GetNeedSector?SectorId=' + SectorId);
  }

  DeleteNeedSectorId(SectorId, CreatedBy){
    return this.http.get<NeedSector[]>(Globalvar.ApiUrl + '/DeleteNeedSector?SectorId=' + SectorId + '&CreatedBy=' + CreatedBy);
  }

  PostSector(vardata: any){
    return this.http.post(Globalvar.ApiUrl + '/PostSector', vardata);
  }

  UploadNeedSectorIcon(FileToUpload: File) {
    const _formData = new FormData();
    _formData.append('upload_need_sector_icon', FileToUpload, FileToUpload.name);

    return this.http.post(Globalvar.ApiUrl + '/UploadNeedSectorIcon', _formData);
  }

  UploadNeedSectorImage(FileToUpload: File) {
    const _formData = new FormData();
    _formData.append('upload_need_sector_image', FileToUpload, FileToUpload.name);

    return this.http.post(Globalvar.ApiUrl + '/UploadNeedSectorImage', _formData);
  }

}
