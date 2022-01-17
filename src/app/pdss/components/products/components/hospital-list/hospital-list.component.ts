import { Component, Input, OnInit } from '@angular/core';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { Hospital } from '../../services/product.service';

@Component({
  selector: 'app-hospital-list',
  templateUrl: './hospital-list.component.html',
  styleUrls: ['./hospital-list.component.scss'],
})
export class HospitalListComponent implements OnInit {
  @Input() hospitalList: Hospital[];

  tableHeader = [
    marker('PDSS__PRODUCTS__PGX_NP__HOSPITAL_TABLE__HEADERS__HOSPITAL'),
    marker('PDSS__PRODUCTS__PGX_NP__HOSPITAL_TABLE__HEADERS__TELEPHONE'),
    marker('PDSS__PRODUCTS__PGX_NP__HOSPITAL_TABLE__HEADERS__ADDRESS_DETAILS'),
  ];
  constructor() {}

  ngOnInit(): void {}
}
