import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeSectionOurServicesComponent } from './home-section-our-services.component';

describe('HomeSectionOurServicesComponent', () => {
  let component: HomeSectionOurServicesComponent;
  let fixture: ComponentFixture<HomeSectionOurServicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeSectionOurServicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeSectionOurServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
