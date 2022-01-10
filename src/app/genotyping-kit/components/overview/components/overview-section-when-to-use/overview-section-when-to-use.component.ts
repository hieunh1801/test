import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-overview-section-when-to-use',
  templateUrl: './overview-section-when-to-use.component.html',
  styleUrls: ['./overview-section-when-to-use.component.scss'],
})
export class OverviewSectionWhenToUseComponent implements OnInit {
  reasonList: string[] = [
    marker('GENOTYPING_KIT__OVERVIEW__SECTIONS__WHEN_TO_USE__REASONS__1'),
    marker('GENOTYPING_KIT__OVERVIEW__SECTIONS__WHEN_TO_USE__REASONS__2'),
    marker('GENOTYPING_KIT__OVERVIEW__SECTIONS__WHEN_TO_USE__REASONS__3'),
  ];
  constructor() {}

  ngOnInit(): void {}
}
