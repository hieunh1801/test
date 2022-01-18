import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment/environment';
import {
  Hospital,
  Product,
  ProductService,
} from '@pdss/components/products/services/product.service';
import { LanguageService } from '@shared/services/language.service';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AffiliatedHospitalDataService {
  private baseUrl = `${environment.gateway}/portal`;

  constructor(
    private httpClient: HttpClient,
    private languageService: LanguageService,
    private productService: ProductService
  ) {}

  getAffiliatedHospital(): Observable<AffiliatedHospital[]> {
    const subList = [
      this.productService.getProductByName('pgx-premium'),
      this.productService.getProductByName('pgx-np'),
      this.productService.getProductByName('single-gene'),
    ];

    return combineLatest(subList).pipe(
      map(([pgxPremiumResponse, pgxNpProductList, singleGeneProductList]) => {
        const pgxPremiumHospitalList: AffiliatedHospital[] =
          pgxPremiumResponse?.data?.items?.[0]?.hospitals?.map((hospital) => ({
            ...hospital,
            products: ['pgx-premium'],
          })) || [];
        const pgxNpHospitalList: AffiliatedHospital[] =
          pgxNpProductList?.data?.items?.[0]?.hospitals?.map((hospital) => ({
            ...hospital,
            products: ['pgx-np'],
          })) || [];
        const singleGeneHospitalList: AffiliatedHospital[] =
          singleGeneProductList?.data?.items
            ?.map((product) => product.hospitals || [])
            ?.reduce((hospitalList, data) => [...hospitalList, ...data], [])
            ?.map((hospital) => ({ ...hospital, products: ['single-gene'] })) ||
          [];

        const hospitalMap: Map<number, AffiliatedHospital> = new Map();

        for (const hospital of [
          ...pgxNpHospitalList,
          ...pgxPremiumHospitalList,
          ...singleGeneHospitalList,
        ]) {
          const hospitalId = hospital.id;
          if (hospitalMap.has(hospitalId)) {
            const hospitalExisted = hospitalMap.get(hospitalId);
            const newProduct = hospital.products?.[0];
            if (!hospitalExisted.products.includes(newProduct)) {
              hospitalExisted.products.push(newProduct);
            }
          } else {
            hospitalMap.set(hospitalId, hospital);
          }
        }

        const affiliatedHospitalList: AffiliatedHospital[] = [];
        hospitalMap.forEach((affiliatedHospital) =>
          affiliatedHospitalList.push(affiliatedHospital)
        );

        return affiliatedHospitalList;
      })
    );
  }
}

export interface AffiliatedHospital extends Hospital {
  products: string[];
}
