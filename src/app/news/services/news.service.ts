import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment/environment';
import { LanguageService } from '@shared/services/language.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  // private baseUrl = `${environment.gateway}/portal`;
  private lang = 'en';
  private baseUrl = `${environment.gateway}/portal/v${environment.version}/${this.lang}/admin/customer-boards`;

  constructor(
    private languageService: LanguageService,
    private httpClient: HttpClient
  ) {}

  getCustomerBoard(searchRequest: CustomerBoardSearchRequest): Observable<any> {
    const url = `${this.baseUrl}/search?${new URLSearchParams(
      searchRequest as any
    ).toString()}`;
    console.log(url);

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient
      .get<any>(url, { headers })
      .pipe(tap((data) => console.log(JSON.stringify(data))));
  }

  getCustomerBoardById(boardId: number): Observable<any> {
    const url = `${this.baseUrl}/${boardId}`;
    console.log(url);
    return this.httpClient.get<any>(url).pipe();
    //tap((data) => console.log(JSON.stringify(data))));
  }
}

export interface CustomerBoardSearchRequest {
  keyword?: string;
  boardCategoryId: number;
}

export interface SearchResponse {
  id: number;
  boardCategoryId: string;
  boardTagId: number;
  boardTag?: string;
  title?: string;
  content?: string;
  author?: string;
  publishTime?: string;
  draft?: number;
  pin?: number;
  deleted: number;
  kr: CustomerBoardKr;
}

export interface CustomerBoard {
  id: number;
  boardCategoryId: string;
  boardTagId: number;
  boardTag?: string;
  title?: string;
  content?: string;
  author?: string;
  password?: string;
  readCount?: number;
  publishTime?: string;
  draft?: number;
  pin?: number;
  deleted: number;
  kr: CustomerBoardKr;
  createdTime: string;
  createdActor: string;
  updatedTime?: string;
  updatedActor?: string;
}

export interface CustomerBoardKr {
  boardTagId: number;
  boardTag?: string;
  title?: string;
  content?: string;
  author?: string;
}
