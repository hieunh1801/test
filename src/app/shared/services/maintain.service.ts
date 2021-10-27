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

  signUp(): void {
    const url = `${this.baseUrl}/v${environment.version}/${this.languageService.currentLanguage}/auth/sign-up`;
    const body = {
      username: 'tester06',
      password: '123456',
      email: 'tester06@gmail.com',
    };
    this.httpClient.post(url, body).subscribe();
  }
}
