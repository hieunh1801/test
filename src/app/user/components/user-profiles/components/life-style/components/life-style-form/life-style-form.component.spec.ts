import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LifeStyleFormComponent } from './life-style-form.component';

describe('LifeStyleFormComponent', () => {
  let component: LifeStyleFormComponent;
  let fixture: ComponentFixture<LifeStyleFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LifeStyleFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LifeStyleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
