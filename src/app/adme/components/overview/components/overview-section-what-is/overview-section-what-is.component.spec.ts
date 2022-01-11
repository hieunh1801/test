import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewSectionWhatIsComponent } from './overview-section-what-is.component';

describe('OverviewSectionWhatIsComponent', () => {
  let component: OverviewSectionWhatIsComponent;
  let fixture: ComponentFixture<OverviewSectionWhatIsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverviewSectionWhatIsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewSectionWhatIsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
