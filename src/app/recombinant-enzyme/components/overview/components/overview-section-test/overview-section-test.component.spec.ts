import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewSectionTestComponent } from './overview-section-test.component';

describe('OverviewSectionTestComponent', () => {
  let component: OverviewSectionTestComponent;
  let fixture: ComponentFixture<OverviewSectionTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverviewSectionTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewSectionTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
