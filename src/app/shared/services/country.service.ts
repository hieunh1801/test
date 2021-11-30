import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment/environment';
import { Report } from '@pdss/components/my-report/services/pdss-report.service';
import { Observable } from 'rxjs';
import { LanguageService } from './language.service';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private baseUrl = `${environment.gateway}/portal`;

  constructor(
    private httpClient: HttpClient,
    private languageService: LanguageService
  ) {}

  getAllCountry(name: string): Observable<SpmedResponse<Country>> {
    const url = `${this.baseUrl}/v${environment.version}/${this.languageService.currentLanguage}/countries?name=${name}`;
    return this.httpClient.get(url);
  }
}

export interface Country {
  iso: string;
  code: string;
  name: string;
}
