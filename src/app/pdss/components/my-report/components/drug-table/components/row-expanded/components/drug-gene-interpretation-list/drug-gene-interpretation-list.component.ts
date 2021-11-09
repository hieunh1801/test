import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DrugRecommendation } from 'src/app/pdss/services/pdss-report.service';
import {
  ReferenceListDialogComponent,
  ReferenceListDialogInputData,
} from '../reference-list-dialog/reference-list-dialog.component';

@Component({
  selector: 'app-drug-gene-interpretation-list',
  templateUrl: './drug-gene-interpretation-list.component.html',
  styleUrls: ['./drug-gene-interpretation-list.component.scss'],
})
export class DrugGeneInterpretationListComponent implements OnInit {
  @Input() genes: DrugRecommendation[] = [];

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
