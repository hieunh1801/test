import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { Subscription } from 'rxjs';
import { DrugRecommendation } from 'src/app/pdss/services/pdss-report.service';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-drug-table',
  templateUrl: './drug-table.component.html',
  styleUrls: ['./drug-table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded => collapsed',
        animate('225ms cubic-bezier(0.2, 0.0, 0.1, 1)')
      ),
      transition(
        'collapsed => expanded',
        animate('225ms cubic-bezier(0.2, 0.0, 0.1, 1)')
      ),
    ]),
  ],
})
export class DrugTableComponent implements OnInit, OnDestroy {
  @Input() drugList: DrugRecommendation[] = [];
  expandedElement?: DrugRecommendation = this.drugList?.[0];
  expandedElementList: DrugRecommendation[] = [];
  displayedColumns: string[] = [
    'index',
    'drugName',
    'riskLevel',
    'recommendation',
    'actions',
  ];

  isExpandedElement(element: DrugRecommendation): boolean {
    return this.expandedElementList.includes(element);
  }
  toggleElement(element: DrugRecommendation): void {
    if (this.expandedElementList.includes(element)) {
      this.expandedElementList.splice(
        this.expandedElementList.indexOf(element),
        1
      );
    } else {
      this.expandedElementList.push(element);
    }
  }

  constructor() {}

  ngOnInit(): void {}

  ngOnDestroy(): void {}
}
