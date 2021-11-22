import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment/environment';
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
  diseaseHistories: DiseaseHistory[];
  medicalHistories: MedicalHistory[];
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
