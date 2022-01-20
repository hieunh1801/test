import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Hospital } from '../products/services/product.service';
import {
  AffiliatedHospital,
  AffiliatedHospitalDataService,
} from './services/affiliated-hospital-data.service';

@Component({
  selector: 'app-affiliated-hospital',
  templateUrl: './affiliated-hospital.component.html',
  styleUrls: ['./affiliated-hospital.component.scss'],
})
export class AffiliatedHospitalComponent implements OnInit, OnDestroy {
  hospitalList: AffiliatedHospital[] = [];

  dataSource: AffiliatedHospital[] = [];

  subscription$ = new Subscription();

  displayedColumns: string[] = [
    'rowIndex',
    'name',
    'telephone',
    'department',
    'addressDetails',
    'products',
  ];

  productOptions = [
    {
      name: 'All',
      value: 'all',
    },
    {
      name: 'PGx-NP',
      value: 'pgx-np',
    },
    {
      name: 'PGx-Premium',
      value: 'pgx-premium',
    },
    {
      name: 'Single Gene',
      value: 'single-gene',
    },
  ];
  productName: string[] = this.productOptions.map(({ value }) => value);

  searchForm = this.formBuilder.group({
    product: ['all'],
    keyword: [''],
  });

  constructor(
    private activatedRouter: ActivatedRoute,
    private router: Router,
    private affiliatedHospitalDataService: AffiliatedHospitalDataService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.subscriptActivatedRouterParamsChange();
    this.subscribeSearchFormChange();
    this.loadAffiliatedHospital();
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  subscriptActivatedRouterParamsChange(): void {
    const sub = this.activatedRouter.queryParams.subscribe((params) => {
      const product = params.product;
      const keyword = params.keyword || '';
      if (this.productName.includes(product)) {
        this.searchForm.patchValue({
          product: product,
          keyword: keyword,
        });
      }
    });

    this.subscription$.add(sub);
  }

  subscribeSearchFormChange(): void {
    const sub = this.searchForm.valueChanges.subscribe(() => {
      this.reloadDataSource();
      this.syncQueryParams();
    });

    this.subscription$.add(sub);
  }

  loadAffiliatedHospital(): void {
    this.affiliatedHospitalDataService
      .getAffiliatedHospital()
      .subscribe((hospitalList) => {
        this.hospitalList = hospitalList;

        this.reloadDataSource();
      });
  }

  reloadDataSource(): void {
    const { product = 'all', keyword = '' } = this.searchForm.value;

    // filter by product
    let mDataSource =
      product === 'all'
        ? this.hospitalList
        : this.hospitalList.filter((hospital) =>
            hospital.products.includes(product)
          );

    // filter hospital name
    mDataSource = mDataSource.filter((hospital) =>
      hospital.name?.includes(keyword)
    );

    this.dataSource = mDataSource;
  }

  syncQueryParams(): void {
    const queryParams = this.searchForm.value;
    this.router.navigate(['.'], {
      relativeTo: this.activatedRouter,
      queryParams: { ...queryParams },
    });
  }

  resetKeyword(): void {
    this.searchForm.patchValue({
      keyword: '',
    });
  }
}
