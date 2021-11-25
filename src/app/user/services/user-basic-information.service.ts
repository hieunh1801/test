import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment/environment';
import { LanguageService } from '@shared/services/language.service';
import { Observable } from 'rxjs';
import { WeightHeightHistory } from './user-profile.service';

@Injectable({
  providedIn: 'root',
})
export class UserBasicInformationService {
  private baseUrl = `${environment.gateway}/portal`;

  constructor(
    private httpClient: HttpClient,
    private languageService: LanguageService
  ) {}

  getAllUserWeightHeightHistory(): Observable<
    SpmedResponse<WeightHeightHistory>
  > {
    const url = `${this.baseUrl}/v${environment.version}/${this.languageService.currentLanguage}/user/profile/weight-height-history`;
    return this.httpClient.get(url);
  }

  postWeightHeightHistory(
    postRequest: WeightHeightHistoryPostRequest
  ): Observable<SpmedResponse<WeightHeightHistory>> {
    const url = `${this.baseUrl}/v${environment.version}/${this.languageService.currentLanguage}/user/profile/weight-height-history`;
    return this.httpClient.post(url, postRequest);
  }

  putWeightHeightHistory(
    weightHeightHistoryId: number,
    putRequest: WeightHeightHistoryPutRequest
  ): Observable<SpmedResponse<WeightHeightHistory>> {
    const url = `${this.baseUrl}/v${environment.version}/${this.languageService.currentLanguage}/user/profile/weight-height-history/${weightHeightHistoryId}`;
    return this.httpClient.put(url, putRequest);
  }

  deleteWeightHeightHistory(
    weightHeightHistoryId: number
  ): Observable<SpmedResponse<WeightHeightHistory>> {
    const url = `${this.baseUrl}/v${environment.version}/${this.languageService.currentLanguage}/user/profile/weight-height-history/${weightHeightHistoryId}`;
    return this.httpClient.delete(url);
  }
}

export interface WeightHeightHistoryPostRequest {
  weight: number;
  height: number;
  date: string;
}

export interface WeightHeightHistoryPutRequest {
  weight: number;
  height: number;
  date: string;
}
