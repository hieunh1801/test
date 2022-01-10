import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewSectionWhereToUseComponent } from './overview-section-where-to-use.component';

describe('OverviewSectionWhereToUseComponent', () => {
  let component: OverviewSectionWhereToUseComponent;
  let fixture: ComponentFixture<OverviewSectionWhereToUseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverviewSectionWhereToUseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewSectionWhereToUseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
