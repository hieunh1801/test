import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewSectionWhenToUseComponent } from './overview-section-when-to-use.component';

describe('OverviewSectionWhenToUseComponent', () => {
  let component: OverviewSectionWhenToUseComponent;
  let fixture: ComponentFixture<OverviewSectionWhenToUseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverviewSectionWhenToUseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewSectionWhenToUseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
