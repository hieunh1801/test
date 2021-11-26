import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { DateUtilService } from '@shared/services/date-util.service';
import { LifeStyleHistoryPostRequest } from '@user/services/user-life-style.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-life-style-form',
  templateUrl: './life-style-form.component.html',
  styleUrls: ['./life-style-form.component.scss'],
})
export class LifeStyleFormComponent implements OnInit, OnDestroy {
  @Output() createEvent = new EventEmitter<LifeStyleHistoryPostRequest>();
  @Output() cancelEvent = new EventEmitter();

  coffeeUnitOptions: SelectOption[] = null;
  alcoholUnitOptions: SelectOption[] = null;
  smokingUnitOptions: SelectOption[] = null;
  perTimeUnitOptions: SelectOption[] = null;

  lifeStyleForm: FormGroup = null;

  subscription$ = new Subscription();

  constructor(
    private formBuilder: FormBuilder,
    private translateService: TranslateService,
    private dateUtilService: DateUtilService
  ) {}

  ngOnInit(): void {
    this.subscribeLanguageChange();
    this.reloadOptions();
    this.initForm();
    this.subscribeCoffeeChange();
    this.subscribeSmokingChange();
    this.subscribeAlcoholChange();
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  subscribeLanguageChange(): void {
    const sub = this.translateService.onLangChange.subscribe(() => {
      this.reloadOptions();
    });
    this.subscription$.add(sub);
  }

  reloadOptions(): void {
    this.coffeeUnitOptions = [
      {
        name: this.translateService.instant(
          'USER__USER_PROFILES__LIFE_STYLE_FORM__COFFEE_UNITS__CUP_NAME'
        ),
        value: this.translateService.instant(
          'USER__USER_PROFILES__LIFE_STYLE_FORM__COFFEE_UNITS__CUP_VALUE'
        ),
      },
      {
        name: this.translateService.instant(
          'USER__USER_PROFILES__LIFE_STYLE_FORM__COFFEE_UNITS__ML_NAME'
        ),
        value: this.translateService.instant(
          'USER__USER_PROFILES__LIFE_STYLE_FORM__COFFEE_UNITS__ML_VALUE'
        ),
      },
    ];

    this.alcoholUnitOptions = [
      {
        name: this.translateService.instant(
          'USER__USER_PROFILES__LIFE_STYLE_FORM__ALCOHOL_UNITS__ML_NAME'
        ),
        value: this.translateService.instant(
          'USER__USER_PROFILES__LIFE_STYLE_FORM__ALCOHOL_UNITS__ML_VALUE'
        ),
      },
      {
        name: this.translateService.instant(
          'USER__USER_PROFILES__LIFE_STYLE_FORM__ALCOHOL_UNITS__L_NAME'
        ),
        value: this.translateService.instant(
          'USER__USER_PROFILES__LIFE_STYLE_FORM__ALCOHOL_UNITS__L_VALUE'
        ),
      },
    ];

    this.smokingUnitOptions = [
      {
        name: this.translateService.instant(
          'USER__USER_PROFILES__LIFE_STYLE_FORM__SMOKING_UNITS__CIGARETTE_NAME'
        ),
        value: this.translateService.instant(
          'USER__USER_PROFILES__LIFE_STYLE_FORM__SMOKING_UNITS__CIGARETTE_VALUE'
        ),
      },
      {
        name: this.translateService.instant(
          'USER__USER_PROFILES__LIFE_STYLE_FORM__SMOKING_UNITS__PACK_NAME'
        ),
        value: this.translateService.instant(
          'USER__USER_PROFILES__LIFE_STYLE_FORM__SMOKING_UNITS__PACK_VALUE'
        ),
      },
    ];

    this.perTimeUnitOptions = [
      {
        name: this.translateService.instant(
          'USER__USER_PROFILES__LIFE_STYLE_FORM__PER_TIME_UNITS__DAY_NAME'
        ),
        value: this.translateService.instant(
          'USER__USER_PROFILES__LIFE_STYLE_FORM__PER_TIME_UNITS__DAY_VALUE'
        ),
      },
      {
        name: this.translateService.instant(
          'USER__USER_PROFILES__LIFE_STYLE_FORM__PER_TIME_UNITS__WEEK_NAME'
        ),
        value: this.translateService.instant(
          'USER__USER_PROFILES__LIFE_STYLE_FORM__PER_TIME_UNITS__WEEK_VALUE'
        ),
      },
      {
        name: this.translateService.instant(
          'USER__USER_PROFILES__LIFE_STYLE_FORM__PER_TIME_UNITS__MONTH_NAME'
        ),
        value: this.translateService.instant(
          'USER__USER_PROFILES__LIFE_STYLE_FORM__PER_TIME_UNITS__MONTH_VALUE'
        ),
      },
    ];
  }

  initForm(): void {
    const coffeeUnit = this.coffeeUnitOptions[0].value;
    const perTimeUnit = this.perTimeUnitOptions[0].value;
    const smokingUnit = this.smokingUnitOptions[0].value;
    const alcoholUnit = this.alcoholUnitOptions[0].value;
    const today = new Date();
    this.lifeStyleForm = this.formBuilder.group({
      coffee: [false],
      coffeeAmount: [null],
      coffeeUnit: [coffeeUnit],
      coffeePerTimeUnit: [perTimeUnit],

      smoking: [false],
      smokingAmount: [null],
      smokingUnit: [smokingUnit],
      smokingPerTimeUnit: [perTimeUnit],

      alcohol: [false],
      alcoholAmount: [null],
      alcoholUnit: [alcoholUnit],
      alcoholPerTimeUnit: [perTimeUnit],

      date: [today, [Validators.required]],
    });
  }

  addRequireValidatorTo(formControlName: string): void {
    this.lifeStyleForm
      .get(formControlName)
      .setValidators([Validators.required]);
  }
  removeValidatorsFrom(formControlName: string): void {
    this.lifeStyleForm.get(formControlName).clearValidators();
  }

  subscribeCoffeeChange(): void {
    const sub = this.lifeStyleForm
      .get('coffee')
      .valueChanges.subscribe((coffee) => {
        if (coffee) {
          this.addRequireValidatorTo('coffeeAmount');
        } else {
          this.removeValidatorsFrom('coffeeAmount');
        }
      });
    this.subscription$.add(sub);
  }

  subscribeSmokingChange(): void {
    const sub = this.lifeStyleForm
      .get('smoking')
      .valueChanges.subscribe((smoking) => {
        if (smoking) {
          this.addRequireValidatorTo('smokingAmount');
        } else {
          this.removeValidatorsFrom('smokingAmount');
        }
      });
    this.subscription$.add(sub);
  }

  subscribeAlcoholChange(): void {
    const sub = this.lifeStyleForm
      .get('alcohol')
      .valueChanges.subscribe((alcohol) => {
        if (alcohol) {
          this.addRequireValidatorTo('alcoholAmount');
        } else {
          this.removeValidatorsFrom('alcoholAmount');
        }
      });
    this.subscription$.add(sub);
  }

  get f(): any {
    return this.lifeStyleForm?.controls;
  }

  cancelClick(event: Event): void {
    event.preventDefault();
    this.cancelEvent.emit();
  }

  createClick(event: Event): void {
    event.preventDefault();
    this.lifeStyleForm.markAllAsTouched();
    if (this.lifeStyleForm.valid) {
      const formValue = this.lifeStyleForm.value;
      const postRequest: LifeStyleHistoryPostRequest = {
        alcohol: (formValue.alcohol && 1) || 0,
        alcoholAmount: (formValue.alcohol && formValue.alcoholAmount) || null,
        alcoholUnit: (formValue.alcohol && formValue.alcoholUnit) || null,
        alcoholPerTimeUnit:
          (formValue.alcohol && formValue.alcoholPerTimeUnit) || null,

        smoking: (formValue.smoking && 1) || 0,
        smokingAmount: (formValue.smoking && formValue.smokingAmount) || null,
        smokingUnit: (formValue.smoking && formValue.smokingUnit) || null,
        smokingPerTimeUnit:
          (formValue.smoking && formValue.smokingPerTimeUnit) || null,

        coffee: (formValue.coffee && 1) || 0,
        coffeeAmount: (formValue.coffee && formValue.coffeeAmount) || null,
        coffeeUnit: (formValue.coffee && formValue.coffeeUnit) || null,
        coffeePerTimeUnit:
          (formValue.coffee && formValue.coffeePerTimeUnit) || null,

        date: this.dateUtilService.toDateString(formValue.date),
      };

      this.createEvent.emit(postRequest);
    }
  }
}

interface SelectOption {
  name: string | number;
  value: string | number;
}
