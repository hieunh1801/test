import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Report } from '@pdss/components/my-report/services/pdss-report.service';

@Component({
  selector: 'app-summary-package-table',
  templateUrl: './summary-package-table.component.html',
  styleUrls: ['./summary-package-table.component.scss'],
})
export class SummaryPackageTableComponent implements OnInit, OnChanges {
  @Input() reportList?: Report[] = [];

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(simpleChanges: SimpleChanges): void {
    console.log(simpleChanges);
  }
}

interface PackageStatistic {
  totalDrug?: number;
  totalGene?: number;
  totalInterpretation: number;
  totalDanger?: number;
  totalWarning: number;
  totalCaution?: number;
  total;
}
