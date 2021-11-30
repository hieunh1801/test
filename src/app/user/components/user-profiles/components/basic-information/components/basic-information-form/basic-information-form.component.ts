import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WeightHeightHistoryPostRequest } from '@user/services/user-basic-information.service';

@Component({
  selector: 'app-basic-information-form',
  templateUrl: './basic-information-form.component.html',
  styleUrls: ['./basic-information-form.component.scss'],
})
export class BasicInformationFormComponent implements OnInit {
  @Output() createEvent = new EventEmitter();
  @Output() cancelEvent = new EventEmitter();

  basicInformationForm: FormGroup = null;
  maxDate = new Date();
  minDate = new Date('1900-01-01');

  constructor(private formBuilder: FormBuilder) {}

  initForm(): void {
    this.basicInformationForm = this.formBuilder.group({
      weight: [
        null,
        [Validators.required, Validators.min(0), Validators.max(500)],
      ],
      height: [
        null,
        [Validators.required, Validators.min(0), Validators.max(1000)],
      ],
      date: [new Date(), [Validators.required]],
    });
  }
  ngOnInit(): void {
    this.initForm();
  }

  get f(): any {
    return this.basicInformationForm.controls;
  }

  cancelClick(event: Event): void {
    event.preventDefault();
    this.cancelEvent.emit();
  }

  createClick(event: Event): void {
    event.preventDefault();

    this.basicInformationForm.markAllAsTouched();
    if (this.basicInformationForm.valid) {
      const formValue = this.basicInformationForm.value;
      const postRequest: WeightHeightHistoryPostRequest = {
        weight: formValue.weight,
        height: formValue.height,
        date: formValue.date,
      };

      this.createEvent.emit(postRequest);
    }
  }
}
