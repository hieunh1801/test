import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CountryService } from '@shared/services/country.service';
import { DateUtilService } from '@shared/services/date-util.service';
import { DemographicPutRequest } from '@user/services/user-demographic.service';
import { Demographic, UserProfile } from '@user/services/user-profile.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  startWith,
} from 'rxjs/operators';

@Component({
  selector: 'app-introduction-form',
  templateUrl: './introduction-form.component.html',
  styleUrls: ['./introduction-form.component.scss'],
})
export class IntroductionFormComponent implements OnInit, OnDestroy {
  @Input() userProfile: UserProfile = null;

  @Output() cancelEvent = new EventEmitter<boolean>();
  @Output() saveEvent = new EventEmitter<{
    putRequest: DemographicPutRequest;
  }>();

  defaultAvatarUrl = '/assets/images/default-avatar.png';
  demographicForm: FormGroup = null;

  subscription$ = new Subscription();

  countryOptions: string[] = null;

  constructor(
    private formBuilder: FormBuilder,
    private dateUtilService: DateUtilService,
    private countryService: CountryService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.subscribeCountryChange();
    this.subscribeNationalityChange();
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  subscribeNationalityChange(): void {
    const sub = this.demographicForm
      .get('nationality')
      .valueChanges.pipe(
        distinctUntilChanged(),
        startWith(''),
        debounceTime(300)
      )
      .subscribe((nationality) => {
        this.loadCountryOption(nationality);
      });

    this.subscription$.add(sub);
  }

  subscribeCountryChange(): void {
    const sub = this.demographicForm
      .get('country')
      .valueChanges.pipe(
        distinctUntilChanged(),
        startWith(''),
        debounceTime(300)
      )
      .subscribe((country) => {
        this.loadCountryOption(country);
      });

    this.subscription$.add(sub);
  }

  loadCountryOption(name: string): void {
    this.countryService.getAllCountry(name).subscribe((response) => {
      this.countryOptions = response?.data?.items?.map((r) => r.name) || [];
    });
  }

  initForm(): void {
    const demographic = this.userProfile?.demographic;
    if (demographic) {
      const {
        avatar,
        givenName,
        surname,
        gender,
        birthday,
        mobile,
        city,
        country,
        addressDetails,
        nationality,
      } = demographic;
      this.demographicForm = this.formBuilder.group({
        avatar: [avatar],
        givenName: [givenName],
        surname: [surname],

        gender: [gender],
        birthday: [birthday],

        mobile: [mobile],

        city: [city],
        country: [country],
        nationality: [nationality],
        addressDetails: [addressDetails],
      });
    } else {
      this.demographicForm = this.formBuilder.group({
        avatar: [null],
        givenName: [null],
        surname: [null],

        gender: [null],
        birthday: [null],

        mobile: [null],

        city: [null],
        country: [null],
        nationality: [null],
        addressDetails: [null],
      });
    }
  }

  get f(): any {
    return this.demographicForm.controls;
  }

  cancelClick(): void {
    this.cancelEvent.emit();
  }

  uploadAvatar(event: any): void {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.demographicForm.patchValue({
        avatar: reader.result,
      });
    };
  }

  saveClick(): void {
    this.demographicForm.markAllAsTouched();
    if (this.demographicForm.valid) {
      const formValue = this.demographicForm.value;

      const putRequest: DemographicPutRequest = {
        avatar: formValue?.avatar,
        givenName: formValue?.givenName,
        surname: formValue?.surname,
        gender: formValue?.gender,
        birthday: this.dateUtilService.toDateString(formValue?.birthday),
        mobile: formValue?.mobile,
        nationality: formValue?.nationality,
        city: formValue?.city,
        country: formValue?.country,
        addressDetails: formValue?.addressDetails,
      };

      this.saveEvent.emit({ putRequest });
    }
  }
}
