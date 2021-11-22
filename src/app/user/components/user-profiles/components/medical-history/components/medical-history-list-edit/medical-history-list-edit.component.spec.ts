import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalHistoryListEditComponent } from './medical-history-list-edit.component';

describe('MedicalHistoryListEditComponent', () => {
  let component: MedicalHistoryListEditComponent;
  let fixture: ComponentFixture<MedicalHistoryListEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicalHistoryListEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicalHistoryListEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
