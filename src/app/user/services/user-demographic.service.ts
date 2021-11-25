import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment/environment';
import { LanguageService } from '@shared/services/language.service';
import { Observable } from 'rxjs';
import { Demographic } from './user-profile.service';

@Injectable({
  providedIn: 'root',
})
export class UserDemographicService {
  private baseUrl = `${environment.gateway}/portal`;

  constructor(
    private httpClient: HttpClient,
    private languageService: LanguageService
  ) {}

  getUserDemographic(): Observable<SpmedResponse<Demographic>> {
    const url = `${this.baseUrl}/v${environment.version}/${this.languageService.currentLanguage}/user/profile/demographic`;
    return this.httpClient.get(url);
  }

  puUserDemographic(
    putRequest: DemographicPutRequest
  ): Observable<SpmedResponse<Demographic>> {
    const url = `${this.baseUrl}/v${environment.version}/${this.languageService.currentLanguage}/user/profile/demographic`;
    return this.httpClient.put(url, putRequest);
  }
}

export interface DemographicPutRequest {
  surname?: string;
  givenName?: string;
  gender?: number;
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
}
