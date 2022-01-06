import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionPdssWhyNeedComponent } from './section-pdss-why-need.component';

describe('SectionPdssWhyNeedComponent', () => {
  let component: SectionPdssWhyNeedComponent;
  let fixture: ComponentFixture<SectionPdssWhyNeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectionPdssWhyNeedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionPdssWhyNeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
