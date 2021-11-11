import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrugRecommendationTableStatisticComponent } from './drug-recommendation-table-statistic.component';

describe('DrugRecommendationTableStatisticComponent', () => {
  let component: DrugRecommendationTableStatisticComponent;
  let fixture: ComponentFixture<DrugRecommendationTableStatisticComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrugRecommendationTableStatisticComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrugRecommendationTableStatisticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
