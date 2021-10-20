import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdssComponent } from './pdss.component';

describe('PdssComponent', () => {
  let component: PdssComponent;
  let fixture: ComponentFixture<PdssComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdssComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdssComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
