import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewSectionTestItemComponent } from './overview-section-test-item.component';

describe('OverviewSectionTestItemComponent', () => {
  let component: OverviewSectionTestItemComponent;
  let fixture: ComponentFixture<OverviewSectionTestItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverviewSectionTestItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewSectionTestItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
