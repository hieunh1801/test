import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment/environment';
import { LanguageService } from '@shared/services/language.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DrugService {
  private baseUrl = `${environment.gateway}/portal`;
  constructor(
    private languageService: LanguageService,
    private httpClient: HttpClient
  ) {}

  /**
   * Get drug detaiils
   */
  getById(id: number): Observable<any> {
    const url = `${this.baseUrl}/v${environment.version}/${this.languageService.currentLanguage}/pdss/browser/drug/${id}`;

    // Calling API for getting all guidelines
    return this.httpClient.get(url).pipe(
      //tap((data) => console.log(JSON.stringify(data)));
      tap((data) => console.log(JSON.stringify(data)))
    );
  }

  /**
   * Get drug detaiils
   */
  getDrugSynonymsById(id: number): Observable<any> {
    const url = `${this.baseUrl}/v${environment.version}/${this.languageService.currentLanguage}/pdss/browser/drugsynonyms/${id}`;

    // Calling API for getting all guidelines
    return this.httpClient
      .get(url)
      .pipe
      // tap((data) => console.log(JSON.stringify(data))));
      ();
  }
}
