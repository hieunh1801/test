import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoGraphicComponent } from './demo-graphic.component';

describe('DemoGraphicComponent', () => {
  let component: DemoGraphicComponent;
  let fixture: ComponentFixture<DemoGraphicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemoGraphicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoGraphicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
