import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtcClassificationV2Component } from './atc-classification-v2.component';

describe('AtcClassificationV2Component', () => {
  let component: AtcClassificationV2Component;
  let fixture: ComponentFixture<AtcClassificationV2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtcClassificationV2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtcClassificationV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
