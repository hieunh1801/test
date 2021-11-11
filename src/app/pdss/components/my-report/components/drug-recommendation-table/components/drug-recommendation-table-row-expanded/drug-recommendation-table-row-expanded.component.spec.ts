import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrugRecommendationTableRowExpandedComponent } from './drug-recommendation-table-row-expanded.component';

describe('DrugRecommendationTableRowExpandedComponent', () => {
  let component: DrugRecommendationTableRowExpandedComponent;
  let fixture: ComponentFixture<DrugRecommendationTableRowExpandedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrugRecommendationTableRowExpandedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrugRecommendationTableRowExpandedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
