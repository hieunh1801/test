import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportAdditionalInformationListComponent } from './report-additional-information-list.component';

describe('ReportAdditionalInformationListComponent', () => {
  let component: ReportAdditionalInformationListComponent;
  let fixture: ComponentFixture<ReportAdditionalInformationListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportAdditionalInformationListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportAdditionalInformationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
