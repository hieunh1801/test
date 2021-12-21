import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  PdssInterpretationService,
  Roe,
} from '@pdss/components/my-report/services/pdss-interpretation.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-reference-list-dialog',
  templateUrl: './reference-list-dialog.component.html',
  styleUrls: ['./reference-list-dialog.component.scss'],
})
export class ReferenceListDialogComponent implements OnInit {
  roeList$ = new Observable<Roe[]>(null);

  constructor(
    public dialogRef: MatDialogRef<ReferenceListDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public dialogInputData: ReferenceListDialogInputData,
    private pdssInterpretationService: PdssInterpretationService
  ) {}

  ngOnInit(): void {
    const interpretationId = this.dialogInputData.interpretationId;
    this.roeList$ = this.pdssInterpretationService
      .getInterpretationRoes(interpretationId)
      .pipe(map((response) => response?.data?.items || []));
  }

  onClose(): void {
    this.dialogRef.close();
  }
}

export interface ReferenceListDialogInputData {
  interpretationId: number;
}

export interface ReferenceListDialogOutputData {}
