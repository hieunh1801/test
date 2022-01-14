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
      imageUrl: marker('/assets/images/pdss-digital-report.png'),
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
      title: marker('PDSS__PRODUCTS__PRODUCT__TITLE'),
    },
  };

  productList: Product[] = null;
  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService
      .getProductByName('single-gene')
      .subscribe((response) => {
        this.productList = response?.data?.items || null;
        console.log(this.productList);
      });
  }
}
