import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-overview-section-test',
  templateUrl: './overview-section-test.component.html',
  styleUrls: ['./overview-section-test.component.scss'],
})
export class OverviewSectionTestComponent implements OnInit {
  contentList = [
    marker('RECOMBINANT_ENZYME__OVERVIEW__SECTIONS__TEST__CONTENT_LIST__1'),
    marker('RECOMBINANT_ENZYME__OVERVIEW__SECTIONS__TEST__CONTENT_LIST__2'),
    marker('RECOMBINANT_ENZYME__OVERVIEW__SECTIONS__TEST__CONTENT_LIST__3'),
    marker('RECOMBINANT_ENZYME__OVERVIEW__SECTIONS__TEST__CONTENT_LIST__4'),
  ];
  constructor() {}

  ngOnInit(): void {}
}
