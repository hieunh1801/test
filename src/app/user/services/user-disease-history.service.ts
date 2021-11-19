import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment/environment';
import { LanguageService } from '@shared/services/language.service';
import { Observable } from 'rxjs';
import { DiseaseHistory } from './user-profile.service';

@Injectable({
  providedIn: 'root',
})
export class UserDiseaseHistoryService {
  private baseUrl = `${environment.gateway}/portal`;

  constructor(
    private httpClient: HttpClient,
    private languageService: LanguageService
  ) {}
  public getAllUserDiseaseHistory(): Observable<SpmedResponse<DiseaseHistory>> {
    const url = `${this.baseUrl}/v${environment.version}/${this.languageService.currentLanguage}/user/profile/disease-history`;
    return this.httpClient.get(url);
  }

  public postUserDiseaseHistory(
    body: DiseaseHistoryPostRequest
  ): Observable<SpmedResponse<DiseaseHistory>> {
    const url = `${this.baseUrl}/v${environment.version}/${this.languageService.currentLanguage}/user/profile/disease-history`;
    return this.httpClient.post(url, body);
  }

  public putUserDiseaseHistory(
    diseaseHistoryId: number,
    body: DiseaseHistoryPutRequest
  ): Observable<SpmedResponse<DiseaseHistory>> {
    const url = `${this.baseUrl}/v${environment.version}/${this.languageService.currentLanguage}/user/profile/disease-history/${diseaseHistoryId}`;
    return this.httpClient.put(url, body);
  }

  public deleteUserDiseaseHistory(
    diseaseHistoryId: number
  ): Observable<SpmedResponse<DiseaseHistory>> {
    const url = `${this.baseUrl}/v${environment.version}/${this.languageService.currentLanguage}/user/profile/disease-history/${diseaseHistoryId}`;
    return this.httpClient.delete(url);
  }
}

export interface DiseaseHistoryPostRequest {
  disease: string;
  note?: string;
  umlsId?: string;
  fromDate?: string;
  toDate?: string;
}

export interface DiseaseHistoryPutRequest {
  disease: string;
  note?: string;
  umlsId?: string;
  fromDate?: string;
  toDate?: string;
}
