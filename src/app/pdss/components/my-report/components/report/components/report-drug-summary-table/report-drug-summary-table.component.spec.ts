import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportDrugSummaryTableComponent } from './report-drug-summary-table.component';

describe('ReportDrugSummaryTableComponent', () => {
  let component: ReportDrugSummaryTableComponent;
  let fixture: ComponentFixture<ReportDrugSummaryTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportDrugSummaryTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportDrugSummaryTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
