import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment/environment';
import { LanguageService } from '@shared/services/language.service';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class PdssInterpretationService {
  private baseUrl = `${environment.gateway}/portal`;

  constructor(
    private httpClient: HttpClient,
    private languageService: LanguageService
  ) {}

  getInterpretationRoes(id: number): Observable<SpmedResponse<Roe>> {
    const url = `${this.baseUrl}/v${environment.version}/${this.languageService.currentLanguage}/interpretations/${id}/roes`;
    return this.httpClient.get(url);
  }
}

export interface Roe {
  roeId: number;
  title: string;
  pmid: string;
  pmcid: string;
  doi: string;
  firstAuthor: string;
  publishedYear: string;
  journal: string;
  citeInformation: string;
  createdTime: string;
  createdActor: string;
  updatedTime: string;
  updatedActor: string;
}
