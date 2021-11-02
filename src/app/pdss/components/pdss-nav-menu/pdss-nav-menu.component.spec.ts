import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdssNavMenuComponent } from './pdss-nav-menu.component';

describe('PdssNavMenuComponent', () => {
  let component: PdssNavMenuComponent;
  let fixture: ComponentFixture<PdssNavMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdssNavMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdssNavMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
