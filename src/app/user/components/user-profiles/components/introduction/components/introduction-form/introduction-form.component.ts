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
    'https://images.squarespace-cdn.com/content/v1/54b7b93ce4b0a3e130d5d232/1519987020970-8IQ7F6Z61LLBCX85A65S/icon.png?format=1000w';

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
