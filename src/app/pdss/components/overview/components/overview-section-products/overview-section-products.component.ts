import { Component, OnInit } from '@angular/core';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';

@Component({
  selector: 'app-overview-section-products',
  templateUrl: './overview-section-products.component.html',
  styleUrls: ['./overview-section-products.component.scss'],
})
export class OverviewSectionProductsComponent implements OnInit {
  productList = [
    {
      choose: true,
      title: marker('PDSS__OVERVIEW__PRODUCT_LIST__1__TITLE__PGX_NP'),
      purpose: marker('PDSS__OVERVIEW__PRODUCT_LIST__1__PURPOSE'),
      featureList: [
        marker('PDSS__OVERVIEW__PRODUCT_LIST__1__FEATURES__1'),
        marker('PDSS__OVERVIEW__PRODUCT_LIST__1__FEATURES__2'),
        marker('PDSS__OVERVIEW__PRODUCT_LIST__1__FEATURES__3'),
        marker('PDSS__OVERVIEW__PRODUCT_LIST__1__FEATURES__4'),
        marker('PDSS__OVERVIEW__PRODUCT_LIST__1__FEATURES__5'),
        marker('PDSS__OVERVIEW__PRODUCT_LIST__1__FEATURES__6'),
      ],
      routeList: [
        {
          title: marker(
            'PDSS__OVERVIEW__PRODUCT_LIST__1__ROUTE_LIST__1__TITLE__DETAIL'
          ),
          routerLink: ['/pdss', 'products', 'pgx-np'],
        },
        {
          title: marker(
            'PDSS__OVERVIEW__PRODUCT_LIST__1__ROUTE_LIST__2__TITLE__HOSPITAL'
          ),
          routerLink: ['/pdss', 'affiliated-hospital'],
          queryParams: { product: 'pgx-np' },
        },
      ],
    },
    {
      choose: false,
      title: marker('PDSS__OVERVIEW__PRODUCT_LIST__2__TITLE__PGX_PREMIUM'),
      purpose: marker('PDSS__OVERVIEW__PRODUCT_LIST__2__PURPOSE'),
      featureList: [
        marker('PDSS__OVERVIEW__PRODUCT_LIST__2__FEATURES__1'),
        marker('PDSS__OVERVIEW__PRODUCT_LIST__2__FEATURES__2'),
        marker('PDSS__OVERVIEW__PRODUCT_LIST__2__FEATURES__3'),
        marker('PDSS__OVERVIEW__PRODUCT_LIST__2__FEATURES__4'),
        marker('PDSS__OVERVIEW__PRODUCT_LIST__2__FEATURES__5'),
        marker('PDSS__OVERVIEW__PRODUCT_LIST__2__FEATURES__6'),
      ],
      routeList: [
        {
          title: marker(
            'PDSS__OVERVIEW__PRODUCT_LIST__2__ROUTE_LIST__1__TITLE__DETAIL'
          ),
          routerLink: ['/pdss', 'products', 'pgx-premium'],
        },
        {
          title: marker(
            'PDSS__OVERVIEW__PRODUCT_LIST__2__ROUTE_LIST__2__TITLE__HOSPITAL'
          ),
          routerLink: ['/pdss', 'affiliated-hospital'],
          queryParams: { product: 'pgx-premium' },
        },
      ],
    },
    {
      choose: false,
      title: marker('PDSS__OVERVIEW__PRODUCT_LIST__3__TITLE__SINGLE_GENE'),
      purpose: marker('PDSS__OVERVIEW__PRODUCT_LIST__3__PURPOSE'),
      featureList: [
        marker('PDSS__OVERVIEW__PRODUCT_LIST__3__FEATURES__1'),
        marker('PDSS__OVERVIEW__PRODUCT_LIST__3__FEATURES__2'),
        marker('PDSS__OVERVIEW__PRODUCT_LIST__3__FEATURES__3'),
        marker('PDSS__OVERVIEW__PRODUCT_LIST__3__FEATURES__4'),
        marker('PDSS__OVERVIEW__PRODUCT_LIST__3__FEATURES__5'),
        marker('PDSS__OVERVIEW__PRODUCT_LIST__3__FEATURES__6'),
      ],
      routeList: [
        {
          title: marker(
            'PDSS__OVERVIEW__PRODUCT_LIST__3__ROUTE_LIST__1__TITLE__DETAIL'
          ),
          routerLink: ['/pdss', 'products', 'single-gene'],
        },
        {
          title: marker(
            'PDSS__OVERVIEW__PRODUCT_LIST__3__ROUTE_LIST__2__TITLE__HOSPITAL'
          ),
          routerLink: ['/pdss', 'affiliated-hospital'],
          queryParams: { product: 'single-gene' },
        },
      ],
    },
    {
      choose: false,
      title: marker('PDSS__OVERVIEW__PRODUCT_LIST__4__TITLE__CUSTOM'),
      purpose: marker('PDSS__OVERVIEW__PRODUCT_LIST__4__PURPOSE'),
      featureList: [
        marker('PDSS__OVERVIEW__PRODUCT_LIST__4__FEATURES__1'),
        marker('PDSS__OVERVIEW__PRODUCT_LIST__4__FEATURES__2'),
        marker('PDSS__OVERVIEW__PRODUCT_LIST__4__FEATURES__3'),
        marker('PDSS__OVERVIEW__PRODUCT_LIST__4__FEATURES__4'),
        marker('PDSS__OVERVIEW__PRODUCT_LIST__4__FEATURES__5'),
        marker('PDSS__OVERVIEW__PRODUCT_LIST__4__FEATURES__6'),
      ],
      routeList: [
        {
          title: marker(
            'PDSS__OVERVIEW__PRODUCT_LIST__4__ROUTE_LIST__1__TITLE__CONTACT_US'
          ),
          routerLink: '/contact',
        },
      ],
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
