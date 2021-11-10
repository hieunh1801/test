import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportReferencesComponent } from './report-references.component';

describe('ReportReferencesComponent', () => {
  let component: ReportReferencesComponent;
  let fixture: ComponentFixture<ReportReferencesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportReferencesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportReferencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
