import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeSectionWhyChooseUsComponent } from './home-section-why-choose-us.component';

describe('HomeSectionWhyChooseUsComponent', () => {
  let component: HomeSectionWhyChooseUsComponent;
  let fixture: ComponentFixture<HomeSectionWhyChooseUsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeSectionWhyChooseUsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeSectionWhyChooseUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
