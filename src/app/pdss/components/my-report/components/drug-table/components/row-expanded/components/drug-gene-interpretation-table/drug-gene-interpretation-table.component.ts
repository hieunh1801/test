import { Component, Input, OnInit } from '@angular/core';
import { DrugRecommendation } from 'src/app/pdss/services/pdss-report.service';

@Component({
  selector: 'app-drug-gene-interpretation-table',
  templateUrl: './drug-gene-interpretation-table.component.html',
  styleUrls: ['./drug-gene-interpretation-table.component.scss'],
})
export class DrugGeneInterpretationTableComponent implements OnInit {
  @Input() genes: DrugRecommendation[] = [];
  geneTableDisplayedColumns = [
    // 'id',
    'symbol',
    'rsid',
    'genotype',
    'phenotype',
    'interpretation',
  ];
  constructor() {}

  ngOnInit(): void {}
}
