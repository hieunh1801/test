import { Component, Input, OnInit } from '@angular/core';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { Product } from '../../services/product.service';

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.scss'],
})
export class ProductTableComponent implements OnInit {
  @Input() productList: Product[];

  displayedColumns: string[] = [
    // 'code',
    'shortName',
    'name',
    'purpose',
    'testPeriod',
  ];

  constructor() {}

  ngOnInit(): void {}
}
