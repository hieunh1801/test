import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment/environment';
import { LanguageService } from '@shared/services/language.service';
import { Observable } from 'rxjs';
import { LifeStyleHistory } from './user-profile.service';

@Injectable({
  providedIn: 'root',
})
export class UserLifeStyleService {
  private baseUrl = `${environment.gateway}/portal`;

  constructor(
    private httpClient: HttpClient,
    private languageService: LanguageService
  ) {}
  public getAllUserLifeStyleHistory(): Observable<
    SpmedResponse<LifeStyleHistory>
  > {
    const url = `${this.baseUrl}/v${environment.version}/${this.languageService.currentLanguage}/user/profile/life-style-history`;
    return this.httpClient.get(url);
  }

  public postUserLifeStyleHistory(
    body: LifeStyleHistoryPostRequest
  ): Observable<SpmedResponse<LifeStyleHistory>> {
    const url = `${this.baseUrl}/v${environment.version}/${this.languageService.currentLanguage}/user/profile/life-style-history`;
    return this.httpClient.post(url, body);
  }

  public putUserLifeStyleHistory(
    lifeStyleHistoryId: number,
    body: LifeStyleHistoryPutRequest
  ): Observable<SpmedResponse<LifeStyleHistory>> {
    const url = `${this.baseUrl}/v${environment.version}/${this.languageService.currentLanguage}/user/profile/life-style-history/${lifeStyleHistoryId}`;
    return this.httpClient.put(url, body);
  }

  public deleteUserLifeStyleHistory(
    lifeStyleHistoryId: number
  ): Observable<SpmedResponse<LifeStyleHistory>> {
    const url = `${this.baseUrl}/v${environment.version}/${this.languageService.currentLanguage}/user/profile/life-style-history/${lifeStyleHistoryId}`;
    return this.httpClient.delete(url);
  }
}

export interface LifeStyleHistoryPutRequest {
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
}

export interface LifeStyleHistoryPostRequest {
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
}
