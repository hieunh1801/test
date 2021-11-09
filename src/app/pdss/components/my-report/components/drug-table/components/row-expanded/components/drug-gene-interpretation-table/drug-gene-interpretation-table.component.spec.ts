import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrugGeneInterpretationTableComponent } from './drug-gene-interpretation-table.component';

describe('DrugGeneInterpretationTableComponent', () => {
  let component: DrugGeneInterpretationTableComponent;
  let fixture: ComponentFixture<DrugGeneInterpretationTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrugGeneInterpretationTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrugGeneInterpretationTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
