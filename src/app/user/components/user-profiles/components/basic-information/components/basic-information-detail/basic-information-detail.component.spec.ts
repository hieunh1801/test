import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicInformationDetailComponent } from './basic-information-detail.component';

describe('BasicInformationDetailComponent', () => {
  let component: BasicInformationDetailComponent;
  let fixture: ComponentFixture<BasicInformationDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasicInformationDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicInformationDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
