import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
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

  createUser(payload: CustomerUserCreateRequest): Observable<any> {
    const url = `${this.baseUrl}/v${environment.version}/${this.languageService.currentLanguage}/auth/sign-up`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    console.log(payload);
    return this.httpClient
      .post<any>(url, payload, { headers })
      .pipe(tap((data) => console.log(JSON.stringify(data))));
  }

  getID(checkUserNameRequest: CheckUserNameRequest): Observable<any> {
    const url = `${this.baseUrl}/v${environment.version}/${this.languageService.currentLanguage}/auth/check-username`;
    const body = {
      username: checkUserNameRequest.username,
    };
    return this.httpClient
      .post<any>(url, body)
      .pipe(tap((data) => console.log(JSON.stringify(data))));
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

export interface CheckUserNameRequest {
  username: string;
}

export interface CheckUserNameResponse {}

export interface CustomerUserCreateRequest {
  userName: string;
  password: string;
  surName: string;
  givenName: string;
  email: string;
  birthday: string;
  gender: string;
  mobile: string;
  role: number;
}

export interface CustomerUserCreateResponse {}
