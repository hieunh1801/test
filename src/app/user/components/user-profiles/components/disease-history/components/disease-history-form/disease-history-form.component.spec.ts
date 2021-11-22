import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiseaseHistoryFormComponent } from './disease-history-form.component';

describe('DiseaseHistoryFormComponent', () => {
  let component: DiseaseHistoryFormComponent;
  let fixture: ComponentFixture<DiseaseHistoryFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiseaseHistoryFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiseaseHistoryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
