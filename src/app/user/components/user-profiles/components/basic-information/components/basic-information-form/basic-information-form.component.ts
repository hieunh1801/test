import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WeightHeightHistoryPostRequest } from '@user/services/user-basic-information.service';
import { WeightHeightHistory } from '@user/services/user-profile.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-basic-information-form',
  templateUrl: './basic-information-form.component.html',
  styleUrls: ['./basic-information-form.component.scss'],
})
export class BasicInformationFormComponent implements OnInit, OnDestroy {
  @Input() weightHeightHistoryList$ = new BehaviorSubject<
    WeightHeightHistory[]
  >(null);

  @Output() createEvent = new EventEmitter();
  @Output() cancelEvent = new EventEmitter();

  basicInformationForm: FormGroup = null;
  maxDate = new Date();
  minDate = new Date('1900-01-01');
  subscription$ = new Subscription();

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
    this.subscribeWeightHeightHistoryListChange();
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  subscribeWeightHeightHistoryListChange(): void {
    const sub = this.weightHeightHistoryList$
      .pipe(distinctUntilChanged())
      .subscribe((weightHeightHistoryList) => {
        if (!!!weightHeightHistoryList) {
          return;
        }
        const sortedList = weightHeightHistoryList
          .sort((a, b) => Date.parse(b.createdTime) - Date.parse(a.createdTime))
          .sort((a, b) => Date.parse(b.date) - Date.parse(a.date));

        const lastHistory = sortedList?.[0] || null;
        if (lastHistory) {
          this.basicInformationForm.patchValue({
            weight: lastHistory?.weight,
            height: lastHistory?.height,
          });
        }
      });
    this.subscription$.add(sub);
  }

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
