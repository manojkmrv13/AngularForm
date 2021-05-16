import { Component } from '@angular/core';
// import { HomeComponent } from './home/home.component';
// import { AddBlogComponent } from './add-blog/add-blog.component';
import { AgeValidator } from "./custom-validators/age.validator";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-blog';
  public isCollapsed = true;
}
