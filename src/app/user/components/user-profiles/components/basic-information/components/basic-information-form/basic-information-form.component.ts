import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { greaterThan } from '@shared/validators/greater-than.validator';
import { lessThan } from '@shared/validators/less-than.validator';

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

  constructor(
    private formBuilder: FormBuilder,
    private translateService: TranslateService
  ) {}

  initForm(): void {
    this.basicInformationForm = this.formBuilder.group({
      weight: [
        null,
        [Validators.required, Validators.min(0), Validators.max(500)],
      ],
      height: [
        null,
        [Validators.required, Validators.min(0), Validators.max(10)],
      ],
      date: [new Date(), [Validators.required]],
    });
  }
  ngOnInit(): void {
    this.initForm();
    console.log('FORM');
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
  }
}
