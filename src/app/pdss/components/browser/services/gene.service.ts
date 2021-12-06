import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment/environment';
import { LanguageService } from '@shared/services/language.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class GeneService {
  private baseUrl = `${environment.gateway}/portal`;
  constructor(
    private languageService: LanguageService,
    private httpClient: HttpClient
  ) {}

  /**
   * Get drug detaiils
   */
  getById(id: number): Observable<any> {
    const url = `${this.baseUrl}/v${environment.version}/${this.languageService.currentLanguage}/pdss/browser/gene/${id}`;

    // Calling API for getting all guidelines
    return this.httpClient
      .get(url)
      .pipe
      // tap((data) => console.log(JSON.stringify(data)));
      ();
  }
  /**
   * Get drug detaiils
   */
  getGeneByName(symbol: string): Observable<any> {
    const url = `${this.baseUrl}/v${environment.version}/${this.languageService.currentLanguage}/pdss/browser/gene/search`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const payload: GeneSearchListRequest = new GeneSearchListRequest();
    const genes: Array<GeneSearchRequest> = [];
    const gene: GeneSearchRequest = new GeneSearchRequest();
    gene.geneSymbol = symbol;
    genes.push(gene);
    payload.genes = genes;

    // Calling API for getting all guidelines
    return this.httpClient.post(url, payload, { headers }).pipe(); //tap((data) => console.log(JSON.stringify(data))));
  }
}

export class GeneSearchListRequest {
  genes: Array<GeneSearchRequest>;
  hasGuideline: number;
}

export class GeneSearchRequest {
  geneSymbol: string;
}
