import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { Report } from '@pdss/components/my-report/services/pdss-report.service';
import {
  ReportHelperService,
  ReportsStatistic,
} from '@pdss/components/my-report/services/report-helper.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-summary-package-table',
  templateUrl: './summary-package-table.component.html',
  styleUrls: ['./summary-package-table.component.scss'],
})
export class SummaryPackageTableComponent implements OnInit, OnDestroy {
  @Input() reportList$ = new BehaviorSubject<Report[]>([]);

  tableData: ReportsStatistic[] = []; // for table
  tableColumnList: string[] = [
    'index',
    'packageName',
    'totalDrug',
    'totalGene',
    'totalInterpretation',
    'file',
    'detail',
  ];
  summaryData: ReportsStatistic = null; // summary

  subscription$ = new Subscription();

  constructor(private reportHelperService: ReportHelperService) {}

  subscribeReportListChange(): void {
    const sub = this.reportList$.pipe(distinctUntilChanged()).subscribe({
      next: (reportList) => {
        const mTableData = [];
        for (const report of reportList) {
          const packageName = report.productName;
          const qrCode = report.qrCode;
          const resultReportFileName = report.resultReportFileName;
          const statistic = this.reportHelperService.getStatisticFromReport(
            [report],
            packageName,
            qrCode,
            resultReportFileName
          );
          mTableData.push(statistic);
        }

        this.tableData = mTableData;

        const mSummaryData = this.reportHelperService.getStatisticFromReport(
          reportList,
          'Summary',
          ''
        );
        this.summaryData = mSummaryData;

        console.log(this.summaryData);
      },
    });

    this.subscription$.add(sub);
  }

  ngOnInit(): void {
    this.subscribeReportListChange();
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }
}
