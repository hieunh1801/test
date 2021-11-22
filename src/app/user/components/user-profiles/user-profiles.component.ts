import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import {
  DiseaseHistory,
  MedicalHistory,
  UserProfile,
  UserProfileService,
} from '../../services/user-profile.service';

@Component({
  selector: 'app-user-profiles',
  templateUrl: './user-profiles.component.html',
  styleUrls: ['./user-profiles.component.scss'],
})
export class UserProfilesComponent implements OnInit {
  userProfile$ = new BehaviorSubject<UserProfile>(null);
  diseaseHistoryList$ = new BehaviorSubject<DiseaseHistory[]>([]);
  medicalHistoryList$ = new BehaviorSubject<MedicalHistory[]>([]);

  subscription$ = new Subscription();

  constructor(private userProfileService: UserProfileService) {}

  loadUserProfile(): void {
    this.userProfileService.getUserProfile().subscribe((data) => {
      const userProfile = data?.data?.items?.[0] || null;
      if (userProfile) {
        this.userProfile$.next(userProfile);
        this.diseaseHistoryList$.next(userProfile?.diseaseHistories || []);
        this.medicalHistoryList$.next(userProfile?.medicalHistories || []);
      }
    });
  }
  ngOnInit(): void {
    this.loadUserProfile();
  }
}
