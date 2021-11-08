import { Component, Input, OnInit } from '@angular/core';
import { DrugRecommendation } from 'src/app/pdss/services/pdss-report.service';

@Component({
  selector: 'app-drug-gene-interpretation-list',
  templateUrl: './drug-gene-interpretation-list.component.html',
  styleUrls: ['./drug-gene-interpretation-list.component.scss'],
})
export class DrugGeneInterpretationListComponent implements OnInit {
  @Input() genes: DrugRecommendation[] = [];
  constructor() {}

  ngOnInit(): void {}
}
