import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment/environment';
import { LanguageService } from '@shared/services/language.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserDrugSynonymService {
  private baseUrl = `${environment.gateway}/portal`;

  constructor(
    private httpClient: HttpClient,
    private languageService: LanguageService
  ) {}

  public searchDrugSynonym(
    keyword: string
  ): Observable<SpmedResponse<DrugSynonym>> {
    const url = `${this.baseUrl}/v${environment.version}/${this.languageService.currentLanguage}/drug-synonyms/search?keyword=${keyword}`;
    return this.httpClient.get(url);
  }
}

export interface DrugSynonym {
  id: number;
  drugId: number;
  synonyms: string;
  type: string;
}
