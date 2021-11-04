import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { DrugRecommendation } from 'src/app/pdss/services/pdss-report.service';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-drug-table',
  templateUrl: './drug-table.component.html',
  styleUrls: ['./drug-table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded => collapsed',
        animate('225ms cubic-bezier(0.2, 0.0, 0.1, 1)')
      ),
      transition(
        'collapsed => expanded',
        animate('225ms cubic-bezier(0.2, 0.0, 0.1, 1)')
      ),
    ]),
  ],
})
export class DrugTableComponent implements OnInit, OnDestroy {
  @Input() drugList: DrugRecommendation[] = [];
  expandedElement?: DrugRecommendation = this.drugList?.[0];
  expandedElementList: DrugRecommendation[] = [];
  displayedColumns: string[] = [
    'index',
    'drugName',
    'riskLevel',
    'packages',
    'actions',
  ];

  dangerTxt = this.translateService.instant('PDSS__RISK_LEVEL__DANGER');
  warningTxt = this.translateService.instant('PDSS__RISK_LEVEL__WARNING');
  cautionTxt = this.translateService.instant('PDSS__RISK_LEVEL__CAUTION');
  goodTxt = this.translateService.instant('PDSS__RISK_LEVEL__GOOD');

  isExpandedElement(element: DrugRecommendation): boolean {
    return this.expandedElementList.includes(element);
  }
  toggleElement(element: DrugRecommendation): void {
    if (this.expandedElementList.includes(element)) {
      this.expandedElementList.splice(
        this.expandedElementList.indexOf(element),
        1
      );
    } else {
      this.expandedElementList.push(element);
    }
  }

  constructor(private translateService: TranslateService) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {}
}
