import { Injectable } from '@angular/core';
import { BlogCategory } from '../classes/blog-category';
import { HttpClient } from '@angular/common/http';
import { Globalvar } from '../classes/globalvar';
import { BlogData } from '../classes/blog-data';
import { BlogComments } from '../classes/blog-comments';

@Injectable()
export class BlogService {

  constructor( private Http:HttpClient) { }

  GetBlogCategory(){
    return this.Http.get<BlogCategory[]>(Globalvar.ApiUrl + "/GetBlogsCategory?CategoryId=");
  }

  GetBlogs(BlogId, CategoryId, MonthName, Year){
    return this.Http.get<BlogData[]>(Globalvar.ApiUrl + "/GetBlogs?BlogId="+ BlogId +"&Title=&CategoryId="+ CategoryId +"&MonthName="+ MonthName +"&Year=" + Year)
  }

  GetBlogsMonthYear(){
    return this.Http.get<BlogData[]>(Globalvar.ApiUrl + "/GetBlogsMonthYear?CategoryId=")
  }

  GetBlogComments(BlogId){
    return this.Http.get<BlogComments[]>(Globalvar.ApiUrl + "/GetBlogsComments?CommentId=&BlogId="+ BlogId +"&ParentCommentId=&Status=1&ApprovedBy=1&DonorId=&UserId=")
  }

}
