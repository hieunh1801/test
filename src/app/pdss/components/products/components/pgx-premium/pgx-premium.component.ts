import { Component, OnInit } from '@angular/core';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { PageLoadingService } from '@shared/services/page-loading.service';
import {
  Drug,
  Hospital,
  Product,
  ProductService,
  Gene,
} from '../../services/product.service';

@Component({
  selector: 'app-pgx-premium',
  templateUrl: './pgx-premium.component.html',
  styleUrls: ['./pgx-premium.component.scss'],
})
export class PgxPremiumComponent implements OnInit {
  pageInfo = {
    introduction: {
      title: marker('PDSS__PRODUCTS__PGX_PREMIUM__INTRODUCTION__TITLE'),
      content: marker('PDSS__PRODUCTS__PGX_PREMIUM__INTRODUCTION__CONTENT'),
      imageUrl: '/assets/images/pdss-digital-report.png',
      fileList: [
        {
          title: marker(
            'PDSS__PRODUCTS__PGX_PREMIUM__INTRODUCTION__FILE_LIST__1__TITLE'
          ),
          url: '#',
        },
        {
          title: marker(
            'PDSS__PRODUCTS__PGX_PREMIUM__INTRODUCTION__FILE_LIST__2__TITLE'
          ),
          url: '#',
        },
        {
          title: marker(
            'PDSS__PRODUCTS__PGX_PREMIUM__INTRODUCTION__FILE_LIST__3__TITLE'
          ),
          url: '#',
        },
      ],
    },
    drug: {
      title: marker('PDSS__PRODUCTS__PGX_PREMIUM__DRUG__TITLE'),
    },
    gene: {
      title: marker('PDSS__PRODUCTS__PGX_PREMIUM__GENE__TITLE'),
    },
    affiliatedHospital: {
      title: marker('PDSS__PRODUCTS__PGX_PREMIUM__AFFILIATED_HOSPITAL__TITLE'),
    },
  };

  product: Product = null;

  drugList: Drug[];
  geneList: Gene[];
  hospitalList: Hospital[];

  constructor(
    private productService: ProductService,
    private pageLoadingService: PageLoadingService
  ) {}

  ngOnInit(): void {
    this.productService
      .getProductByName('pgx-premium')
      .subscribe((response) => {
        this.product = response?.data?.items?.[0] || null;
        this.drugList = this.product?.drugs || null;
        this.geneList = this.product?.genes || null;
        console.log(this.product);
        this.hospitalList = this.product?.hospitals || null;
      });
  }
}
