import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { TranslateService } from '@ngx-translate/core';
import {
  LanguageService,
  LanguagesProvidedType,
} from '@shared/services/language.service';
import { MatSnackbarService } from '@shared/services/mat-snackbar.service';
import { TableHelperService } from '@shared/services/table-helper.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { DrugRecommendation } from '../../services/pdss-report.service';

@Component({
  selector: 'app-drug-recommendation-table',
  templateUrl: './drug-recommendation-table.component.html',
  styleUrls: ['./drug-recommendation-table.component.scss'],
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
      transition(':enter', [
        style({ opacity: 0 }),
        animate('100ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('100ms', style({ opacity: 0, height: 0 })),
      ]),
    ]),
  ],
})
export class DrugRecommendationTableComponent implements OnInit, OnDestroy {
  @Input() drugRecommendationList$ = new BehaviorSubject<DrugRecommendation[]>(
    []
  );

  tableSort$ = new BehaviorSubject<Sort>(null);

  tableDataSorted: DrugRecommendation[] = [];
  tableExpandedElementIdList: number[] = [];
  tableColumnList: string[] = [
    'index',
    'drugName',
    'relatedGenes',
    'riskLevel',
    'product',
    'actions',
  ];

  subscription$ = new Subscription();

  constructor(
    private translateService: TranslateService,
    private languageService: LanguageService,
    private matSnackbarService: MatSnackbarService,
    private tableHelperService: TableHelperService
  ) {}

  reloadTable(): void {
    const language = this.languageService.currentLanguage;
    const tableSort = this.tableSort$.value;
    const drugRecommendationList = this.drugRecommendationList$.value;
    // check null
    if (!drugRecommendationList || drugRecommendationList.length === 0) {
      return;
    }

    let tableData = [];
    if (language === LanguagesProvidedType.korea) {
      tableData = drugRecommendationList.map((drugRecommendation) => ({
        ...drugRecommendation,
        ...drugRecommendation.kr,
      }));
    } else {
      tableData = drugRecommendationList;
    }

    let mTableDataSorted = [];
    if (tableSort && tableSort.active && tableSort.direction !== '') {
      const RISK_LEVEL_WEIGHT = {
        [this.translateService.instant('PDSS__RISK_LEVEL__DANGER')]: 4,
        [this.translateService.instant('PDSS__RISK_LEVEL__WARNING')]: 3,
        [this.translateService.instant('PDSS__RISK_LEVEL__CAUTION')]: 2,
        [this.translateService.instant('PDSS__RISK_LEVEL__GOOD')]: 1,
      };

      const compare = this.tableHelperService.compare;

      mTableDataSorted = tableData.sort((a, b) => {
        const isAsc = tableSort.direction === 'asc';
        switch (tableSort.active) {
          case 'drugName':
            return compare(a.drugName, b.drugName, isAsc);
          case 'relatedGenes':
            return compare(a.relatedGenes, b.relatedGenes, isAsc);
          case 'riskLevel':
            return compare(
              RISK_LEVEL_WEIGHT[a.risk],
              RISK_LEVEL_WEIGHT[b.risk],
              isAsc
            );
          case 'product':
            return compare(a.product, b.product, isAsc);
          default:
            return 0;
        }
      });
    } else {
      mTableDataSorted = tableData;
    }

    this.tableDataSorted = [...mTableDataSorted];
  }

  subscribeDrugRecommendationListChange(): void {
    const sub = this.drugRecommendationList$.subscribe(() => {
      this.reloadTable();
    });
    this.subscription$.add(sub);
  }

  subscribeTableSortChange(): void {
    const sub = this.tableSort$.subscribe(() => {
      this.reloadTable();
    });
    this.subscription$.add(sub);
  }

  subscribeLanguageChange(): void {
    const sub = this.translateService.onLangChange.subscribe(() => {
      this.reloadTable();
    });
    this.subscription$.add(sub);
  }

  ngOnInit(): void {
    this.subscribeDrugRecommendationListChange();
    this.subscribeTableSortChange();
    this.subscribeLanguageChange();
  }

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
    this.tableSort$.next(sort);
  }

  isExpandedElement(element: DrugRecommendation): boolean {
    const result = this.tableExpandedElementIdList.includes(element.id);
    return result;
  }

  toggleElement(element: DrugRecommendation): void {
    const tableExpandedElementIdList = [...this.tableExpandedElementIdList];
    if (tableExpandedElementIdList.includes(element.id)) {
      tableExpandedElementIdList.splice(
        this.tableExpandedElementIdList.indexOf(element.id),
        1
      );
    } else {
      tableExpandedElementIdList.push(element.id);
    }

    this.tableExpandedElementIdList = tableExpandedElementIdList;
  }
}
