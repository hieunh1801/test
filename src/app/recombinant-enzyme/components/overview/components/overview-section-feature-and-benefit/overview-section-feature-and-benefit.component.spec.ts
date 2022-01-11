import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewSectionFeatureAndBenefitComponent } from './overview-section-feature-and-benefit.component';

describe('OverviewSectionFeatureAndBenefitComponent', () => {
  let component: OverviewSectionFeatureAndBenefitComponent;
  let fixture: ComponentFixture<OverviewSectionFeatureAndBenefitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverviewSectionFeatureAndBenefitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewSectionFeatureAndBenefitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
