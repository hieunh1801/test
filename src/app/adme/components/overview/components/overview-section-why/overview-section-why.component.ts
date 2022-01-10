import { Component, OnInit } from '@angular/core';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';

@Component({
  selector: 'app-overview-section-why',
  templateUrl: './overview-section-why.component.html',
  styleUrls: ['./overview-section-why.component.scss'],
})
export class OverviewSectionWhyComponent implements OnInit {
  reasonList: string[] = [
    marker('ADME__OVERVIEW__SECTIONS__WHY__REASON_LIST__1'),
    marker('ADME__OVERVIEW__SECTIONS__WHY__REASON_LIST__2'),
    marker('ADME__OVERVIEW__SECTIONS__WHY__REASON_LIST__3'),
    marker('ADME__OVERVIEW__SECTIONS__WHY__REASON_LIST__4'),
  ];
  constructor() {}

  ngOnInit(): void {}
}
