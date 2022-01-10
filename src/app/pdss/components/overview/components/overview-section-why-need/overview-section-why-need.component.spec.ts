import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewSectionWhyNeedComponent } from './overview-section-why-need.component';

describe('OverviewSectionWhyNeedComponent', () => {
  let component: OverviewSectionWhyNeedComponent;
  let fixture: ComponentFixture<OverviewSectionWhyNeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverviewSectionWhyNeedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewSectionWhyNeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
