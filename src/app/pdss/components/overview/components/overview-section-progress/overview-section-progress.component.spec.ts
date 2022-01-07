import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewSectionProgressComponent } from './overview-section-progress.component';

describe('OverviewSectionProgressComponent', () => {
  let component: OverviewSectionProgressComponent;
  let fixture: ComponentFixture<OverviewSectionProgressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverviewSectionProgressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewSectionProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
