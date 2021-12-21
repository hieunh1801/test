import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtcDrugTreeV2Component } from './atc-drug-tree-v2.component';

describe('AtcDrugTreeV2Component', () => {
  let component: AtcDrugTreeV2Component;
  let fixture: ComponentFixture<AtcDrugTreeV2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtcDrugTreeV2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtcDrugTreeV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
