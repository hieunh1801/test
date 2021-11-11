import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrugTableStatisticComponent } from './drug-table-statistic.component';

describe('DrugTableStatisticComponent', () => {
  let component: DrugTableStatisticComponent;
  let fixture: ComponentFixture<DrugTableStatisticComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrugTableStatisticComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrugTableStatisticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
