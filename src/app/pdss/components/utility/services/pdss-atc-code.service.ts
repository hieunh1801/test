import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment/environment';
import { AtcCode } from '@pdss/components/browser/components/drug/atc-code';
import { Drug } from '@pdss/components/browser/components/drug/drug';
import { LanguageService } from '@shared/services/language.service';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class PdssAtcCodeService {
  private baseUrl = `${environment.gateway}/portal`;
  constructor(
    private httpClient: HttpClient,
    private languageService: LanguageService
  ) {}


  
  getAllAtcCode(): Observable<SpmedResponse<AtcCode>> {
    const url = `${this.baseUrl}/v${environment.version}/${this.languageService.currentLanguage}/atc-codes`;
    return this.httpClient.get<SpmedResponse<any>>(url);
  }
}
