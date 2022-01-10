import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewSectionWhyComponent } from './overview-section-why.component';

describe('OverviewSectionWhyComponent', () => {
  let component: OverviewSectionWhyComponent;
  let fixture: ComponentFixture<OverviewSectionWhyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverviewSectionWhyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewSectionWhyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
