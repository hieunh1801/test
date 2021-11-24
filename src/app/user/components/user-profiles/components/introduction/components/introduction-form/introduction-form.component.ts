import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Demographic, UserProfile } from '@user/services/user-profile.service';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'app-introduction-form',
  templateUrl: './introduction-form.component.html',
  styleUrls: ['./introduction-form.component.scss'],
})
export class IntroductionFormComponent implements OnInit, OnDestroy {
  @Input() userProfile$ = new BehaviorSubject<UserProfile>(null);

  defaultAvatarUrl =
    'https://64.media.tumblr.com/da729f1f5aaaced34436e749c0a4aa40/tumblr_oabfcd8Sf11rbky0ho1_640.jpg';

  demographicForm: FormGroup = null;

  subscription$ = new Subscription();

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.subscribeUserProfileChange();
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  subscribeUserProfileChange(): void {
    const sub = this.userProfile$.subscribe((userProfile: UserProfile) => {
      const demographic = userProfile?.demographic;
      this.initForm(demographic);
    });
    this.subscription$.add(sub);
  }

  initForm(demographic: Demographic): void {
    console.log(
      '🚀 ~ file: introduction-form.component.ts ~ line 37 ~ IntroductionFormComponent ~ initForm ~ demographic',
      demographic
    );

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
        nationality: [null],
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
}
