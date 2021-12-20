import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtcDrugTreeComponent } from './atc-drug-tree.component';

describe('AtcDrugTreeComponent', () => {
  let component: AtcDrugTreeComponent;
  let fixture: ComponentFixture<AtcDrugTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtcDrugTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtcDrugTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
