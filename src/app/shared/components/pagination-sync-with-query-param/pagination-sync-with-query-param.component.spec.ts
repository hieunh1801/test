import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationSyncWithQueryParamComponent } from './pagination-sync-with-query-param.component';

describe('PaginationSyncWithQueryParamComponent', () => {
  let component: PaginationSyncWithQueryParamComponent;
  let fixture: ComponentFixture<PaginationSyncWithQueryParamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginationSyncWithQueryParamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationSyncWithQueryParamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
