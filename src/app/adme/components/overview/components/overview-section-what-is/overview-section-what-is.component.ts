import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-overview-section-what-is',
  templateUrl: './overview-section-what-is.component.html',
  styleUrls: ['./overview-section-what-is.component.scss'],
})
export class OverviewSectionWhatIsComponent implements OnInit {
  serviceList: string[] = [
    marker(
      'ADME__OVERVIEW__SECTIONS__WHAT_IS__NON_CLINICAL_ADME_SERVICE_OF_SPMED__SERVICE_LIST__1'
    ),
    marker(
      'ADME__OVERVIEW__SECTIONS__WHAT_IS__NON_CLINICAL_ADME_SERVICE_OF_SPMED__SERVICE_LIST__2'
    ),
    marker(
      'ADME__OVERVIEW__SECTIONS__WHAT_IS__NON_CLINICAL_ADME_SERVICE_OF_SPMED__SERVICE_LIST__3'
    ),
    marker(
      'ADME__OVERVIEW__SECTIONS__WHAT_IS__NON_CLINICAL_ADME_SERVICE_OF_SPMED__SERVICE_LIST__4'
    ),
    marker(
      'ADME__OVERVIEW__SECTIONS__WHAT_IS__NON_CLINICAL_ADME_SERVICE_OF_SPMED__SERVICE_LIST__5'
    ),
    marker(
      'ADME__OVERVIEW__SECTIONS__WHAT_IS__NON_CLINICAL_ADME_SERVICE_OF_SPMED__SERVICE_LIST__6'
    ),
  ];
  constructor() {}

  ngOnInit(): void {}
}
