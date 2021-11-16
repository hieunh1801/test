import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment/environment';
import { LanguageService } from '@shared/services/language.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserSettingsService {
  private baseUrl = `${environment.gateway}/portal`;
  constructor(
    private httpClient: HttpClient,
    private languageService: LanguageService
  ) {}

  changePassword(
    currentPassword: string,
    newPassword: string
  ): Observable<SpmedResponse<any>> {
    const changePasswordRequest: ChangePasswordRequest = {
      currentPassword,
      newPassword,
    };
    const url = `${this.baseUrl}/v${environment.version}/${this.languageService.currentLanguage}/auth/change-password`;
    return this.httpClient.put<SpmedResponse<any>>(url, changePasswordRequest);
  }
}

interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export enum ChangePasswordExceptionCode {
  invalidRequest = 'invalid_request',
  notFound = 'not_found',
  passwordIncorrect = 'password_incorrect',
  newPasswordIsSameAsCurrentPassword = 'new_password_is_same_as_current_password',
}
