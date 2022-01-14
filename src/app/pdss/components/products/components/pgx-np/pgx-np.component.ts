import { Component, OnInit } from '@angular/core';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { PageLoadingService } from '@shared/services/page-loading.service';
import { finalize } from 'rxjs/operators';
import {
  Drug,
  Gene,
  Hospital,
  Product,
  ProductService,
} from '../../services/product.service';

@Component({
  selector: 'app-pgx-np',
  templateUrl: './pgx-np.component.html',
  styleUrls: ['./pgx-np.component.scss'],
})
export class PgxNpComponent implements OnInit {
  introductionSection = {
    title: marker('PDSS__PRODUCTS__PGX_NP__INTRODUCTION__TITLE'),
    content: marker('PDSS__PRODUCTS__PGX_NP__INTRODUCTION__CONTENT'),
    imageUrl: marker('/assets/images/pdss-digital-report.png'),
    fileList: [
      {
        title: marker(
          'PDSS__PRODUCTS__PGX_NP__INTRODUCTION__FILE_LIST__1__TITLE'
        ),
        url: '#',
      },
      {
        title: marker(
          'PDSS__PRODUCTS__PGX_NP__INTRODUCTION__FILE_LIST__2__TITLE'
        ),
        url: '#',
      },
      {
        title: marker(
          'PDSS__PRODUCTS__PGX_NP__INTRODUCTION__FILE_LIST__3__TITLE'
        ),
        url: '#',
      },
    ],
  };

  product: Product = null;

  drugSection = {
    title: marker('PDSS__PRODUCTS__PGX_NP__RELATED_DRUG_LIST__TITLE'),
  };

  geneSection = {
    title: marker('PDSS__PRODUCTS__PGX_NP__RELATED_GENE_LIST__TITLE'),
  };

  affiliatedHospitalSection = {
    title: marker('PDSS__PRODUCTS__PGX_NP__AFFILIATED_HOSPITAL__TITLE'),
  };

  drugList: Drug[];
  geneList: Gene[];
  hospitalList: Hospital[];

  constructor(
    private productService: ProductService,
    private pageLoadingService: PageLoadingService
  ) {}

  ngOnInit(): void {
    this.productService
      .getProductByName('pgx-np')
      .pipe(finalize(() => {}))
      .subscribe((response) => {
        this.product = response?.data?.items?.[0] || null;
        this.drugList = this.product?.drugs || null;
        this.geneList = this.product?.genes || null;
        console.log(this.product);
        this.hospitalList = this.product?.hospitals || null;
      });
  }
}
