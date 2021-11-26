import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LifeStyleListComponent } from './life-style-list.component';

describe('LifeStyleListComponent', () => {
  let component: LifeStyleListComponent;
  let fixture: ComponentFixture<LifeStyleListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LifeStyleListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LifeStyleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
