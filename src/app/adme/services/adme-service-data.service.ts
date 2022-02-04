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

  getAllAdmeServiceMainCategory(): Observable<
    SpmedResponse<AdmeServiceMainCategory>
  > {
    const lang = this.languageService.currentLanguage;
    const version = environment.version;
    const url =
      this.baseUrl + `/v${version}/${lang}/adme-services/main-categories`;
    return this.httpClient.get<SpmedResponse<AdmeServiceMainCategory>>(url);
  }
}

// export interface AdmeService {
//   id: number;
//   mainCategory: string;
//   subclass: string;
//   technology: string;
//   createdTime?: number;
//   createdActor?: string;
//   updatedTime?: string;
//   updatedActor?: string;
// }

export interface AdmeService {
  id: number;
  // mainCategory?: any;
  // subclass?: any;
  // technology?: any;
  title: string;
  display?: number;
  description?: any;
}

export interface AdmeServiceSubCategory {
  id: number;
  title: string;
  description?: any;
  display: number;
  mainCategory?: any;
  admeServices: AdmeService[];
}

export interface AdmeServiceMainCategory {
  id: number;
  title: string;
  description?: any;
  display: number;
  subCategories: AdmeServiceSubCategory[];
}
