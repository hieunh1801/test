import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-overview-section-feature-and-benefit',
  templateUrl: './overview-section-feature-and-benefit.component.html',
  styleUrls: ['./overview-section-feature-and-benefit.component.scss'],
})
export class OverviewSectionFeatureAndBenefitComponent implements OnInit {
  contentList = [
    {
      content: marker(
        'RECOMBINANT_ENZYME__OVERVIEW__SECTIONS__FEATURE_AND_BENEFIT__CONTENT_LIST__1'
      ),
      imgUrl:
        '/assets/images/human_recombinant_enzyme_feature_and_benefit_content_1.jpg',
    },
    {
      content: marker(
        'RECOMBINANT_ENZYME__OVERVIEW__SECTIONS__FEATURE_AND_BENEFIT__CONTENT_LIST__2'
      ),
      imgUrl:
        '/assets/images/human_recombinant_enzyme_feature_and_benefit_content_2.jpg',
    },
    {
      content: marker(
        'RECOMBINANT_ENZYME__OVERVIEW__SECTIONS__FEATURE_AND_BENEFIT__CONTENT_LIST__3'
      ),
      imgUrl:
        '/assets/images/human_recombinant_enzyme_feature_and_benefit_content_3.jpg',
    },
    {
      content: marker(
        'RECOMBINANT_ENZYME__OVERVIEW__SECTIONS__FEATURE_AND_BENEFIT__CONTENT_LIST__4'
      ),
      imgUrl:
        '/assets/images/human_recombinant_enzyme_feature_and_benefit_content_4.jpg',
    },
    {
      content: marker(
        'RECOMBINANT_ENZYME__OVERVIEW__SECTIONS__FEATURE_AND_BENEFIT__CONTENT_LIST__5'
      ),
      imgUrl:
        '/assets/images/human_recombinant_enzyme_feature_and_benefit_content_5.jpg',
    },
    {
      content: marker(
        'RECOMBINANT_ENZYME__OVERVIEW__SECTIONS__FEATURE_AND_BENEFIT__CONTENT_LIST__6'
      ),
      imgUrl:
        '/assets/images/human_recombinant_enzyme_feature_and_benefit_content_6.jpg',
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}
