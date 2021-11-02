import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RowExpandedComponent } from './row-expanded.component';

describe('RowExpandedComponent', () => {
  let component: RowExpandedComponent;
  let fixture: ComponentFixture<RowExpandedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RowExpandedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RowExpandedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
