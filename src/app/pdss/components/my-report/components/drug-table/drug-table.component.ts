import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { Subscription } from 'rxjs';
import { DrugRecommendation } from 'src/app/pdss/services/pdss-report.service';

@Component({
  selector: 'app-drug-table',
  templateUrl: './drug-table.component.html',
  styleUrls: ['./drug-table.component.scss'],
})
export class DrugTableComponent implements OnInit, OnDestroy {
  @Input() drugList: DrugRecommendation[] = [];

  displayedColumns: string[] = [
    'index',
    'drugName',
    'riskLevel',
    'recommendation',
  ];

  constructor() {}

  ngOnInit(): void {}

  ngOnDestroy(): void {}
}
