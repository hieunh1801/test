import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtcClassificationV3Component } from './atc-classification-v3.component';

describe('AtcClassificationV3Component', () => {
  let component: AtcClassificationV3Component;
  let fixture: ComponentFixture<AtcClassificationV3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtcClassificationV3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtcClassificationV3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
