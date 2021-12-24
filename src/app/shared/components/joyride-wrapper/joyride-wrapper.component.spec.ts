import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JoyrideWrapperComponent } from './joyride-wrapper.component';

describe('JoyrideWrapperComponent', () => {
  let component: JoyrideWrapperComponent;
  let fixture: ComponentFixture<JoyrideWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JoyrideWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JoyrideWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
