import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtcClassificationComponent } from './atc-classification.component';

describe('AtcClassificationComponent', () => {
  let component: AtcClassificationComponent;
  let fixture: ComponentFixture<AtcClassificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AtcClassificationComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtcClassificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
