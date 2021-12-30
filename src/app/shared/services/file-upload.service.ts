import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment/environment';
import { Observable } from 'rxjs';
import { LanguageService } from './language.service';

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  private baseUrl = `${environment.gateway}/portal`;

  constructor(
    private httpClient: HttpClient,
    private languageService: LanguageService
  ) {}

  uploadImage(file: File): Observable<SpmedResponse<FileUpload>> {
    const url = `${this.baseUrl}/v${environment.version}/${this.languageService.currentLanguage}/files/upload`;
    const formData: FormData = new FormData();
    formData.append('file', file);
    return this.httpClient.post<SpmedResponse<FileUpload>>(url, formData);
  }
}

export interface FileUpload {
  location: string;
  name: string;
  url: string;
}
