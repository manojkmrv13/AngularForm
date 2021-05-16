import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Testimonial } from '../classes/testimonial';
import { Globalvar } from '../classes/globalvar';


@Injectable()
export class TestimonialsService {

  constructor(private http: HttpClient) { }
  GetTMNeedId(TMNeedId) {
    return this.http.get<Testimonial[]>(Globalvar.ApiUrl +"/GetStories?StoryId=&NeedId=" + TMNeedId + "&StoryType=Donors Speak&ApprovedStatus=Approved&UserId=&SectorId=");
  }

  GetTestimonials() {
    return this.http.get<Testimonial[]>(Globalvar.ApiUrl +"/GetStories?StoryId=&NeedId=&StoryType=Donors Speak&ApprovedStatus=Approved&UserId=&SectorId=");
  }
  GetMyTestimonials(DonorID) {
    return this.http.get<Testimonial[]>(Globalvar.ApiUrl +"/GetStories?StoryId=&NeedId=&StoryType=Donors Speak&ApprovedStatus=Approved&UserId="+DonorID +"&SectorId=");
  }
  GetTestimonialsAndSuccessStory(StoryType){
    return this.http.get<Testimonial[]>( Globalvar.ApiUrl +"/GetStoriesAll?StoryId=&NeedId=&StoryType=" +StoryType+ "&ApprovedStatus=Approved&UserId=&SectorId=")
  }


  UploadNeedStoriesImage(FileToUpload: File) {
    const _formData = new FormData();
    _formData.append('upload_need_stories_image', FileToUpload, FileToUpload.name);
    return this.http.post(Globalvar.ApiUrl + '/UploadNeedStoriesImage', _formData);
  }
}
