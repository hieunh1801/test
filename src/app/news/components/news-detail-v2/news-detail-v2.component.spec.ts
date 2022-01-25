import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsDetailV2Component } from './news-detail-v2.component';

describe('NewsDetailV2Component', () => {
  let component: NewsDetailV2Component;
  let fixture: ComponentFixture<NewsDetailV2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsDetailV2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsDetailV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
