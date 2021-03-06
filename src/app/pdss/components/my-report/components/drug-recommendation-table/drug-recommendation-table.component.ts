import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Sort } from '@angular/material/sort';
import { TranslateService } from '@ngx-translate/core';
import {
  LanguageService,
  LanguagesProvidedType,
} from '@shared/services/language.service';
import { MatSnackbarService } from '@shared/services/mat-snackbar.service';
import { TableHelperService } from '@shared/services/table-helper.service';
import { WebGuides, WebGuideService } from '@shared/services/web-guide.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, startWith } from 'rxjs/operators';
import {
  DrugRecommendation,
  DrugRecommendationKr,
} from '../../services/pdss-report.service';

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

  tableSearchForm = this.formBuilder.group({
    keyword: [''],
  });
  tableSort$ = new BehaviorSubject<Sort>(null);
  dataSource: DrugRecommendation[] = [];
  tableExpandedElementIdList: number[] = [];
  tableColumnList: string[] = [
    'index',
    'drugName',
    'relatedGenes',
    'riskLevel',
    'product',
    'actions',
  ];
  drugAutoCompleteOptions: string[] = [];

  subscription$ = new Subscription();

  constructor(
    private translateService: TranslateService,
    private languageService: LanguageService,
    private matSnackbarService: MatSnackbarService,
    private tableHelperService: TableHelperService,
    private webGuideService: WebGuideService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.subscribeDrugRecommendationListChange();
    this.subscribeTableSortChange();
    this.subscribeLanguageChange();
    this.subscribeWebGuideRunning();
    this.subscribeTableSearchFormChange();
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  get sf(): any {
    return this.tableSearchForm.controls;
  }

  reloadDrugAutoCompleteOptions(): void {
    const drugRecommendationList = this.drugRecommendationList$.value || [];
    const keyword =
      this.tableSearchForm.value?.keyword?.toLocaleLowerCase() || '';
    const options = !!keyword
      ? drugRecommendationList
          ?.map((drug) => drug.drugName)
          .filter((drugName) => {
            return drugName.toLowerCase().includes(keyword);
          })
      : [];
    this.drugAutoCompleteOptions = [...new Set(options)];
  }

  reloadTable(): void {
    const language = this.languageService.currentLanguage;
    const tableSort = this.tableSort$.value;
    const drugRecommendationList = this.drugRecommendationList$.value;
    // check null
    if (!drugRecommendationList || drugRecommendationList.length === 0) {
      return;
    }

    // choose language
    let tableData: DrugRecommendation[] = [];
    if (language === LanguagesProvidedType.korea) {
      tableData = drugRecommendationList.map((drugRecommendation) => {
        const { risk, ...drugKr } = drugRecommendation.kr;
        return {
          ...drugRecommendation,
          ...drugKr,
        };
      });
    } else {
      tableData = drugRecommendationList;
    }
    // filter data
    const tableSearchFormData = this.tableSearchForm.value;
    const keyword = tableSearchFormData?.keyword?.toLocaleLowerCase();
    if (!!keyword) {
      tableData = tableData.filter((drug) => {
        return drug.drugName?.toLocaleLowerCase().includes(keyword);
      });
    }

    // remove drug duplicated
    const drugMap = new Map<string, DrugRecommendation>();
    for (const drugRecommendation of tableData) {
      const drugName = drugRecommendation.drugName;
      if (drugMap.has(drugName)) {
        // check
        const existedDrugRecommendation = drugMap.get(drugName);
        const isReplace =
          Date.parse(drugRecommendation.createdTime) -
            Date.parse(existedDrugRecommendation.createdTime) >
          0;
        if (isReplace) {
          drugMap.set(drugName, drugRecommendation);
        }
      } else {
        drugMap.set(drugName, drugRecommendation);
      }
    }
    tableData = [...drugMap.values()];

    // remove related gene duplicated
    tableData = tableData.map((row) => {
      const relatedGenes = row.relatedGenes || '';
      const relatedGenesList = relatedGenes.split(',').map((r) => r.trim());
      const relatedGenesListRemoveDuplicated = [...new Set(relatedGenesList)];
      const mRelatedGenes = relatedGenesListRemoveDuplicated.join(', ');
      return {
        ...row,
        relatedGenes: mRelatedGenes,
      };
    });

    // sort data
    if (tableSort && tableSort.active && tableSort.direction !== '') {
      const RISK_LEVEL_WEIGHT = {
        [this.translateService.instant('PDSS__RISK_LEVEL__DANGER')]: 4,
        [this.translateService.instant('PDSS__RISK_LEVEL__WARNING')]: 3,
        [this.translateService.instant('PDSS__RISK_LEVEL__CAUTION')]: 2,
        [this.translateService.instant('PDSS__RISK_LEVEL__GOOD')]: 1,
      };

      const compare = this.tableHelperService.compare;

      tableData = tableData.sort((a, b) => {
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
    }

    this.dataSource = [...tableData];
  }

  subscribeTableSearchFormChange(): void {
    const sub1 = this.tableSearchForm
      .get('keyword')
      .valueChanges.pipe(debounceTime(300), distinctUntilChanged())
      .subscribe(() => {
        this.reloadTable();
      });

    const sub2 = this.tableSearchForm
      .get('keyword')
      .valueChanges.pipe(startWith(''))
      .subscribe(() => {
        this.reloadDrugAutoCompleteOptions();
      });
    this.subscription$.add(sub1);
    this.subscription$.add(sub2);
  }

  subscribeWebGuideRunning(): void {
    const sub = this.webGuideService.running$.subscribe((running) => {
      if (
        running &&
        this.webGuideService.guideName === WebGuides.SUMMARY_REPORT_GUIDE
      ) {
        // this.tableExpandedElementIdList = [
        //   this.drugRecommendationList$.value?.[0]?.id,
        //   ...this.tableExpandedElementIdList,
        // ];
        if (this.tableExpandedElementIdList?.length > 0) {
          // do nothing
        } else {
          this.tableExpandedElementIdList = [
            this.drugRecommendationList$.value?.[0]?.id,
          ];
        }
      }
    });

    this.subscription$.add(sub);
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

  clearTableSearchForm(): void {
    this.tableSearchForm.patchValue({
      keyword: '',
    });
  }

  isDanger(riskLevel: string): boolean {
    // const dangerTxt = this.translateService.instant('PDSS__RISK_LEVEL__DANGER');
    const dangerTxt = 'Danger';
    return riskLevel === dangerTxt;
  }

  isWarning(riskLevel: string): boolean {
    // const warningTxt = this.translateService.instant(
    //   'PDSS__RISK_LEVEL__WARNING'
    // );
    const warningTxt = 'Warning';

    return riskLevel === warningTxt;
  }

  isCaution(riskLevel: string): boolean {
    // const cautionTxt = this.translateService.instant(
    //   'PDSS__RISK_LEVEL__CAUTION'
    // );
    const cautionTxt = 'Caution';

    return riskLevel === cautionTxt;
  }

  isGood(riskLevel: string): boolean {
    // const goodTxt = this.translateService.instant('PDSS__RISK_LEVEL__GOOD');

    const goodTxt = 'Good';
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
