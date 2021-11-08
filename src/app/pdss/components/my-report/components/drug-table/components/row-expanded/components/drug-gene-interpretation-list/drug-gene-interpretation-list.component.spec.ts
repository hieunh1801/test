import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrugGeneInterpretationListComponent } from './drug-gene-interpretation-list.component';

describe('DrugGeneInterpretationListComponent', () => {
  let component: DrugGeneInterpretationListComponent;
  let fixture: ComponentFixture<DrugGeneInterpretationListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrugGeneInterpretationListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrugGeneInterpretationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
