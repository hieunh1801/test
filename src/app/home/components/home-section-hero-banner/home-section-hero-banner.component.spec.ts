import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeSectionHeroBannerComponent } from './home-section-hero-banner.component';

describe('HomeSectionHeroBannerComponent', () => {
  let component: HomeSectionHeroBannerComponent;
  let fixture: ComponentFixture<HomeSectionHeroBannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeSectionHeroBannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeSectionHeroBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
