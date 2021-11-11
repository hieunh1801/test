import { Component, Input, OnInit } from '@angular/core';
import { DrugRecommendation } from '@pdss/components/my-report/services/pdss-report.service';

@Component({
  selector: 'app-drug-recommendation-table-row-expanded',
  templateUrl: './drug-recommendation-table-row-expanded.component.html',
  styleUrls: ['./drug-recommendation-table-row-expanded.component.scss'],
})
export class DrugRecommendationTableRowExpandedComponent implements OnInit {
  @Input() drug: DrugRecommendation = null;
  constructor() {}

  ngOnInit(): void {}
}
