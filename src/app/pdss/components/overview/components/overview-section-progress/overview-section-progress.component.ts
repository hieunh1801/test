import { Component, OnInit } from '@angular/core';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';

@Component({
  selector: 'app-overview-section-progress',
  templateUrl: './overview-section-progress.component.html',
  styleUrls: ['./overview-section-progress.component.scss'],
})
export class OverviewSectionProgressComponent implements OnInit {
  mode: 'patient' | 'professional' = 'patient';

  constructor() {}

  ngOnInit(): void {}

  patientProcessSteps = [
    {
      stepIndex: '02',
      stepContent: marker(
        'PDSS__OVERVIEW__PATIENT_PROCESS_STEPS__STEP_02_CONTENT'
      ),
    },
    {
      stepIndex: '03',
      stepContent: marker(
        'PDSS__OVERVIEW__PATIENT_PROCESS_STEPS__STEP_3_CONTENT'
      ), //'',
    },
    {
      stepIndex: '04',
      stepContent: marker(
        'PDSS__OVERVIEW__PATIENT_PROCESS_STEPS__STEP_4_CONTENT'
      ),
    },
    {
      stepIndex: '05',
      stepContent: marker(
        'PDSS__OVERVIEW__PATIENT_PROCESS_STEPS__STEP_5_CONTENT'
      ),
    },

    {
      stepIndex: '06',
      stepContent: marker(
        'PDSS__OVERVIEW__PATIENT_PROCESS_STEPS__STEP_6_CONTENT'
      ),
    },
    {
      stepIndex: '07',
      stepContent: marker(
        'PDSS__OVERVIEW__PATIENT_PROCESS_STEPS__STEP_7_CONTENT'
      ),
    },
  ];

  professionalProcessSteps = [
    {
      stepIndex: '02',
      stepContent: marker(
        'PDSS__OVERVIEW__PROFESSIONAL_PROCESS_STEPS__STEP_02_CONTENT'
      ),
    },

    {
      stepIndex: '03',
      stepContent: marker(
        'PDSS__OVERVIEW__PROFESSIONAL_PROCESS_STEPS__STEP_03_CONTENT'
      ),
    },
    {
      stepIndex: '04',
      stepContent: marker(
        'PDSS__OVERVIEW__PROFESSIONAL_PROCESS_STEPS__STEP_04_CONTENT'
      ),
    },

    {
      stepIndex: '05',
      stepContent: marker(
        'PDSS__OVERVIEW__PROFESSIONAL_PROCESS_STEPS__STEP_05_CONTENT'
      ),
    },
    {
      stepIndex: '06',
      stepContent: marker(
        'PDSS__OVERVIEW__PROFESSIONAL_PROCESS_STEPS__STEP_06_CONTENT'
      ),
    },
  ];

  changeMode(mode: 'patient' | 'professional'): void {
    this.mode = mode;
  }
}
