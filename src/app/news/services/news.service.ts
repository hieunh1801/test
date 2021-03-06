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
  private baseUrl = `${environment.gateway}/portal/v${environment.version}/${this.lang}/customer-boards`;

  private baseUrlV2 = `${environment.gateway}/portal`;

  constructor(
    private languageService: LanguageService,
    private httpClient: HttpClient
  ) {}

  getAll(): Observable<SpmedResponse<CustomerBoard>> {
    const url = `${this.baseUrlV2}/v${environment.version}/${this.languageService.currentLanguage}/customer-boards`;
    return this.httpClient.get<SpmedResponse<CustomerBoard>>(url);
  }

  getRecentListFromBoard(boardCategoryId: number): Observable<any> {
    const url = `${this.baseUrl}/recent/${boardCategoryId}`;
    return this.httpClient.get<any>(url);
    //.pipe(tap((data) => console.log(JSON.stringify(data))));
  }

  getCustomerBoard(searchRequest: CustomerBoardSearchRequest): Observable<any> {
    const url = `${this.baseUrl}/search?${new URLSearchParams(
      searchRequest as any
    ).toString()}`;
    // console.log(url);

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.get<any>(url, { headers });
    //.pipe(tap((data) => console.log(JSON.stringify(data))));
  }

  getCustomerBoardByboardTagId(boardTagId: number): Observable<any> {
    const url = `${this.baseUrl}/boardTagId/${boardTagId}`;
    return this.httpClient.get<any>(url);
  }

  getCustomerBoardById(
    boardId: number
  ): Observable<SpmedResponse<CustomerBoard>> {
    const url = `${this.baseUrl}/${boardId}`;
    return this.httpClient.get<SpmedResponse<CustomerBoard>>(url);
    //.pipe(tap((data) => console.log(JSON.stringify(data))));
  }

  updateReadCount(boardId: number): Observable<any> {
    const url = `${this.baseUrl}/count/${boardId}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.put<any>(url, { headers });
  }

  getCustomerBoardAttachmentById(boardId: number): Observable<any> {
    const url = `${this.baseUrl}/attachment/${boardId}`;
    return this.httpClient.get<any>(url).pipe();
    //.pipe(tap((data) => console.log(JSON.stringify(data))));
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
  thumbnailUrl?: string;
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
  thumbnailUrl?: string;
  draft?: number;
  pin?: number;
  deleted: number;
  kr: CustomerBoardKr;
  tags: Array<CustomerBoardTag>;
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
  thumbnailUrl?: string;
}

export class CustomerBoardTag {
  id: number;
  boardCategoryId: string;
  boardCategory: string;
  name: string;
  dataOrder: number;
  deleted: number;
  kr: CustomerBoardTagKr;
}

export class CustomerBoardTagKr {
  id: number;
  name: string;
  order: number;
}

export interface CustomerBoardView {
  id: number;
  boardCategoryId: string;
  boardTag?: string;
  title?: string;
  content?: string;
  author?: string;
  publishTime?: string;
  pin?: number;
}

export interface CustomerBoardAttachment {
  id: number;
  boardId: number;
  viewFileName: string;
  url: string;
  kr: CustomerBoardAttachmentKr;
  deleted: number;
}

export interface CustomerBoardAttachmentEn {
  id: number;
  boardId: number;
  viewFileName: string;
  url: string;
  deleted: number;
}

export interface CustomerBoardAttachmentKr {
  id: number;
  boardId: number;
  viewFileName: string;
  url: string;
  deleted: number;
}
