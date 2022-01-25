import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopNewsListComponent } from './top-news-list.component';

describe('TopNewsListComponent', () => {
  let component: TopNewsListComponent;
  let fixture: ComponentFixture<TopNewsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopNewsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopNewsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
