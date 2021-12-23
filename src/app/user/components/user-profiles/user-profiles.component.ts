import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import {
  Demographic,
  DiseaseHistory,
  LifeStyleHistory,
  MedicalHistory,
  UserProfile,
  UserProfileService,
  WeightHeightHistory,
} from '../../services/user-profile.service';
import { JoyrideService } from 'ngx-joyride';
import { JoyrideOptions } from 'ngx-joyride/lib/models/joyride-options.class';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-user-profiles',
  templateUrl: './user-profiles.component.html',
  styleUrls: ['./user-profiles.component.scss'],
})
export class UserProfilesComponent implements OnInit {
  userProfile$ = new BehaviorSubject<UserProfile>(null);
  diseaseHistoryList$ = new BehaviorSubject<DiseaseHistory[]>([]);
  medicalHistoryList$ = new BehaviorSubject<MedicalHistory[]>([]);
  demographic$ = new BehaviorSubject<Demographic>(null);
  weightHeightHistoryList$ = new BehaviorSubject<WeightHeightHistory[]>([]);
  lifeStyleHistoryList$ = new BehaviorSubject<LifeStyleHistory[]>(null);
  subscription$ = new Subscription();

  constructor(
    private readonly userProfileService: UserProfileService,
    private readonly joyrideService: JoyrideService,
    private readonly translateService: TranslateService
  ) {}

  loadUserProfile(): void {
    this.userProfileService.getUserProfile().subscribe((data) => {
      const userProfile = data?.data?.items?.[0] || null;
      if (userProfile) {
        this.userProfile$.next(userProfile);
        this.diseaseHistoryList$.next(userProfile?.diseaseHistories || []);
        this.medicalHistoryList$.next(userProfile?.medicalHistories || []);
        this.demographic$.next(userProfile?.demographic || null);
        this.weightHeightHistoryList$.next(
          userProfile?.weightHeightHistories || []
        );
        this.lifeStyleHistoryList$.next(userProfile?.lifeStyleHistories || []);
      }
    });
  }
  ngOnInit(): void {
    this.loadUserProfile();
  }

  showWebTour(): void {
    const option: JoyrideOptions = {
      steps: [
        // introduction
        'USER_PROFILES__INTRODUCTION__STEP',
        'USER_PROFILES__INTRODUCTION__EDIT__STEP',

        // basic information
        'USER_PROFILES__BASIC_INFORMATION__STEP',
        'USER_PROFILES__BASIC_INTRODUCTION__MANAGE__STEP',

        'USER_PROFILES__MEDICAL_HISTORY__STEP',
        'USER_PROFILES__MEDICAL_HISTORY__MANAGE__STEP',

        'USER_PROFILES__DISEASE_HISTORY__STEP',
        'USER_PROFILES__DISEASE_HISTORY__MANAGE__STEP',

        'USER_PROFILES__LIFE_STYLE_HISTORY__STEP',
        'USER_PROFILES__LIFE_STYLE_HISTORY__MANAGE__STEP',
      ],
      // showCounter: false,
      customTexts: {
        close: this.translateService.instant('JOYRIDE__BUTTONS__CLOSE'),
        done: this.translateService.instant('JOYRIDE__BUTTONS__DONE'),
        next: this.translateService.instant('JOYRIDE__BUTTONS__NEXT'),
        prev: this.translateService.instant('JOYRIDE__BUTTONS__PREV'),
      },
    };
    this.joyrideService.startTour(option);
  }
}
