import { Component, OnInit } from '@angular/core';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';

@Component({
  selector: 'app-section-pdss-common-progress',
  templateUrl: './section-pdss-common-progress.component.html',
  styleUrls: ['./section-pdss-common-progress.component.scss'],
})
export class SectionPdssCommonProgressComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  processSteps = [
    {
      stepIndex: '02',
      stepContent: marker('PDSS__OVERVIEW__PROCESS_STEPS__STEP_02_CONTENT'), //'',
    },
    {
      stepIndex: '03',
      stepContent: marker('PDSS__OVERVIEW__PROCESS_STEPS__STEP_03_CONTENT'), //'',
    },
    {
      stepIndex: '04',
      stepContent: marker('PDSS__OVERVIEW__PROCESS_STEPS__STEP_04_CONTENT'), //'',
    },
    {
      stepIndex: '05',
      stepContent: marker('PDSS__OVERVIEW__PROCESS_STEPS__STEP_05_CONTENT'), //'',
    },

    {
      stepIndex: '06',
      stepContent: marker('PDSS__OVERVIEW__PROCESS_STEPS__STEP_06_CONTENT'), //'',
    },
    {
      stepIndex: '07',
      stepContent: marker('PDSS__OVERVIEW__PROCESS_STEPS__STEP_07_CONTENT'), //'',
    },
  ];
}
