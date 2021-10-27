import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LanguageService } from './language.service';

@Injectable({
  providedIn: 'root',
})
export class MaintainService {
  private baseUrl = `${environment.gateway}/portal`;

  constructor(
    private languageService: LanguageService,
    private httpClient: HttpClient
  ) {}

  ping(): void {
    const url = `${this.baseUrl}/ping`;
    this.httpClient.get(url).subscribe();
  }
}
