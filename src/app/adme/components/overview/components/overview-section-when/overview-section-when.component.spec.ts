import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewSectionWhenComponent } from './overview-section-when.component';

describe('OverviewSectionWhenComponent', () => {
  let component: OverviewSectionWhenComponent;
  let fixture: ComponentFixture<OverviewSectionWhenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverviewSectionWhenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewSectionWhenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
