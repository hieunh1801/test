import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DrugRecommendation } from '@pdss/components/my-report/services/pdss-report.service';
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
  @Input() genes: DrugRecommendation[] = [];
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

  showReferences(referenceOfEvidence?: string): void {
    const dialogInputData: ReferenceListDialogInputData = {
      referenceOfEvidence,
    };

    const dialogRef = this.matDialog.open(ReferenceListDialogComponent, {
      data: dialogInputData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      // TODO: do something after dialog close
    });
  }
}
