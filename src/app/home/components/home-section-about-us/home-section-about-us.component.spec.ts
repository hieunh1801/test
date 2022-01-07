import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeSectionAboutUsComponent } from './home-section-about-us.component';

describe('HomeSectionAboutUsComponent', () => {
  let component: HomeSectionAboutUsComponent;
  let fixture: ComponentFixture<HomeSectionAboutUsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeSectionAboutUsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeSectionAboutUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
