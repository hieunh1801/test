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
  selector: 'app-single-gene',
  templateUrl: './single-gene.component.html',
  styleUrls: ['./single-gene.component.scss'],
})
export class SingleGeneComponent implements OnInit {
  pageInfo = {
    introduction: {
      title: marker('PDSS__PRODUCTS__SINGLE_GENE__INTRODUCTION__TITLE'),
      content: marker('PDSS__PRODUCTS__SINGLE_GENE__INTRODUCTION__CONTENT'),
      imageUrl: '/assets/images/pdss-digital-report.png',
      fileList: [
        {
          title: marker(
            'PDSS__PRODUCTS__SINGLE_GENE__INTRODUCTION__FILE_LIST__1__TITLE'
          ),
          url: '#',
        },
        {
          title: marker(
            'PDSS__PRODUCTS__SINGLE_GENE__INTRODUCTION__FILE_LIST__2__TITLE'
          ),
          url: '#',
        },
        {
          title: marker(
            'PDSS__PRODUCTS__SINGLE_GENE__INTRODUCTION__FILE_LIST__3__TITLE'
          ),
          url: '#',
        },
      ],
    },
    product: {
      title: marker('PDSS__PRODUCTS__SINGLE_GENE__PRODUCT__TITLE'),
    },
    affiliatedHospital: {
      title: marker('PDSS__PRODUCTS__SINGLE_GENE__AFFILIATED_HOSPITAL__TITLE'),
    },
  };

  productList: Product[] = null;
  hospitalList: Hospital[];
  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService
      .getProductByName('single-gene')
      .subscribe((response) => {
        const productList = response?.data?.items || null;
        this.setProductList(productList);
        this.setHospitalList(productList);
      });
  }

  private setProductList(productList: Product[]): void {
    if (!productList) {
      return;
    }

    productList = productList.sort((a: Product, b: Product) => {
      const aShortName = a.shortName;
      const bShortName = b.shortName;
      return aShortName?.localeCompare(b.shortName);
    });

    this.productList = productList;
  }

  private setHospitalList(productList: Product[]): void {
    if (!productList) {
      return;
    }

    const addedHospitalId = new Set();
    const hospitalList: Hospital[] = [];

    for (const product of productList) {
      const productHospitalList = product.hospitals || [];
      for (const hospital of productHospitalList) {
        const hospitalId = hospital.id;
        if (!addedHospitalId.has(hospitalId)) {
          hospitalList.push(hospital);
          addedHospitalId.add(hospitalId);
        }
      }
    }

    this.hospitalList = hospitalList;
  }
}
