import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { DateUtilService } from '@shared/services/date-util.service';
import { MedicalHistoryPostRequest } from 'src/app/user/services/user-medical-history.service';

@Component({
  selector: 'app-medical-history-add',
  templateUrl: './medical-history-add.component.html',
  styleUrls: ['./medical-history-add.component.scss'],
})
export class MedicalHistoryAddComponent implements OnInit {
  @Output() cancelEvent = new EventEmitter();
  @Output() createEvent = new EventEmitter();

  medicalForm = this.formBuilder.group({
    drug: [null, [Validators.required]],
    note: [null],
    fromDate: [null],
    toDate: [null],
  });

  constructor(
    private formBuilder: FormBuilder,
    private translateService: TranslateService,
    private dateUtilService: DateUtilService
  ) {}

  ngOnInit(): void {}

  get f(): any {
    return this.medicalForm.controls;
  }

  onCancelClick(): void {
    this.cancelEvent.emit();
  }

  onSaveClick(): void {
    if (this.medicalForm.valid) {
      const formValue = this.medicalForm.value;
      const body: MedicalHistoryPostRequest = {
        drug: formValue.drug,
        note: formValue.note,
        fromDate: this.dateUtilService.toDateString(formValue.fromDate),
        toDate: this.dateUtilService.toDateString(formValue.toDate),
      };
      console.log(body);
      this.createEvent.emit(this.medicalForm.value);
    }
  }
}
