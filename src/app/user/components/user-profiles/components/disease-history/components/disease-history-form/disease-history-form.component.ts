import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { DateUtilService } from '@shared/services/date-util.service';
import {
  DiseaseHistoryPostRequest,
  DiseaseHistoryPutRequest,
} from '@user/services/user-disease-history.service';
import { DiseaseHistory } from '@user/services/user-profile.service';

@Component({
  selector: 'app-disease-history-form',
  templateUrl: './disease-history-form.component.html',
  styleUrls: ['./disease-history-form.component.scss'],
})
export class DiseaseHistoryFormComponent implements OnInit {
  @Input() diseaseHistory: DiseaseHistory = null;

  @Output() cancelEvent = new EventEmitter();
  @Output() createEvent = new EventEmitter();
  @Output() saveEvent = new EventEmitter();

  mode: 'CREATE' | 'UPDATE' = null;
  diseaseForm: FormGroup = null;

  initForm(): void {
    if (this.diseaseHistory && this.diseaseHistory.id > 0) {
      this.mode = 'UPDATE';
      const { disease, note, fromDate, toDate } = this.diseaseHistory;
      this.diseaseForm = this.formBuilder.group({
        disease: [disease, [Validators.required]],
        note: [note],
        fromDate: [fromDate],
        toDate: [toDate],
      });
    } else {
      this.mode = 'CREATE';
      this.diseaseForm = this.formBuilder.group({
        disease: [null, [Validators.required]],
        note: [null],
        fromDate: [null],
        toDate: [null],
      });
    }
  }

  constructor(
    private formBuilder: FormBuilder,
    private translateService: TranslateService,
    private dateUtilService: DateUtilService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  get f(): any {
    return this.diseaseForm.controls;
  }

  cancelClick(): void {
    this.cancelEvent.emit();
  }

  saveClick(): void {
    this.diseaseForm.markAllAsTouched();

    if (!this.diseaseForm.valid) {
      return;
    }
    const formValue = this.diseaseForm.value;

    const output: DiseaseHistoryPutRequest = {
      disease: formValue.disease,
      note: formValue.note,
      fromDate: this.dateUtilService.toDateString(formValue.fromDate),
      toDate: this.dateUtilService.toDateString(formValue.toDate),
    };

    this.saveEvent.emit({
      diseaseHistoryId: this.diseaseHistory.id,
      putRequest: output,
    });
  }

  createClick(): void {
    this.diseaseForm.markAllAsTouched();
    if (!this.diseaseForm.valid) {
      return;
    }
    const formValue = this.diseaseForm.value;
    const output: DiseaseHistoryPostRequest = {
      disease: formValue.disease,
      note: formValue.note,
      fromDate: this.dateUtilService.toDateString(formValue.fromDate),
      toDate: this.dateUtilService.toDateString(formValue.toDate),
    };
    this.createEvent.emit(output);
  }
}
