import { Component, OnInit } from '@angular/core';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';

@Component({
  selector: 'app-pgx-np',
  templateUrl: './pgx-np.component.html',
  styleUrls: ['./pgx-np.component.scss']
})
export class PgxNpComponent implements OnInit {

  introduction = {
    title: marker("PDSS__PRODUCTS__PGX_NP__INTRODUCTION__TITLE"),
    content: marker("PDSS__PRODUCTS__PGX_NP__INTRODUCTION__CONTENT"),
    imageUrl: marker("/assets/images/pdss-digital-report.png"),
    fileList: [
      {
        title: marker("PDSS__PRODUCTS__PGX_NP__INTRODUCTION__FILE_LIST__1__TITLE"),
        url: "#",
      },
      {
        title: marker("PDSS__PRODUCTS__PGX_NP__INTRODUCTION__FILE_LIST__2__TITLE"),
        url: "#",
      },
      {
        title: marker("PDSS__PRODUCTS__PGX_NP__INTRODUCTION__FILE_LIST__3__TITLE"),
        url: "#",
      },
    ]
  }

  constructor() { }

  ngOnInit(): void {
  }

}
