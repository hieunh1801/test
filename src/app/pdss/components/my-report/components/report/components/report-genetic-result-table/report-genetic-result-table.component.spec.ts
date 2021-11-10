import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportGeneticResultTableComponent } from './report-genetic-result-table.component';

describe('ReportGeneticResultTableComponent', () => {
  let component: ReportGeneticResultTableComponent;
  let fixture: ComponentFixture<ReportGeneticResultTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportGeneticResultTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportGeneticResultTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
