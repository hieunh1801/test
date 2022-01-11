import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-overview-section-services',
  templateUrl: './overview-section-services.component.html',
  styleUrls: ['./overview-section-services.component.scss'],
})
export class OverviewSectionServicesComponent implements OnInit {
  serviceList = [
    {
      title: marker('ADME__OVERVIEW__SECTIONS_SERVICE__SERVICE_LIST__1__TITLE'),
      fontColor: '',
      content: marker(
        'ADME__OVERVIEW__SECTIONS_SERVICE__SERVICE_LIST__1__CONTENT'
      ),
    },
    {
      title: marker('ADME__OVERVIEW__SECTIONS_SERVICE__SERVICE_LIST__2__TITLE'),
      fontColor: '',
      content: marker(
        'ADME__OVERVIEW__SECTIONS_SERVICE__SERVICE_LIST__2__CONTENT'
      ),
    },
    {
      title: marker('ADME__OVERVIEW__SECTIONS_SERVICE__SERVICE_LIST__3__TITLE'),
      fontColor: '',
      content: marker(
        'ADME__OVERVIEW__SECTIONS_SERVICE__SERVICE_LIST__3__CONTENT'
      ),
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}
