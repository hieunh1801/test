import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LanguageService } from '../../shared/services/language.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = `${environment.gateway}/portal`;

  constructor(
    private languageService: LanguageService,
    private httpClient: HttpClient
  ) {}

  login(loginRequest: LoginRequest): Observable<any> {
    const url = `${this.baseUrl}/v${environment.version}/${this.languageService.currentLanguage}/auth/login`;
    const body = {
      username: loginRequest.username,
      password: loginRequest.password,
    };
    return this.httpClient.post(url, body);
  }
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  id: number;
  username: string;
  email: string;
  accessToken: string;
  refreshToken: string;
  authorities?: string[];
}
