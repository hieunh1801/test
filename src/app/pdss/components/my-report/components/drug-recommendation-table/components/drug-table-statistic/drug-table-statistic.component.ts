import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { DrugRecommendation } from '@pdss/components/my-report/services/pdss-report.service';
import {
  ReportHelperService,
  ReportsStatistic,
} from '@pdss/components/my-report/services/report-helper.service';
import { LogServiceService } from '@shared/services/log-service.service';

@Component({
  selector: 'app-drug-table-statistic',
  templateUrl: './drug-table-statistic.component.html',
  styleUrls: ['./drug-table-statistic.component.scss'],
})
export class DrugTableStatisticComponent implements OnInit, OnChanges {
  @Input() drugList: DrugRecommendation[] = [];

  totalDrug = 0;
  totalGene = 0;
  totalInterpretation = 0;

  totalDanger = 0;
  totalWarning = 0;
  totalCaution = 0;
  totalGood = 0;

  constructor(private reportHelperService: ReportHelperService) {}

  ngOnInit(): void {}

  reloadState(drugList: DrugRecommendation[] = null): void {
    if (!drugList) {
      drugList = this.drugList;
    }

    const reportStatistic: ReportsStatistic =
      this.reportHelperService.getStatisticFromDrugRecommendationList(
        drugList,
        ''
      );
    this.totalDanger = reportStatistic.totalDanger;
    this.totalWarning = reportStatistic.totalWarning;
    this.totalCaution = reportStatistic.totalCaution;
    this.totalGood = reportStatistic.totalGood;
    this.totalDrug = reportStatistic.totalDrug;
  }

  ngOnChanges(simpleChanges: SimpleChanges): void {
    const drugListSimpleChange: SimpleChange = simpleChanges.drugList;
    if (drugListSimpleChange) {
      const preValue = drugListSimpleChange.previousValue;
      const curValue = drugListSimpleChange.currentValue;
      if (JSON.stringify(preValue) !== JSON.stringify(curValue)) {
        this.reloadState();
      } else {
      }
    }
  }
}
