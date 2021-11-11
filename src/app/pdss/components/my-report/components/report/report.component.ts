import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackbarService } from '@shared/services/mat-snackbar.service';
import { PageLoadingService } from '@shared/services/page-loading.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import {
  DrugRecommendation,
  PdssReportService,
  Report,
} from '../../services/pdss-report.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
})
export class ReportComponent implements OnInit, OnDestroy {
  report: Report = null;
  report$ = new BehaviorSubject<Report>(null);
  qrCode$ = new BehaviorSubject<string>(null);
  drugRecommendationList$ = new BehaviorSubject<DrugRecommendation[]>([]);

  subscription$ = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private pdssReportService: PdssReportService,
    private pageLoadingService: PageLoadingService,
    private translateService: TranslateService,
    private matSnackbarService: MatSnackbarService
  ) {}

  subscribeQrCodeChange(): void {
    const sub = this.qrCode$.subscribe((qrCode) => {
      this.loadReport(qrCode);
    });
    this.subscription$.add(sub);
  }

  subscribeReportChange(): void {
    const sub = this.report$.subscribe((report) => {
      this.report = report;
      const drugRecommendationList = report?.drugRecommendations.map(
        (drugRecommendation) => ({
          ...drugRecommendation,
          product: report.productName,
        })
      );
      this.drugRecommendationList$.next(drugRecommendationList);
    });
    this.subscription$.add(sub);
  }

  ngOnInit(): void {
    this.subscribeReportChange();
    this.subscribeQrCodeChange();

    const qrCode = this.route.snapshot.paramMap.get('qrCode');
    this.qrCode$.next(qrCode);
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  loadReport(qrCode: string): void {
    this.pageLoadingService.startLoading();
    this.pdssReportService
      .getReportByQrCode(qrCode)
      .pipe(
        finalize(() => {
          this.pageLoadingService.stopLoading();
        })
      )
      .subscribe({
        next: (response) => {
          for (const report of response?.data?.items || []) {
            if (report.qrCode === qrCode) {
              this.report$.next(report);
            }
          }
        },
        error: (error) => {
          console.error(error);
          const message = this.translateService.instant(
            'PDSS__MY_REPORT__REPORT__GET_REPORT_FAILED'
          );
          const action = this.translateService.instant(
            'MAT_SNACKBAR__ACTION__GET'
          );
          this.matSnackbarService.open(message, action);
        },
      });
  }
}