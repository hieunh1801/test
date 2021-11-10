import { Component, OnDestroy, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { TranslateService } from '@ngx-translate/core';
import {
  LanguageService,
  LanguagesProvidedType,
} from '@shared/services/language.service';
import { MatSnackbarService } from '@shared/services/mat-snackbar.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import {
  DrugRecommendation,
  DrugRecommendationKr,
  PdssReportService,
  Report,
} from '@pdss/components/my-report/services/pdss-report.service';
import { PageLoadingService } from '@shared/services/page-loading.service';

@Component({
  selector: 'app-summary-report',
  templateUrl: './summary-report.component.html',
  styleUrls: ['./summary-report.component.scss'],
})
export class SummaryReportComponent implements OnInit, OnDestroy {
  reportList$ = new BehaviorSubject<Report[]>([]);
  sort$ = new BehaviorSubject<Sort>(null);

  totalGene: number = null;
  totalDrug: number = null;
  totalInterpretation: number = null;

  totalGood: number = null;
  totalCaution: number = null;
  totalWarning: number = null;
  totalDanger: number = null;

  drugList: DrugRecommendationKr[] = [];
  sortedDrugList: DrugRecommendation[] = [];

  subscriptions$ = new Subscription();

  constructor(
    private pdssReportService: PdssReportService,
    private matSnackbarService: MatSnackbarService,
    private translateService: TranslateService,
    private languageService: LanguageService,
    private pageLoadingService: PageLoadingService
  ) {}

  loadReportList(): void {
    this.pageLoadingService.startLoading();
    this.pdssReportService
      .getMyReport()
      .pipe(
        finalize(() => {
          this.pageLoadingService.stopLoading();
        })
      )
      .subscribe({
        next: (response) => {
          if (response?.data?.items?.[0]) {
            this.reportList$.next(response?.data?.items || []);
          }
        },
        error: () => {
          const message = this.translateService.instant(
            'PDSS__MY_REPORT__LOAD_REPORT_FAILED'
          );
          const action = this.translateService.instant(
            'MAT_SNACKBAR__ACTION__GET'
          );
          this.matSnackbarService.open(message, action);
        },
      });
  }

  updateState(): void {
    const reportList = this.reportList$.value;
    const language = this.languageService.currentLanguage;
    const sort = this.sort$.value;
    if (!reportList || reportList.length === 0) {
      return;
    }

    if (!language) {
      return;
    }

    // add packages
    let drugRecommendations: DrugRecommendation[] = [];
    for (const report of reportList) {
      const productName = report.productName;
      for (const drug of report?.drugRecommendations || []) {
        drugRecommendations.push({
          ...drug,
          product: productName,
        });
      }
    }

    // multiple language
    if (language === LanguagesProvidedType.korea) {
      drugRecommendations = drugRecommendations.map((drug) => {
        return {
          ...drug,
          ...drug?.kr,
        };
      });
    }

    if (sort) {
      if (!sort.active || sort.direction === '') {
        this.sortedDrugList = drugRecommendations;
        return;
      }
      const RISK_LEVEL_WEIGHT = {
        [this.translateService.instant('PDSS__RISK_LEVEL__DANGER')]: 4,
        [this.translateService.instant('PDSS__RISK_LEVEL__WARNING')]: 3,
        [this.translateService.instant('PDSS__RISK_LEVEL__CAUTION')]: 2,
        [this.translateService.instant('PDSS__RISK_LEVEL__GOOD')]: 1,
      };

      this.sortedDrugList = drugRecommendations.sort((a, b) => {
        const isAsc = sort.direction === 'asc';
        switch (sort.active) {
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

    // STATISTIC
    const nameSet = new Set();
    for (const drugRecommendation of drugRecommendations) {
      nameSet.add(drugRecommendation.drugName);
    }

    // STATISTIC -> total drug
    this.drugList = drugRecommendations.map((drug) => {
      return {
        ...drug,
        relatedDiseases: drug?.relatedDiseases
          ?.replace(/, /g, ',')
          .replace(/,/g, ', '),
      };
    });
    this.totalDrug = drugRecommendations.length;

    // STATISTIC -> total gene
    const geneIdSet = new Set();
    for (const drugRecommendation of drugRecommendations) {
      const genes = drugRecommendation?.genes;
      if (genes) {
        for (const gene of genes) {
          geneIdSet.add(gene.symbol);
        }
      }
    }
    this.totalGene = geneIdSet.size;

    // STATISTIC -> total interpretation
    this.totalInterpretation = drugRecommendations
      .map((drugRecommendation) => {
        return drugRecommendation?.genes?.length || 0;
      })
      .reduce((pre, currentValue) => {
        return pre + currentValue;
      }, 0);

    //  STATISTIC -> total good
    const goodTxt = this.translateService.instant('PDSS__RISK_LEVEL__GOOD');
    const totalGood = drugRecommendations.reduce(
      (count, drugRecommendation) => {
        if (drugRecommendation.risk === goodTxt) {
          return count + 1;
        }
        return count;
      },
      0
    );
    this.totalGood = totalGood;

    // STATISTIC -> total caution
    const cautionTxt = this.translateService.instant(
      'PDSS__RISK_LEVEL__CAUTION'
    );
    const totalCaution = drugRecommendations.reduce(
      (count, drugRecommendation) => {
        if (drugRecommendation.risk === cautionTxt) {
          return count + 1;
        }
        return count;
      },
      0
    );
    this.totalCaution = totalCaution;

    // STATISTIC -> total warning
    const warningTxt = this.translateService.instant(
      'PDSS__RISK_LEVEL__WARNING'
    );
    const totalWarning = drugRecommendations.reduce(
      (count, drugRecommendation) => {
        if (drugRecommendation.risk === warningTxt) {
          return count + 1;
        }
        return count;
      },
      0
    );
    this.totalWarning = totalWarning;
    // total danger

    const dangerTxt = this.translateService.instant('PDSS__RISK_LEVEL__DANGER');
    const totalDanger = drugRecommendations.reduce(
      (count, drugRecommendation) => {
        if (drugRecommendation.risk === dangerTxt) {
          return count + 1;
        }
        return count;
      },
      0
    );
    this.totalDanger = totalDanger;
  }

  subscribeLanguageChange(): void {
    const sub = this.translateService.onLangChange.subscribe(() => {
      this.updateState();
    });

    this.subscriptions$.add(sub);
  }

  subscribeReportListChange(): void {
    const sub = this.reportList$.subscribe(() => {
      this.updateState();
    });
    this.subscriptions$.add(sub);
  }

  subscribeSortChange(): void {
    const sub = this.sort$.subscribe(() => {
      this.updateState();
    });
    this.subscriptions$.add(sub);
  }

  ngOnInit(): void {
    this.subscribeReportListChange();
    this.subscribeLanguageChange();
    this.subscribeSortChange();
    this.loadReportList();
  }

  ngOnDestroy(): void {
    this.subscriptions$.unsubscribe();
  }

  sortChange(sort: Sort): void {
    this.sort$.next(sort);
  }
}
const compare = (a: number | string, b: number | string, isAsc: boolean) => {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
};
