import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewSectionIntroductionComponent } from './overview-section-introduction.component';

describe('OverviewSectionIntroductionComponent', () => {
  let component: OverviewSectionIntroductionComponent;
  let fixture: ComponentFixture<OverviewSectionIntroductionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverviewSectionIntroductionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewSectionIntroductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
