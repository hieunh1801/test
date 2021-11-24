import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntroductionDetailComponent } from './introduction-detail.component';

describe('IntroductionDetailComponent', () => {
  let component: IntroductionDetailComponent;
  let fixture: ComponentFixture<IntroductionDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntroductionDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntroductionDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
