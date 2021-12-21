import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  DrugRecommendation,
  Gene,
} from '@pdss/components/my-report/services/pdss-report.service';
import {
  ReferenceListDialogComponent,
  ReferenceListDialogInputData,
} from '../reference-list-dialog/reference-list-dialog.component';

@Component({
  selector: 'app-drug-gene-interpretation-table',
  templateUrl: './drug-gene-interpretation-table.component.html',
  styleUrls: ['./drug-gene-interpretation-table.component.scss'],
})
export class DrugGeneInterpretationTableComponent implements OnInit {
  @Input() genes: Gene[] = [];
  geneTableDisplayedColumns = [
    // 'id',
    'symbol',
    'rsid',
    'genotype',
    'phenotype',
    'interpretation',
    'referenceOfEvidence',
  ];
  constructor(private matDialog: MatDialog) {}

  ngOnInit(): void {}

  showReferences(drugRecommendation?: Gene): void {
    console.log(drugRecommendation);
    const dialogInputData: ReferenceListDialogInputData = {
      interpretationId: drugRecommendation?.drugRecommendationId,
    };

    const dialogRef = this.matDialog.open(ReferenceListDialogComponent, {
      data: dialogInputData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      // TODO: do something after dialog close
    });
  }
}
