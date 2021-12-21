import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment/environment';
import { Drug } from '@pdss/components/browser/components/drug/drug';
import { LanguageService } from '@shared/services/language.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PdssDrugService {
  private baseUrl = `${environment.gateway}/portal`;

  constructor(
    private httpClient: HttpClient,
    private languageService: LanguageService
  ) {}

  searchDrugsByAtcCode(
    pageIndex: number,
    pageSize: number,
    drugName: string,
    searchRequest: AtcDrugSearchRequest
  ): Observable<SpmedResponse<Drug>> {
    const url = `${this.baseUrl}/v${environment.version}/${this.languageService.currentLanguage}/drugs/atc-search?pageIndex=${pageIndex}&pageSize=${pageSize}&drug.name=${drugName}`;
    return this.httpClient.post<SpmedResponse<any>>(url, searchRequest);
  }
}

export interface AtcDrugSearchRequest {
  level1: string;
  level2: string;
  level3: string;
  level4: string;
}
