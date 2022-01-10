import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeSectionContactUsComponent } from './home-section-contact-us.component';

describe('HomeSectionContactUsComponent', () => {
  let component: HomeSectionContactUsComponent;
  let fixture: ComponentFixture<HomeSectionContactUsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeSectionContactUsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeSectionContactUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
