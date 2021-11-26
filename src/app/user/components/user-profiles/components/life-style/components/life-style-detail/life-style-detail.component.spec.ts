import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LifeStyleDetailComponent } from './life-style-detail.component';

describe('LifeStyleDetailComponent', () => {
  let component: LifeStyleDetailComponent;
  let fixture: ComponentFixture<LifeStyleDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LifeStyleDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LifeStyleDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
