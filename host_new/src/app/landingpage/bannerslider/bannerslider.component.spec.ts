import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BannersliderComponent } from './bannerslider.component';

describe('BannersliderComponent', () => {
  let component: BannersliderComponent;
  let fixture: ComponentFixture<BannersliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BannersliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BannersliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
