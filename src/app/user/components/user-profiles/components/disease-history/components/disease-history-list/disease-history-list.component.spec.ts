import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiseaseHistoryListComponent } from './disease-history-list.component';

describe('DiseaseHistoryListComponent', () => {
  let component: DiseaseHistoryListComponent;
  let fixture: ComponentFixture<DiseaseHistoryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiseaseHistoryListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiseaseHistoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
