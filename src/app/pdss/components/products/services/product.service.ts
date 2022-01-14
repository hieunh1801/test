import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment/environment';
import { LanguageService } from '@shared/services/language.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = `${environment.gateway}/portal`;

  constructor(
    private httpClient: HttpClient,
    private languageService: LanguageService
  ) {}

  getProductByName(
    name: 'pgx-premium' | 'pgx-np' | 'single-gene'
  ): Observable<SpmedResponse<Product>> {
    const url = `${this.baseUrl}/v${environment.version}/${this.languageService.currentLanguage}/products/by/name/${name}`;
    return this.httpClient.get(url);
  }
}

export interface ProductKr {
  id: number;
  purpose: string;
}

export interface Gene {
  id: number;
  symbol: string;
  createdTime: string;
  createdActor: string;
  drugs?: any;
}

export interface Drug {
  id: number;
  name: string;
  createdTime: string;
  createdActor: string;
  genes?: any;
  bizGroups?: any;
}

export interface InterpretationKr {
  interpretationId: number;
  simplifiedInterpretationSpmed?: any;
  clinicalInterpretationSpmed?: any;
  interpretationCpic?: any;
  interpretationDpwg?: any;
  interpretationFda?: any;
  interpretationCa?: any;
  loeCpic?: any;
  loeFda?: any;
  loeCa?: any;
}

export interface Interpretation {
  interpretationId: number;
  geneId?: any;
  genotypeId?: any;
  phenotypeId?: any;
  relatedGene?: any;
  relatedDrugs?: any;
  simplifiedInterpretationSpmed?: any;
  clinicalInterpretationSpmed?: any;
  interpretationCpic?: any;
  interpretationDpwg?: any;
  interpretationFda?: any;
  interpretationCa?: any;
  loeCpic?: any;
  loeFda?: any;
  loeCa?: any;
  riskLevelId?: any;
  totalInterpretationId?: any;
  guidelineId?: any;
  deleted?: any;
  createdTime?: any;
  createdActor?: any;
  updatedTime?: any;
  updatedActor?: any;
  kr: InterpretationKr;
  geneSymbol?: any;
  rsid?: any;
  genotypeCode?: any;
  phenotypeCode?: any;
  drugs?: any;
  roes?: any;
}

export interface Hospital {
  id: number;
  name?: string;
  department?: string;
  cityId?: number;
  districtId?: number;
  addressDetails?: string;
  hospitalIdRef?: string;
  city?: string;
  district?: string;
  telephone?: string;
  contract: number;
  createdTime: string;
  createdActor: string;
  updatedTime: string;
  updatedActor: string;
}

export interface Product {
  id: number;
  code: string;
  name: string;
  shortName: string;
  purpose: string;
  testPeriod: number;
  testPeriodUnit: string;
  testPriceId?: any;
  testPrice?: any;
  testPriceUnit?: any;
  priceHistoryList?: any;
  productCategoryId: number;
  creationMode: string;
  createdTime: string;
  createdActor: string;
  updatedTime: string;
  updatedActor?: any;
  kr: ProductKr;
  genes: Gene[];
  drugs: Drug[];
  bizGroups?: any;
  testMethods?: any;
  roes?: any;
  interpretations: Interpretation[];
  hospitals: Hospital[];
}
