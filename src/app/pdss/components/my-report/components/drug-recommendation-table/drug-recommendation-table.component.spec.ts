import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrugRecommendationTableComponent } from './drug-recommendation-table.component';

describe('DrugRecommendationTableComponent', () => {
  let component: DrugRecommendationTableComponent;
  let fixture: ComponentFixture<DrugRecommendationTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrugRecommendationTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrugRecommendationTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
