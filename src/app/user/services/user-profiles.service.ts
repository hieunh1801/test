import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserProfilesService {
  constructor() {}
}

export interface UserMedicalHistory {
  disease: string;
  note?: string;
  fromDate?: string;
  toDate?: string;
}

export interface UserMedicalHistoryCreateRequest {
  disease: string;
  note?: string;
  fromDate?: string;
  toDate?: string;
}

export interface UserMedicalHistoryResponse {
  id: number;
  disease: string;
  note?: string;
  fromDate?: string;
  toDate?: string;

  createdTime?: string;
  createdActor?: string;
  updatedTime?: string;
  updatedActor?: string;
}
