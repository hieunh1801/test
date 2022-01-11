import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewSectionServicesComponent } from './overview-section-services.component';

describe('OverviewSectionServicesComponent', () => {
  let component: OverviewSectionServicesComponent;
  let fixture: ComponentFixture<OverviewSectionServicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverviewSectionServicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewSectionServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
