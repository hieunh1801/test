import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilityNavMenuComponent } from './utility-nav-menu.component';

describe('UtilityNavMenuComponent', () => {
  let component: UtilityNavMenuComponent;
  let fixture: ComponentFixture<UtilityNavMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UtilityNavMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UtilityNavMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
