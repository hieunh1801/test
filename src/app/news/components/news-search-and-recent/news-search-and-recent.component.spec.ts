import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsSearchAndRecentComponent } from './news-search-and-recent.component';

describe('NewsSearchAndRecentComponent', () => {
  let component: NewsSearchAndRecentComponent;
  let fixture: ComponentFixture<NewsSearchAndRecentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsSearchAndRecentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsSearchAndRecentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
