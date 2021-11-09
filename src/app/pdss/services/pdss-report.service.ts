import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LanguageService } from 'src/app/shared/services/language.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PdssReportService {
  private baseUrl = `${environment.gateway}/portal`;

  constructor(
    private httpClient: HttpClient,
    private languageService: LanguageService
  ) {}

  getMyReport(): Observable<SpmedResponse<Report>> {
    const url = `${this.baseUrl}/v${environment.version}/${this.languageService.currentLanguage}/pdss/my-report`;
    return this.httpClient.get(url);
  }

  getReportById(): void {
    const url = `https://gwapi.spmed.kr/api-gateway/v1.0/pcdss/v1.0/en/users/3/reports`;
  }
}

export interface ReportKr {
  id: number;
  productPurpose: string;
  productTestMethod: string;
}

export interface Gene {
  id: number;
  symbol: string;
  rsid: string;
  genotype: string;
  phenotype: string;
  recommendation: string;
  drugRecommendationId: number;
  referenceOfEvidence?: string;
}

export interface DrugRecommendationKr {
  id: number;
  drugName: string;
  recommendation?: any;
  risk?: any;
  diseaseClass: string;
  kpicClass: string;
  kfdaClass: string;
  relatedDiseases: string;
  dose?: any;
}

export interface DrugRecommendation {
  id: number;
  drugName: string;
  recommendation?: string;
  risk: string;
  relatedGenes: string;
  diseaseClass: string;
  kpicClass: string;
  kfdaClass: string;
  relatedDiseases: string;
  referenceOfEvidence?: string;
  dose?: any;
  reportId: number;
  createdTime: string;
  createdActor: string;
  updatedTime: string;
  updatedActor?: string;
  genes: Gene[];
  kr: DrugRecommendationKr;

  product: string; // additional information
}

export interface Report {
  id: number;
  qrCode: string;
  sampleNumberRef: string;
  sampleReceiptDate: string;
  sampleCollectDateRef: string;
  sampleType: string;
  reportDate: string;
  productCode: string;
  productName: string;
  productPurpose: string;
  productTestMethod: string;
  referenceOfEvidence?: any;
  userId: number;
  patient: number;
  createdTime: string;
  createdActor: string;
  updatedTime: string;
  updatedActor: string;
  kr: ReportKr;
  drugRecommendations: DrugRecommendation[];
}
