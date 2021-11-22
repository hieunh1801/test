import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment/environment';
import { LanguageService } from '@shared/services/language.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BrowserService {
  private baseUrl = `${environment.gateway}/portal`;

  constructor(
    private languageService: LanguageService,
    private httpClient: HttpClient
  ) {}

  search(searchRequest: SearchRequest): Observable<any> {
    const url = `${this.baseUrl}/v${environment.version}/${this.languageService.currentLanguage}/pdss/browser/total-search`;
    const body = {
      keyword: searchRequest.keyword,
    };
    return this.httpClient
      .post<any>(url, body)
      .pipe
      //tap((data) => console.log(JSON.stringify(data))));
      ();
  }
}

export interface SearchRequest {
  keyword: string;
}

export interface SearchResponse {
  id: number;
  name: string;
  type: string;
}
