import { Component, OnDestroy, OnInit } from '@angular/core';
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
  drugList: DrugRecommendation[] = [];

  subscriptions$ = new Subscription();

  constructor(
    private pdssReportService: PdssReportService,
    private matSnackbarService: MatSnackbarService
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
          this.matSnackbarService.open('Load report failed', 'GET');
        },
      });
  }

  /**
   * Handling media viewport change
   */

  subscribeReport(): void {
    const sub = this.report$.subscribe((report) => {
      if (!report) {
        return;
      }

      const { drugRecommendations = null } = report;
      if (!drugRecommendations) {
        return;
      }
      this.drugList = drugRecommendations;
      this.totalDrug = drugRecommendations.length;
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
}
