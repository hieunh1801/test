import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionPdssWhoNeedComponent } from './section-pdss-who-need.component';

describe('SectionPdssWhoNeedComponent', () => {
  let component: SectionPdssWhoNeedComponent;
  let fixture: ComponentFixture<SectionPdssWhoNeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectionPdssWhoNeedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionPdssWhoNeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
