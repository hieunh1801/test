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

  login(): void {
    const url = `${this.baseUrl}/v${environment.version}/${this.languageService.currentLanguage}/auth/login`;
    const body = {
      username: 'tester01',
      password: 123456,
    };
    this.httpClient.post(url, body).subscribe();
  }
}
