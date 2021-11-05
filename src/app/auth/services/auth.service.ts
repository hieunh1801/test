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

  /*
  createUser(payload: CustomerUserCreateRequest): Observable<SpmedResponse> {
    const url = `${this.baseUrl}/v${environment.version}/${this.languageService.currentLanguage}/auth/signup`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });    
    return this.http.post<SpmedResponse>(url, payload, { headers })
      .pipe(
          // tap(data => console.log(JSON.stringify(data)))
      );
  }

  getID(payload: IDCheckRequest): Observable<SpmedResponse> {
    const url = `${this.baseUrl}/v${environment.version}/${this.languageService.currentLanguage}/auth/idcheck`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<SpmedResponse>(url, payload, { headers })
      .pipe(
          // tap(data => console.log(JSON.stringify(data)))
      );
  }

*/
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

export interface IDCheckRequest {
  username: string;
}

export interface CustomerUserCreateRequest {
  username: string;
  password: string;
  sirname: string;
  givenname: string;
  email: string;
  birthday: string;
  gender: string;
  mobile: string;
  enabled: number;
  role: number;
}

export interface CustomerUserCreateResponse {}
