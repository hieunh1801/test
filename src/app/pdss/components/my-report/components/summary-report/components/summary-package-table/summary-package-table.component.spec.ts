import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryPackageTableComponent } from './summary-package-table.component';

describe('SummaryPackageTableComponent', () => {
  let component: SummaryPackageTableComponent;
  let fixture: ComponentFixture<SummaryPackageTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SummaryPackageTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryPackageTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
