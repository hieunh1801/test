import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateUtilService } from '@shared/services/date-util.service';
import {
  MedicalHistoryPostRequest,
  MedicalHistoryPutRequest,
} from '@user/services/user-medical-history.service';
import { MedicalHistory } from '@user/services/user-profile.service';
import { number } from 'echarts';

@Component({
  selector: 'app-medical-history-form',
  templateUrl: './medical-history-form.component.html',
  styleUrls: ['./medical-history-form.component.scss'],
})
export class MedicalHistoryFormComponent implements OnInit {
  @Input() medicalHistory: MedicalHistory = null;

  @Output() cancelEvent = new EventEmitter();
  @Output() createEvent = new EventEmitter<MedicalHistoryPostRequest>();
  @Output() saveEvent = new EventEmitter<{
    medicalHistoryId: number;
    putRequest: MedicalHistoryPutRequest;
  }>();

  mode: 'ADD' | 'EDIT' = null;
  medicalForm: FormGroup = null;

  initForm(): void {
    if (this.medicalHistory && this.medicalHistory.id > 0) {
      this.mode = 'EDIT';
      const { drug, note, fromDate, toDate } = this.medicalHistory;
      this.medicalForm = this.formBuilder.group({
        drug: [drug, [Validators.required]],
        note: [note],
        fromDate: [fromDate],
        toDate: [toDate],
      });
    } else {
      this.mode = 'ADD';
      this.medicalForm = this.formBuilder.group({
        drug: [null, [Validators.required]],
        note: [null],
        fromDate: [null],
        toDate: [null],
      });
    }
  }
  constructor(
    private formBuilder: FormBuilder,
    private dateUtilService: DateUtilService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  get f(): any {
    return this.medicalForm.controls;
  }

  cancelClick(): void {
    this.cancelEvent.emit();
  }

  saveClick(): void {
    this.medicalForm.markAllAsTouched();

    if (!this.medicalForm.valid) {
      return;
    }
    const formValue = this.medicalForm.value;
    const output: MedicalHistoryPutRequest = {
      drug: formValue.drug,
      note: formValue.note,
      fromDate: this.dateUtilService.toDateString(formValue.fromDate),
      toDate: this.dateUtilService.toDateString(formValue.toDate),
    };
    this.saveEvent.emit({
      medicalHistoryId: this.medicalHistory.id,
      putRequest: output,
    });
  }

  createClick(): void {
    this.medicalForm.markAllAsTouched();
    if (!this.medicalForm.valid) {
      return;
    }
    const formValue = this.medicalForm.value;
    const output: MedicalHistoryPostRequest = {
      drug: formValue.drug,
      note: formValue.note,
      fromDate: this.dateUtilService.toDateString(formValue.fromDate),
      toDate: this.dateUtilService.toDateString(formValue.toDate),
    };
    this.createEvent.emit(output);
  }
}
