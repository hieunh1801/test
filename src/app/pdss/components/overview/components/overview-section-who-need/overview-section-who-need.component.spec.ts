import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewSectionWhoNeedComponent } from './overview-section-who-need.component';

describe('OverviewSectionWhoNeedComponent', () => {
  let component: OverviewSectionWhoNeedComponent;
  let fixture: ComponentFixture<OverviewSectionWhoNeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverviewSectionWhoNeedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewSectionWhoNeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
