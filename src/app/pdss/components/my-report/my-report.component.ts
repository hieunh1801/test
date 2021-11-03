import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { MatSnackbarService } from 'src/app/shared/services/mat-snackbar.service';

import {
  DrugRecommendation,
  PdssReportService,
  Report,
} from '../../services/pdss-report.service';

@Component({
  selector: 'app-my-report',
  templateUrl: './my-report.component.html',
  styleUrls: ['./my-report.component.scss'],
})
export class MyReportComponent implements OnInit, OnDestroy {
  isPageLoading = false;

  report$ = new BehaviorSubject<Report>(null);
  totalGene: number = null;
  totalDrug: number = null;

  totalGood: number = null;
  totalCaution: number = null;
  totalWarning: number = null;
  totalDanger: number = null;

  drugList: DrugRecommendation[] = [];

  subscriptions$ = new Subscription();

  constructor(
    private pdssReportService: PdssReportService,
    private matSnackbarService: MatSnackbarService,
    private translateService: TranslateService
  ) {}

  loadReport(): void {
    this.isPageLoading = true;
    this.pdssReportService
      .getReport()
      .pipe(
        finalize(() => {
          this.isPageLoading = false;
        })
      )
      .subscribe({
        next: (response) => {
          if (response?.data?.items?.[0]) {
            this.report$.next(response?.data?.items?.[0]);
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

  subscribeReport(): void {
    const sub = this.report$.subscribe((report) => {
      if (!report) {
        return;
      }

      const { drugRecommendations = null } = report;
      if (!drugRecommendations) {
        return;
      }

      // total drug
      this.drugList = drugRecommendations.map((drug) => {
        return {
          ...drug,
          relatedDiseases: drug?.relatedDiseases
            ?.replace(/, /g, ',')
            .replace(/,/g, ', '),
        };
      });
      this.totalDrug = drugRecommendations.length;

      // total gene
      const geneIdSet = new Set();
      for (const drugRecommendation of drugRecommendations) {
        const genes = drugRecommendation?.genes;
        if (genes) {
          for (const gene of genes) {
            geneIdSet.add(gene.id);
          }
        }
      }
      this.totalGene = geneIdSet.size;

      // total good
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

      // total caution
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

      // total warning
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

      const dangerTxt = this.translateService.instant(
        'PDSS__RISK_LEVEL__DANGER'
      );

      // total danger
      const totalDanger = drugRecommendations.reduce(
        (count, drugRecommendation) => {
          console.log(count, drugRecommendation.risk, dangerTxt);
          if (drugRecommendation.risk === dangerTxt) {
            return count + 1;
          }
          return count;
        },
        0
      );
      this.totalDanger = totalDanger;
    });
    this.subscriptions$.add(sub);
  }

  ngOnInit(): void {
    this.subscribeReport();
    this.loadReport();
  }

  ngOnDestroy(): void {
    this.subscriptions$.unsubscribe();
  }

  divideForTotalDrug(count: number) {
    const totalDrug = this.totalDrug;
    if (totalDrug) {
      return ((count / totalDrug) * 100).toFixed(2);
    }
    return null;
  }
}
