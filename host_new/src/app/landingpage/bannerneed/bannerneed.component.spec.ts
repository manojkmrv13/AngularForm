import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerneedComponent } from './bannerneed.component';

describe('BannerneedComponent', () => {
  let component: BannerneedComponent;
  let fixture: ComponentFixture<BannerneedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BannerneedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerneedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
