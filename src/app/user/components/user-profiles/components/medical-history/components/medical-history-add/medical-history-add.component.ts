import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-medical-history-add',
  templateUrl: './medical-history-add.component.html',
  styleUrls: ['./medical-history-add.component.scss'],
})
export class MedicalHistoryAddComponent implements OnInit {
  @Output() cancelEvent = new EventEmitter();
  @Output() saveEvent = new EventEmitter();

  medicalForm = this.formBuilder.group({
    drug: [null, [Validators.required]],
    note: [null],
    fromDate: [null],
    toDate: [null],
  });

  constructor(
    private formBuilder: FormBuilder,
    private translateService: TranslateService
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
      this.saveEvent.emit(this.medicalForm.value);
    }
  }
}
