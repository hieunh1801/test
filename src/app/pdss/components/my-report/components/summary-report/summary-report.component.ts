import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackbarService } from '@shared/services/mat-snackbar.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import {
  DrugRecommendation,
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
  subscriptions$ = new Subscription();

  drugRecommendationList$ = new BehaviorSubject<DrugRecommendation[]>([]);

  constructor(
    private pdssReportService: PdssReportService,
    private matSnackbarService: MatSnackbarService,
    private translateService: TranslateService,
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

  subscribeReportListChange(): void {
    const sub = this.reportList$.subscribe((reportList) => {
      const drugRecommendations: DrugRecommendation[] = [];
      for (const report of reportList) {
        const productName = report.productName;
        for (const drug of report?.drugRecommendations || []) {
          drugRecommendations.push({
            ...drug,
            product: productName,
          });
        }
      }
      this.drugRecommendationList$.next(drugRecommendations);
    });
    this.subscriptions$.add(sub);
  }

  ngOnInit(): void {
    this.subscribeReportListChange();
    this.loadReportList();
  }

  ngOnDestroy(): void {
    this.subscriptions$.unsubscribe();
  }
}
