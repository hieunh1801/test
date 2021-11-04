import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ChartOptions, ChartType } from 'chart.js';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';

import {
  BaseChartDirective,
  Color,
  Label,
  monkeyPatchChartJsLegend,
  monkeyPatchChartJsTooltip,
  SingleDataSet,
} from 'ng2-charts';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'app-risk-summary-pie-chart',
  templateUrl: './risk-summary-pie-chart.component.html',
  styleUrls: ['./risk-summary-pie-chart.component.scss'],
})
export class RiskSummaryPieChartComponent
  implements OnInit, OnChanges, OnDestroy
{
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  @Input() danger = 0;
  @Input() warning = 0;
  @Input() caution = 0;
  @Input() good = 0;

  private dataset$ = new BehaviorSubject<number[]>([]);
  private subscriptions$ = new Subscription();

  // Pie chart
  private total = 0;
  public pieChartOptions: ChartOptions = {
    responsive: true,
    onResize: (event) => {
      console.log(event);
    },
    legend: {
      position: 'bottom',
      fullWidth: true,
    },
    tooltips: {
      enabled: false,
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          let percentage = '0%';
          if (this.total > 0) {
            percentage = ((value * 100) / this.total).toFixed(2) + '%';
          }
          return percentage;
        },
        color: 'rgba(0,0,0,0, 0.8)',
      },
    },
  };

  public pieChartLabels: Label[] = [
    '110 Danger',
    '220 Warning',
    '123 Caution',
    '345 Good',
  ];

  public pieChartColors: Color[] = [
    {
      backgroundColor: ['#f45a51', '#f89100', '#f8cb42', '#44db77'],
    },
  ];

  public pieChartData: SingleDataSet = [300, 500, 100, 23];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [DatalabelsPlugin];

  subscribeDatasetChange(): void {
    const sub = this.dataset$.subscribe((dataset) => {
      this.pieChartData = dataset;
      const dangerTxt = this.translateService.instant(
        'PDSS__RISK_LEVEL__DANGER'
      );
      const warningTxt = this.translateService.instant(
        'PDSS__RISK_LEVEL__WARNING'
      );
      const cautionTxt = this.translateService.instant(
        'PDSS__RISK_LEVEL__CAUTION'
      );
      const goodTxt = this.translateService.instant('PDSS__RISK_LEVEL__GOOD');
      this.pieChartLabels = [dangerTxt, warningTxt, cautionTxt, goodTxt].map(
        (value, index) => {
          return `${dataset[index]} ${value}`;
        }
      );

      this.chart?.update();
    });
    this.subscriptions$.add(sub);
  }

  subscribeLanguageChange(): void {
    const sub = this.translateService.onLangChange.subscribe(() => {
      console.log('Change');
      const dangerTxt = this.translateService.instant(
        'PDSS__RISK_LEVEL__DANGER'
      );
      const warningTxt = this.translateService.instant(
        'PDSS__RISK_LEVEL__WARNING'
      );
      const cautionTxt = this.translateService.instant(
        'PDSS__RISK_LEVEL__CAUTION'
      );
      const goodTxt = this.translateService.instant('PDSS__RISK_LEVEL__GOOD');
      this.pieChartLabels = [dangerTxt, warningTxt, cautionTxt, goodTxt].map(
        (value, index) => {
          return `${this.pieChartData[index]} ${value}`;
        }
      );
      this.chart?.update();
    });
    this.subscriptions$.add(sub);
  }

  constructor(private translateService: TranslateService) {
    // monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const danger = changes?.danger?.currentValue || 0;
    const warning = changes?.warning?.currentValue || 0;
    const caution = changes?.caution?.currentValue || 0;
    const good = changes?.good?.currentValue || 0;
    this.dataset$.next([danger, warning, caution, good]);
  }

  ngOnInit(): void {
    this.subscribeDatasetChange();
    this.subscribeLanguageChange();
  }

  ngOnDestroy(): void {
    this.subscriptions$.unsubscribe();
  }
}
