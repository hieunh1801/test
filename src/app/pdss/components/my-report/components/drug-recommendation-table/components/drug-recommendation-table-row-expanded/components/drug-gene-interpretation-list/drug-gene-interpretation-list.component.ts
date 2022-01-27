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
import { Router } from '@angular/router';

@Component({
  selector: 'app-drug-gene-interpretation-list',
  templateUrl: './drug-gene-interpretation-list.component.html',
  styleUrls: ['./drug-gene-interpretation-list.component.scss'],
})
export class DrugGeneInterpretationListComponent implements OnInit {
  @Input() genes: Gene[] = [];

  constructor(private matDialog: MatDialog, private router: Router) {}

  ngOnInit(): void {}

  showReferences(drugRecommendation?: Gene): void {
    const dialogInputData: ReferenceListDialogInputData = {
      interpretationId: drugRecommendation?.id,
    };

    const dialogRef = this.matDialog.open(ReferenceListDialogComponent, {
      data: dialogInputData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      // TODO: do something after dialog close
    });
  }
}
