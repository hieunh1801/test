import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment/environment';
import { LanguageService } from '@shared/services/language.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

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

  /**
   * Get top drug list
   */
  getTopDrugs(): Observable<any> {
    const url = `${this.baseUrl}/v${environment.version}/${this.languageService.currentLanguage}/pdss/browser/top-drugs`;

    // Calling API for getting all guidelines
    return this.httpClient
      .get(url)
      .pipe
      //tap((data) => console.log(JSON.stringify(data)));
      ();
  }

  /**
   * Get top gene list
   */
  getTopGenes(): Observable<any> {
    const url = `${this.baseUrl}/v${environment.version}/${this.languageService.currentLanguage}/pdss/browser/top-genes`;

    // Calling API for getting all guidelines
    return this.httpClient
      .get(url)
      .pipe
      //tap((data) => console.log(JSON.stringify(data)));
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

export interface TopDrugsResponse {
  id: number;
  name: string;
}

export interface TopGenesResponse {
  id: number;
  symbol: string;
}
