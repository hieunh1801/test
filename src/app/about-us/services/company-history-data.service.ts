import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment/environment';
import { LanguageService } from '@shared/services/language.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CompanyHistoryDataService {
  private baseUrl = `${environment.gateway}/portal`;

  constructor(
    private httpClient: HttpClient,
    private languageService: LanguageService
  ) {}

  getAllCompanyHistory(): Observable<SpmedResponse<CompanyHistory>> {
    const lang = this.languageService.currentLanguage;
    const version = environment.version;
    const url = this.baseUrl + `/v${version}/${lang}/company-histories`;
    return this.httpClient.get<SpmedResponse<CompanyHistory>>(url);
  }
}

export interface CompanyHistoryKr {
  id: number;
  achieve: string;
}

export interface CompanyHistory {
  id: number;
  year: string;
  month: string;
  day?: any;
  achieve: string;
  createdTime?: any;
  createdActor?: any;
  updatedTime?: any;
  updatedActor?: any;
  kr: CompanyHistoryKr;
}
