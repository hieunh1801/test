import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment/environment';
import { LanguageService } from '@shared/services/language.service';
import { Observable } from 'rxjs';
import { MedicalHistory } from './user-profile.service';

@Injectable({
  providedIn: 'root',
})
export class UserMedicalHistoryService {
  private baseUrl = `${environment.gateway}/portal`;

  constructor(
    private httpClient: HttpClient,
    private languageService: LanguageService
  ) {}

  public getAllUserMedicalHistory(): Observable<SpmedResponse<MedicalHistory>> {
    const url = `${this.baseUrl}/v${environment.version}/${this.languageService.currentLanguage}/user/profile/medical-history`;
    return this.httpClient.get(url);
  }

  public postUserMedicalHistory(
    body: MedicalHistoryPostRequest
  ): Observable<SpmedResponse<MedicalHistory>> {
    const url = `${this.baseUrl}/v${environment.version}/${this.languageService.currentLanguage}/user/profile/medical-history`;
    return this.httpClient.post(url, body);
  }

  public putUserMedicalHistory(
    medicalHistoryId: number,
    body: MedicalHistoryPutRequest
  ): Observable<SpmedResponse<MedicalHistory>> {
    const url = `${this.baseUrl}/v${environment.version}/${this.languageService.currentLanguage}/user/profile/medical-history/${medicalHistoryId}`;
    return this.httpClient.put(url, body);
  }

  public deleteUserMedicalHistory(
    medicalHistoryId: number
  ): Observable<SpmedResponse<MedicalHistory>> {
    const url = `${this.baseUrl}/v${environment.version}/${this.languageService.currentLanguage}/user/profile/medical-history/${medicalHistoryId}`;
    return this.httpClient.delete(url);
  }
}

export interface MedicalHistoryPostRequest {
  drug: string;
  note?: string;
  umlsId?: string;
  kbDrugIdRef?: number;
  kbDrugbankIdRef?: number;
  fromDate: string;
  toDate: string;
}

export interface MedicalHistoryPutRequest {
  drug: string;
  note?: string;
  umlsId?: string;
  kbDrugIdRef?: number;
  kbDrugbankIdRef?: number;
  fromDate: string;
  toDate: string;
}
