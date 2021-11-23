import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserBasicInformationService {
  constructor() {}

  createWeightHeightHistory(
    createRequest: WeightHeightHistoryCreateRequest
  ): void {}

  deleteWeightHeightHistory(id: number): void {}
}

export interface WeightHeightHistoryCreateRequest {
  weight?: number;
  height?: number;
  date?: string;
}
