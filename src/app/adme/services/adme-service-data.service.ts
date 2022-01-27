import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment/environment';
import { LanguageService } from '@shared/services/language.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdmeServiceDataService {
  private baseUrl = `${environment.gateway}/portal`;

  constructor(
    private languageService: LanguageService,
    private httpClient: HttpClient
  ) {}

  getAllAdmeService(): Observable<SpmedResponse<AdmeService>> {
    const lang = this.languageService.currentLanguage;
    const version = environment.version;
    const url = this.baseUrl + `/v${version}/${lang}/adme-services`;
    return this.httpClient.get<SpmedResponse<AdmeService>>(url);
  }
}

export interface AdmeService {
  id: number;
  mainCategory: string;
  subclass: string;
  technology: string;
  createdTime?: number;
  createdActor?: string;
  updatedTime?: string;
  updatedActor?: string;
}
