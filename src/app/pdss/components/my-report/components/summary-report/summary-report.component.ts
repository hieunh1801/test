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
import { WebGuides, WebGuideService } from '@shared/services/web-guide.service';

@Component({
  selector: 'app-summary-report',
  templateUrl: './summary-report.component.html',
  styleUrls: ['./summary-report.component.scss'],
})
export class SummaryReportComponent implements OnInit, OnDestroy {
  reportList$ = new BehaviorSubject<Report[]>(null);
  subscriptions$ = new Subscription();

  drugRecommendationList$ = new BehaviorSubject<DrugRecommendation[]>([]);

  constructor(
    private pdssReportService: PdssReportService,
    private matSnackbarService: MatSnackbarService,
    private translateService: TranslateService,
    public pageLoadingService: PageLoadingService,
    private webGuideService: WebGuideService
  ) {}

  ngOnInit(): void {
    this.subscribeReportListChange();
    this.loadReportList();
  }

  ngOnDestroy(): void {
    this.subscriptions$.unsubscribe();
  }

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
          if (response?.status?.code === 'success') {
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
      if (!reportList) {
        return;
      }
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

  showSummaryMyReportGuide(): void {
    const steps = [
      // package list
      'PDSS__MY_REPORT__SUMMARY_REPORT__SUMMARY_PACKAGE_TABLE__PACKAGE_LIST__STEP',
      'PDSS__MY_REPORT__SUMMARY_REPORT__SUMMARY_PACKAGE_TABLE__PACKAGE_LIST__DOWNLOAD__STEP',
      'PDSS__MY_REPORT__SUMMARY_REPORT__SUMMARY_PACKAGE_TABLE__PACKAGE_LIST__DETAIL__STEP',

      // report statistic
      'PDSS__MY_REPORT__STATISTIC__HELP__STEP',

      // drug recommendation table
      'PDSS__MY_REPORT__DRUG_TABLE__DRUG__STEP',
      'PDSS__MY_REPORT__DRUG_TABLE__RELATED_GENES__STEP',
      'PDSS__MY_REPORT__DRUG_TABLE__RISK__STEP',
      'PDSS__MY_REPORT__DRUG_TABLE__PACKAGE_LIST__STEP',
      'PDSS__MY_REPORT__DRUG_TABLE__ACTIONS__STEP',
    ];
    this.webGuideService.startTour({
      guideName: WebGuides.SUMMARY_REPORT_GUIDE,
      steps: steps,
    });
  }
}
