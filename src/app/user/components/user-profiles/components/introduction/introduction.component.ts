import { Component, Input, OnInit } from '@angular/core';
import { MatSnackbarService } from '@shared/services/mat-snackbar.service';
import {
  DemographicPutRequest,
  UserDemographicService,
} from '@user/services/user-demographic.service';
import {
  Demographic,
  UserProfile,
  UserProfileService,
} from '@user/services/user-profile.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-introduction',
  templateUrl: './introduction.component.html',
  styleUrls: ['./introduction.component.scss'],
})
export class IntroductionComponent implements OnInit {
  @Input() userProfile$ = new BehaviorSubject<UserProfile>(null);

  mode$ = new BehaviorSubject<'VIEW' | 'EDIT'>(null);

  constructor(
    private userDemographicService: UserDemographicService,
    private userProfileService: UserProfileService,
    private matSnackbarService: MatSnackbarService
  ) {}

  ngOnInit(): void {
    this.initState();
  }

  initState(): void {
    this.mode$.next('VIEW');
  }

  reloadUserProfile(callbackFunction: Function): void {
    this.userProfileService.getUserProfile().subscribe((response) => {
      const userProfile = response?.data?.items?.[0] || null;
      if (userProfile) {
        this.userProfile$.next(userProfile);
        callbackFunction();
      }
    });
  }

  handleEditEvent(): void {}

  changeMode(mode: 'VIEW' | 'EDIT'): void {
    this.mode$.next(mode);
  }

  updateData({ putRequest }: { putRequest: DemographicPutRequest }): void {
    this.userDemographicService.puUserDemographic(putRequest).subscribe({
      next: (response) => {
        const isSuccess = response.status.code === 'success';
        if (isSuccess) {
          this.reloadUserProfile(() => {
            this.changeMode('VIEW');
          });
          this.matSnackbarService.openUpdateSuccess();
        } else {
          this.matSnackbarService.openUpdateFailed();
        }
      },
      error: (error) => {
        console.error(error);
        this.matSnackbarService.openUpdateFailed();
      },
    });
  }
}
