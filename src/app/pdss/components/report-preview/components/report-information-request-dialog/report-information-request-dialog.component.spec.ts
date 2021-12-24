import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportInformationRequestDialogComponent } from './report-information-request-dialog.component';

describe('ReportInformationRequestDialogComponent', () => {
  let component: ReportInformationRequestDialogComponent;
  let fixture: ComponentFixture<ReportInformationRequestDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportInformationRequestDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportInformationRequestDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
