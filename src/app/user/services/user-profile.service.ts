import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment/environment';
import { UserVariant } from '@pdss/components/my-report/services/pdss-report.service';
import { LanguageService } from '@shared/services/language.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {
  private baseUrl = `${environment.gateway}/portal`;

  constructor(
    private httpClient: HttpClient,
    private languageService: LanguageService
  ) {}

  getUserProfile(): Observable<SpmedResponse<UserProfile>> {
    const url = `${this.baseUrl}/v${environment.version}/${this.languageService.currentLanguage}/user/profile`;
    return this.httpClient.get(url);
  }
}

export interface UserProfile {
  id: number;
  username?: string;
  email?: string;
  enabled?: number;
  pcdssUserIdRef?: number;
  createdTime?: string;
  createdActor?: string;
  updatedTime?: string;
  updatedActor?: string;
  diseaseHistories?: DiseaseHistory[];
  medicalHistories?: MedicalHistory[];
  demographic?: Demographic;
  weightHeightHistories: WeightHeightHistory[];
  lifeStyleHistories: LifeStyleHistory[];
  pcdssUserVariants: UserVariant[];
}

export interface MedicalHistory {
  id: number;
  drug?: string;
  note?: string;
  umlsId?: string;
  kbDrugIdRef?: number;
  kbDrugbankIdRef?: number;
  fromDate?: string;
  toDate?: string;
  createdTime?: string;
  createdActor?: string;
  updatedTime?: string;
  updatedActor?: string;
}

export interface DiseaseHistory {
  id: number;
  disease?: string;
  note?: string;
  umlsId?: string;
  fromDate?: string;
  toDate?: string;
  createdTime?: string;
  createdActor?: string;
  updatedTime?: string;
  updatedActor?: string;
}

export interface WeightHeightHistory {
  id: number;
  weight?: number;
  // weightUnit?: any;
  height?: number;
  // heightUnit?: string;
  date?: string;
  createdTime: string;
  createdActor: string;
}

export interface Demographic {
  id: number;
  surname?: string;
  givenName?: string;
  fullName?: string;
  gender?: number;
  yearOfBirth?: string;
  monthOfBirth?: string;
  dayOfBirth?: string;
  birthday?: string;
  mobile?: string;
  country?: string;
  city?: string;
  district?: string;
  addressDetails?: string;
  avatar?: string;
  bloodType?: string;
  ethnicity?: string;
  nationality?: string;
  createdTime?: string;
  createdActor?: string;
  updatedTime?: string;
  updatedActor?: string;
}

export interface LifeStyleHistory {
  id: number;
  alcohol: number;
  alcoholAmount: number;
  alcoholUnit: string;
  alcoholPerTimeUnit: string;
  coffee: number;
  coffeeAmount: number;
  coffeeUnit: string;
  coffeePerTimeUnit: string;
  smoking: number;
  smokingAmount: number;
  smokingUnit: string;
  smokingPerTimeUnit: string;
  date: string;
  createdTime: string;
  createdActor: string;
}
