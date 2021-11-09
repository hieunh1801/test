import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskSummaryPieChartComponent } from './risk-summary-pie-chart.component';

describe('RiskSummaryPieChartComponent', () => {
  let component: RiskSummaryPieChartComponent;
  let fixture: ComponentFixture<RiskSummaryPieChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RiskSummaryPieChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RiskSummaryPieChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
