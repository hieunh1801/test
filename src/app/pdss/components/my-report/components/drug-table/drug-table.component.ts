import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { TranslateService } from '@ngx-translate/core';
import { Sort } from '@angular/material/sort';
import {
  DrugRecommendation,
  DrugRecommendationKr,
} from '../../services/pdss-report.service';

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
  @Input() drugList: DrugRecommendationKr[] = [];
  @Output() sortChange: EventEmitter<Sort> = new EventEmitter();

  expandedElementIdList: number[] = [];
  displayedColumns: string[] = [
    'index',
    'drugName',
    'relatedGenes',
    'riskLevel',
    'product',
    'actions',
  ];

  isExpandedElement(element: DrugRecommendation): boolean {
    return this.expandedElementIdList.includes(element.id);
  }

  toggleElement(element: DrugRecommendation): void {
    if (this.expandedElementIdList.includes(element.id)) {
      this.expandedElementIdList.splice(
        this.expandedElementIdList.indexOf(element.id),
        1
      );
    } else {
      this.expandedElementIdList.push(element.id);
    }
  }

  constructor(private translateService: TranslateService) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {}

  isDanger(riskLevel: string): boolean {
    const dangerTxt = this.translateService.instant('PDSS__RISK_LEVEL__DANGER');
    return riskLevel === dangerTxt;
  }

  isWarning(riskLevel: string): boolean {
    const warningTxt = this.translateService.instant(
      'PDSS__RISK_LEVEL__WARNING'
    );

    return riskLevel === warningTxt;
  }

  isCaution(riskLevel: string): boolean {
    const cautionTxt = this.translateService.instant(
      'PDSS__RISK_LEVEL__CAUTION'
    );

    return riskLevel === cautionTxt;
  }

  isGood(riskLevel: string): boolean {
    const goodTxt = this.translateService.instant('PDSS__RISK_LEVEL__GOOD');
    return riskLevel === goodTxt;
  }

  sortData(sort: Sort): void {
    this.sortChange.emit(sort);
  }
}
