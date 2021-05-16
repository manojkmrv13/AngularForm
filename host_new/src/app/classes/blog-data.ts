export class BlogData {
    constructor(
       public BLOGID: number,
       public ENTRYDATE: Date,
       public TITLE: string,
       public DESCRIPTION:string,
       public SHORT_DESCRIPTION:string,
       public CATEGORYID: number,
       public CATEGORY: string,
       public CATEGORY_ABBREVIATION: string,
       public CATEGORY_ICON: string,
       public CATEGORY_ICON_FILEPATH: string,
       public CATEGORY_IMAGE: string,
       public CATEGORY_IMAGE_FILEPATH: string,
       public BLOG_IMAGE: string,
       public BLOG_IMAGE_FILEPATH: string,
       public BLOG_IMAGE_2: string,
       public BLOG_IMAGE_2_FILEPATH: string,
       public BLOG_IMAGE_3: string,
       public BLOG_IMAGE_3_FILEPATH : string,
       public STATUS: number,
       public CREATEDBY: number,
       public CREATED_BY_USERNAME: string,
       public CREATED_BY_USERROLE: string,
       public ERROR:string
    ){}
}
