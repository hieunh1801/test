import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-overview-section-what-is',
  templateUrl: './overview-section-what-is.component.html',
  styleUrls: ['./overview-section-what-is.component.scss'],
})
export class OverviewSectionWhatIsComponent implements OnInit {
  contentList: string[] = [
    marker('RECOMBINANT_ENZYME__OVERVIEW__SECTIONS__WHAT_IS__CONTENT_LIST__1'),
    marker('RECOMBINANT_ENZYME__OVERVIEW__SECTIONS__WHAT_IS__CONTENT_LIST__2'),
  ];

  constructor() {}

  ngOnInit(): void {}
}
