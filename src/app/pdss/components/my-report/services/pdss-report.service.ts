import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment/environment';
import { LanguageService } from '@shared/services/language.service';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

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

  getReportByQrCode(qrCode: string): Observable<SpmedResponse<Report>> {
    // const url = `https://gwapi.spmed.kr/api-gateway/v1.0/pcdss/v1.0/en/users/3/reports`;
    const url = `${this.baseUrl}/v${environment.version}/${this.languageService.currentLanguage}/pdss/my-report`;
    const options = {
      params: { qrCode },
    };
    return this.httpClient.get(url);
  }

  getReportGeneticResult(
    qrCode: string
  ): Observable<SpmedResponse<UserVariant>> {
    const url = `https://gwapi.spmed.kr/api-gateway/v1.0/pcdss/v1.0/en/reports/${qrCode}/variants`;
    return this.httpClient.get(url);
  }

  getReportAdditionalInformation(
    productCode: string = 'SGH007',
    patient: number = 1
  ): Observable<SpmedResponse<ReportAdditionalInformation>> {
    const url = `https://gwapi.spmed.kr/api-gateway/v1.0/pcdss/v1.0/en/additional-informations?product_code=${productCode}&patient=${patient}`;
    return this.httpClient.get<SpmedResponse<ReportAdditionalInformation>>(url);
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
  resultReportFileName?: string;
  resultReportDisplayName?: string;
  kr: ReportKr;
  drugRecommendations: DrugRecommendation[];
}

export interface UserVariant {
  id: number;
  relatedTestAlleles?: string;
  variantRsid?: string;
  variantGenotypeCode?: string;
  variantGenotype?: string;
  variantPhenotypeCode?: string;
  variantPhenotype?: string;
  variantPhenotypeSummary?: any;
  relatedDrugs?: string;
  userGeneId?: number;
  userGeneSymbol?: string;
  userId?: number;
  qrCode?: string;
  kr: UserVariantKr;
}

export interface UserVariantKr {
  id: number;
  variantPhenotypeCode?: any;
  variantPhenotype?: any;
  variantPhenotypeSummary?: string;
  relatedDrugs?: string;
}

export interface ReportAdditionalInformation {
  additionalInformationId: number;
  content?: string;
  productCode?: string;
  patient?: number;
  group?: number;
  order?: number;
  createdTime?: string;
  createdActor?: string;
}
