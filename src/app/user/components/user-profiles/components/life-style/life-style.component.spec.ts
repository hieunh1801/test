import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LifeStyleComponent } from './life-style.component';

describe('LifeStyleComponent', () => {
  let component: LifeStyleComponent;
  let fixture: ComponentFixture<LifeStyleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LifeStyleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LifeStyleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
