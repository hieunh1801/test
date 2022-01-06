import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionPdssIntroductionComponent } from './section-pdss-introduction.component';

describe('SectionPdssIntroductionComponent', () => {
  let component: SectionPdssIntroductionComponent;
  let fixture: ComponentFixture<SectionPdssIntroductionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectionPdssIntroductionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionPdssIntroductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
