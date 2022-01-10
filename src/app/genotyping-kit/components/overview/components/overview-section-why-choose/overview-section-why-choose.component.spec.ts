import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewSectionWhyChooseComponent } from './overview-section-why-choose.component';

describe('OverviewSectionWhyChooseComponent', () => {
  let component: OverviewSectionWhyChooseComponent;
  let fixture: ComponentFixture<OverviewSectionWhyChooseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverviewSectionWhyChooseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewSectionWhyChooseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
