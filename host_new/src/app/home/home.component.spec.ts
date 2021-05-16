// import { TestBed, async } from '@angular/core/testing';
// import { Component, OnInit } from '@angular/core';
// import { HomeComponent } from '../home/home.component';
 
// describe('HomeComponent (initial CLI version)', () => {
//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [
//         HomeComponent
//       ],
//     }).compileComponents();
//   }));
//   it('should create the app', async(() => {
//     const fixture = TestBed.createComponent(HomeComponent);
//     const app = fixture.componentInstance;
//     expect(app).toBeTruthy();
//   }));
//   it(`should have as title 'app'`, async(() => {
//     const fixture = TestBed.createComponent(HomeComponent);
//     const app = fixture.componentInstance;
//     expect(app.title).toEqual('app');
//   }));
//   it('should render title', async(() => {
//     const fixture = TestBed.createComponent(HomeComponent);
//     fixture.detectChanges();
//     const compiled = fixture.nativeElement;
//     expect(compiled.querySelector('h1').textContent).toContain('Welcome to app!');
//   }));
// });

// /// As it should be
// import { DebugElement } from '@angular/core';
// import { ComponentFixture } from '@angular/core/testing';

// describe('AppComponent (initial CLI version - as it should be)', () => {

//   let app: HomeComponent;
//   let de: DebugElement;
//   let fixture: ComponentFixture<HomeComponent>;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       declarations: [
//         HomeComponent
//       ],
//     });

//     fixture = TestBed.createComponent(HomeComponent);
//     app = fixture.componentInstance;
//     de = fixture.debugElement;
//   });

//   it('should create the app', () => {
//     expect(app).toBeDefined();
//   });

//   it(`should have as title 'app'`, () => {
//     expect(app.title).toEqual('app');
//   });

//   it('should render title in an h1 tag', () => {
//     fixture.detectChanges();
//     expect(de.nativeElement.querySelector('h1').textContent)
//       .toContain('Welcome to app!');
//   });
// });


// /*
// Copyright Google LLC. All Rights Reserved.
// Use of this source code is governed by an MIT-style license that
// can be found in the LICENSE file at http://angular.io/license
// */