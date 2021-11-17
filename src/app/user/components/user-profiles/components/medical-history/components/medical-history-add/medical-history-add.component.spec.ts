import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalHistoryAddComponent } from './medical-history-add.component';

describe('MedicalHistoryAddComponent', () => {
  let component: MedicalHistoryAddComponent;
  let fixture: ComponentFixture<MedicalHistoryAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicalHistoryAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicalHistoryAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
