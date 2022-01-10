import { Component, OnInit } from '@angular/core';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';

@Component({
  selector: 'app-overview-section-why-need',
  templateUrl: './overview-section-why-need.component.html',
  styleUrls: ['./overview-section-why-need.component.scss'],
})
export class OverviewSectionWhyNeedComponent implements OnInit {
  reasonList = [
    {
      title: marker('PDSS__OVERVIEW__WHY_NEED__REASONS__1__TITLE'),
      content: marker('PDSS__OVERVIEW__WHY_NEED__REASONS__1__CONTENT'),
      imgUrl:
        'https://image.freepik.com/free-vector/drug-allergy-abstract-concept-vector-illustration-triggers-drug-allergies-risk-factors-medicine-side-effect-remedy-intolerance-test-allergic-disease-symptom-treatment-abstract-metaphor_335657-1556.jpg',
    },
    {
      title: marker('PDSS__OVERVIEW__WHY_NEED__REASONS__2__TITLE'),
      content: marker('PDSS__OVERVIEW__WHY_NEED__REASONS__2__CONTENT'),
      imgUrl:
        'https://image.freepik.com/free-vector/healthy-people-carrying-different-icons_53876-43069.jpg',
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}
