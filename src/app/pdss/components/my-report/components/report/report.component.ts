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
  ReportAdditionalInformation,
  ReportPage,
  UserVariant,
} from '../../services/pdss-report.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
})
export class ReportComponent implements OnInit, OnDestroy {
  report: Report = null;
  report$ = new BehaviorSubject<Report>(null);
  drugRecommendationList$ = new BehaviorSubject<DrugRecommendation[]>([]);
  additionalInformationList$ = new BehaviorSubject<
    ReportAdditionalInformation[]
  >([]);
  userVariantList$ = new BehaviorSubject<UserVariant[]>([]);
  reportPageData$ = new BehaviorSubject<ReportPage>(null);

  subscription$ = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private pdssReportService: PdssReportService,
    private pageLoadingService: PageLoadingService,
    private translateService: TranslateService,
    private matSnackbarService: MatSnackbarService
  ) {}

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

  subscribeReportPageDataChange(): void {
    const sub = this.reportPageData$.subscribe((reportPageData) => {
      if (reportPageData) {
        const { report, additionalInformations, userVariants } = reportPageData;
        this.report$.next(report);
        this.additionalInformationList$.next(additionalInformations);
        this.userVariantList$.next(userVariants);
      }
    });
    this.subscription$.add(sub);
  }

  ngOnInit(): void {
    this.subscribeReportChange();
    this.subscribeReportPageDataChange();
    const qrCode = this.route.snapshot.paramMap.get('qrCode');
    this.loadReport(qrCode);
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
          const reportPageData = response?.data?.items?.[0] || null;
          this.reportPageData$.next(reportPageData);
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
