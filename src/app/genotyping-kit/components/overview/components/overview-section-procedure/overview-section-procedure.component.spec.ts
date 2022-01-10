import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewSectionProcedureComponent } from './overview-section-procedure.component';

describe('OverviewSectionProcedureComponent', () => {
  let component: OverviewSectionProcedureComponent;
  let fixture: ComponentFixture<OverviewSectionProcedureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverviewSectionProcedureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewSectionProcedureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
