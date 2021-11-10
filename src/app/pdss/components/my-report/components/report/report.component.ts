import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageLoadingService } from '@shared/services/page-loading.service';
import { finalize } from 'rxjs/operators';
import { PdssReportService, Report } from '../../services/pdss-report.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
})
export class ReportComponent implements OnInit {
  private report?: Report = null;

  constructor(
    private route: ActivatedRoute,
    private pdssReportService: PdssReportService,
    private pageLoadingService: PageLoadingService
  ) {}

  ngOnInit(): void {
    const qrCode = this.route.snapshot.paramMap.get('qrCode');
    this.loadReport(qrCode);
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
      .subscribe((response) => {
        this.report = response?.data?.items?.[0] || null;
      });
  }
}
