import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-overview-section-where-to-use',
  templateUrl: './overview-section-where-to-use.component.html',
  styleUrls: ['./overview-section-where-to-use.component.scss'],
})
export class OverviewSectionWhereToUseComponent implements OnInit {
  contentList: string[] = [
    marker('GENOTYPING_KIT__OVERVIEW__SECTIONS__WHERE_TO_USE__CONTENTS__1'),
    marker('GENOTYPING_KIT__OVERVIEW__SECTIONS__WHERE_TO_USE__CONTENTS__2'),
    marker('GENOTYPING_KIT__OVERVIEW__SECTIONS__WHERE_TO_USE__CONTENTS__3'),
  ];
  constructor() {}

  ngOnInit(): void {}
}
