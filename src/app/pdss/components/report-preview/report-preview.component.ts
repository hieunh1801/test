import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackbarService } from '@shared/services/mat-snackbar.service';
import { PageLoadingService } from '@shared/services/page-loading.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import {
  DrugRecommendation,
  PdssReportService,
  QrCodeSearchRequest,
  Report,
  ReportAdditionalInformation,
  ReportPage,
  UserVariant,
} from '../my-report/services/pdss-report.service';
import {
  ReportInformationRequestDialogComponent,
  ReportInformationRequestDialogInput,
  ReportInformationRequestDialogOutput,
} from './components/report-information-request-dialog/report-information-request-dialog.component';

@Component({
  selector: 'app-report-preview',
  templateUrl: './report-preview.component.html',
  styleUrls: ['./report-preview.component.scss'],
})
export class ReportPreviewComponent implements OnInit, OnDestroy {
  mode: 'ENTER_PASSWORD' | 'PREVIEW' = 'ENTER_PASSWORD';
  qrCode$ = new BehaviorSubject<string>(null);
  reportPage$ = new BehaviorSubject<ReportPage>(null);
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
    private router: Router,
    private pageLoadingService: PageLoadingService,
    public matDialog: MatDialog,
    private pdssReportService: PdssReportService,
    private matSnackbarService: MatSnackbarService,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.subscribeQrCode();
    this.subscribeReportChange();
    this.subscribeReportPage();
    this.subscribeParams();
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  subscribeParams(): void {
    const sub = this.route.params.subscribe((params) => {
      const qrCode = params.qrCode;
      this.mode = 'ENTER_PASSWORD';
      this.qrCode$.next(qrCode);
    });
    this.subscription$.add(sub);
  }

  subscribeQrCode(): void {
    const sub = this.qrCode$.subscribe((qrCode) => {
      if (qrCode) {
        this.showRequestDialog(qrCode);
      }
    });

    this.subscription$.add(sub);
  }
  subscribeReportChange(): void {
    const sub = this.report$.subscribe((report) => {
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

  subscribeReportPage(): void {
    const sub = this.reportPage$.subscribe((reportPageData) => {
      if (reportPageData) {
        const { report, additionalInformations, userVariants } = reportPageData;
        this.report$.next(report);
        this.additionalInformationList$.next(additionalInformations);
        this.userVariantList$.next(userVariants);
      }
    });
    this.subscription$.add(sub);
  }

  loadReport(searchRequest: QrCodeSearchRequest): void {
    this.pageLoadingService.startLoading();
    this.pdssReportService
      .searchReportByQrCode(searchRequest)
      .pipe(
        finalize(() => {
          this.pageLoadingService.stopLoading();
        })
      )
      .subscribe({
        next: (response) => {
          const reportPage = response?.data?.items?.[0] || null;
          if (!!reportPage) {
            this.mode = 'PREVIEW';
            this.reportPage$.next(reportPage);
          } else {
            throw new Error('not found data');
          }
        },
        error: (error) => {
          console.error(error?.response || error);
          const message = this.translateService.instant(
            'PDSS__REPORT_PREVIEW__MESSAGES__WRONG_INFORMATION'
          );
          this.matSnackbarService.openLoadFailed(message);
        },
      });
  }
  handleOnRequestReport(): void {
    const qrCode = this.qrCode$.value;
    this.showRequestDialog(qrCode);
  }
  showRequestDialog(qrCode: string): void {
    const dialogInput: ReportInformationRequestDialogInput = {
      qrCode,
    };

    const dialogRef = this.matDialog.open(
      ReportInformationRequestDialogComponent,
      {
        data: dialogInput,
      }
    );

    dialogRef
      .afterClosed()
      .subscribe(
        (dialogOutput: ReportInformationRequestDialogOutput | null) => {
          if (!!dialogOutput) {
            this.loadReport(dialogOutput);
          }
        }
      );
  }
}
