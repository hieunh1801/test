import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionPdssCommonProgressComponent } from './section-pdss-common-progress.component';

describe('SectionPdssCommonProgressComponent', () => {
  let component: SectionPdssCommonProgressComponent;
  let fixture: ComponentFixture<SectionPdssCommonProgressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectionPdssCommonProgressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionPdssCommonProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
