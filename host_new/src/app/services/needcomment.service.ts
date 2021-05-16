import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Needcomment } from '../classes/needcomment';
import { Globalvar } from '../classes/globalvar';

@Injectable()
export class NeedCommentService {

  constructor(private http: HttpClient) { }

  GetNeedComment(NeedId) {
    return this.http.get<Needcomment[]>(Globalvar.ApiUrl + "/GetWebsiteComments?CommentId=&NeedId=" + NeedId + "&ParentCommentId=0&IsPublished=1&DonorId=&UserId=");
  }
}
